import Script from "next/script";
import { FC } from "react";

export const GoogleAnalytics: FC = () => {
  const GA_ID = "G-8SWJSM71C2";
  return (
    <>
      <>
        <Script
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga" defer strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_ID}');
          `}
        </Script>
      </>
    </>
  );
};
