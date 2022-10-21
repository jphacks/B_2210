import Image from "next/image";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto flex h-24 max-w-4xl items-center justify-center">
        <div>なんか</div>
        <a href="http://www.goo.ne.jp/">
          <Image
            src="http://u.xgoo.jp/img/sgoo.png"
            alt="supported by goo"
            title="supported by goo"
            width={130}
            height={55}
          />
        </a>
      </div>
    </footer>
  );
};
