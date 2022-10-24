import "../../styles/globals.css";
import type { AppProps } from "next/app";
import "../../styles/swiper.css";

import { Layout } from "../components/layout";
import { GoogleAnalytics } from "../components/GoogleAnalytics";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
