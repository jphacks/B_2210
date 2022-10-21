import Image from "next/image";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-500">
      <div className="mx-auto flex h-24 max-w-4xl items-center justify-around">
        <a href="http://www.goo.ne.jp/">
          <Image
            src="http://u.xgoo.jp/img/sgoo.png"
            alt="supported by goo"
            title="supported by goo"
            width={100}
            height={55}
            objectFit="contain"
          />
        </a>
        <a href="https://stability.ai/blog/stable-diffusion-public-release">
          <div>
            <p>powered by</p>
            <p>Stable Diffusion</p>
          </div>
        </a>
        <div>©︎ankoutv</div>
      </div>
    </footer>
  );
};
