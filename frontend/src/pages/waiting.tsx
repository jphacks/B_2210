import { FC } from "react";
import Image from "next/image";

const WaitingPage: FC = () => {
  return (
    <>
      <div className="my-4 text-center text-xl">
        <p>生成中だよ</p>
        <p>しばらく待ってね...</p>
      </div>
      <Image src="/WaitingIcon.gif" width={800} height={600} />
    </>
  );
};

export default WaitingPage;
