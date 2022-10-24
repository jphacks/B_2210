import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-8SWJSM71C2"
      ></Script>
      <Script strategy="lazyOnload" id="google-analytics">
        {` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-8SWJSM71C2');`}
      </Script>
      <div className="mx-auto flex h-12 max-w-4xl items-center justify-between p-4">
        <Link href="/">
          <a>
            <Image
              src="/logo.png"
              alt="AIcon Maker"
              width={110}
              height={48}
              objectFit="contain"
            />
          </a>
        </Link>
      </div>
    </header>
  );
};
