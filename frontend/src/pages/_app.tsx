import "../../styles/globals.css";
import type { AppProps } from "next/app";
import "../../styles/swiper.css";

import { Layout } from "../components/layout";
import Seo from "../components/Seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Seo
        pageTitle="AIconMaker"
        pageDescription="AIがあなたに合ったあなただけのアイコンを生成します。"
        pageImg="https://github.com/jphacks/B_2210/raw/master/frontend/public/logo.png"
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
