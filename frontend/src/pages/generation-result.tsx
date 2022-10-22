import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";
import { useRouter } from "next/router";
import { Title } from "../components/Title";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from "react-share";
import Link from "next/link";

const WaitingPage: FC = () => {
  const [urls, setURLs] = useState<{ objectURL: string; shareURL: string }[]>(
    []
  );
  const [queueLength, setQueueLength] = useState<number>();

  const timer = useRef<NodeJS.Timer>();
  const id = useRef<string>();
  const isWaitingResponse = useRef<boolean>(false);
  const router = useRouter();
  const query = router.query;

  const shareMessage: string =
    "AIconMakerで作ったよ https://aicon-maker.vercel.app/";
  const shareTag: string = "AIconMaker";

  useEffect(() => {
    id.current = query.id as string;
  }, [query]);

  const getImageURLs = async (url: string) => {
    console.log(id);

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id.current }),
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
    return { objectURL, shareURL: url };
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
          {urls.map(({ objectURL, shareURL }, index: number) => {
            return (
              <div key={index}>
                <div>
                  <Image src={objectURL} width={256} height={256} />
                </div>

                <div className="mb-6 flex justify-between">
                  <a
                    download="result-aicon-maker.png"
                    href={objectURL}
                    className="inline-block rounded border-2 border-orange-400 bg-orange-200 p-2"
                  >
                    <div className="flex items-center">
                      <span className="inline-block">ダウンロード</span>
                      <FiDownload className="inline" />
                    </div>
                  </a>
                  <FacebookShareButton
                    url={shareURL}
                    quote={shareMessage}
                    hashtag={shareTag}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={shareURL}
                    title={shareMessage}
                    hashtags={[shareTag]}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LineShareButton url={shareURL + " " + shareMessage}>
                    <LineIcon size={32} round />
                  </LineShareButton>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center">
            <Link href="/">
              <a className="block-inline my-4 rounded bg-rose-200 px-10 py-2">
                トップに戻る
              </a>
            </Link>
          </div>
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
