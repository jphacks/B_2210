import { FC, useState } from "react";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";

const WaitingPage: FC = () => {
  const [flag, setFlag] = useState<boolean>(false);
  return (
    <>
      {flag ? (
        <>
          <p>生成結果</p>
          <div>
            <Image src="/WaitingIcon.gif" width={200} height={150} />
          </div>
          <a
            download="result-aicon-maker.gif"
            href="/WaitingIcon.gif"
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
