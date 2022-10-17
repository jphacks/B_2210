import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";

const WaitingPage: FC = () => {
  const [flag, setFlag] = useState<boolean>(false);
  const [url, setURL] = useState<string>("");
  // const [timer, setTimer] = useState<number>(0);
  const timer = useRef<NodeJS.Timer>();

  const getImage = async (url: string) => {
    const data = await fetch(url);
    const blob = await data.blob();
    const objectURL = URL.createObjectURL(blob);
    setURL(objectURL);
    console.log(timer);
    clearInterval(timer.current);
  };

  useEffect(() => {
    console.log("useEffect");
    timer.current = setInterval(() => {
      getImage("https://images.dog.ceo/breeds/bouvier/n02106382_1365.jpg");
    }, 500);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <>
      {url !== "" ? (
        <>
          <p>生成結果</p>
          <div>
            <Image src={url} width={256} height={256} />
          </div>
          <a
            download="result-aicon-maker.jpg"
            href={url}
            className="inline-block rounded border-2 border-blue-900 bg-blue-200 p-2"
          >
            ダウンロード
            <FiDownload className="inline" />
          </a>
        </>
      ) : (
        <>
          <div className="my-4 text-center text-xl">
            <p>生成中だよ</p>
            <p>しばらく待ってね...</p>
          </div>
          <Image src="/WaitingIcon.gif" width={800} height={600} />
        </>
      )}
    </>
  );
};

export default WaitingPage;
