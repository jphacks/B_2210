import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";
import { useRouter } from "next/router";
import { Title } from "../components/Title";

const WaitingPage: FC = () => {
  const [urls, setURLs] = useState<string[]>([]);
  const [queueLength, setQueueLength] = useState<number>();

  const timer = useRef<NodeJS.Timer>();
  const isWaitingResponse = useRef<boolean>(false);
  const router = useRouter();
  const id = router.query.id;

  const getImageURLs = async (url: string) => {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    console.log(response);
    if (!response.ok) {
      console.log("response status is not ok");
      return;
    }

    const data = await response.json();
    console.log(data);
    setQueueLength(data.queue_length);
    if (!data.completed) {
      console.log("icon generation is not completed");
      return;
    }
    const imgURLs: string[] = data.result;

    setURLs(await Promise.all(imgURLs.map(getImage)));
    clearInterval(timer.current);
  };

  const getImage = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);
    return objectURL;
  };

  useEffect(() => {
    console.log("useEffect");
    timer.current = setInterval(() => {
      if (!isWaitingResponse.current) {
        isWaitingResponse.current = true;
        getImageURLs(
          "https://aicon-maker-backend.herokuapp.com/aiconapi/check_result"
        ).then(() => {
          isWaitingResponse.current = false;
        });
      }
    }, 1000);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <>
      {urls.length > 0 ? (
        <>
          <Title>生成結果</Title>
          {urls.map((url: string, index: number) => {
            return (
              <div key={index}>
                <div>
                  <Image src={url} width={256} height={256} />
                </div>
                <a
                  download="result-aicon-maker.jpg"
                  href={url}
                  className="mb-4 inline-block rounded border-2 border-blue-900 bg-blue-200 p-2"
                >
                  ダウンロード
                  <FiDownload className="inline" />
                </a>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div className="my-4 text-center text-xl">
            <p>生成中だよ</p>
            <p>しばらく待ってね...</p>
          </div>
          <div className="mb-4 text-center text-lg">
            <p>現在 {queueLength}人待ち</p>
          </div>
          <Image src="/WaitingIcon.gif" width={800} height={600} />
        </>
      )}
    </>
  );
};

export default WaitingPage;
