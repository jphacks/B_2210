import type { NextPage } from "next";
import Link from "next/link";
import { SampleIcons } from "../components/SampleIcons";

const Home: NextPage = () => {
  const goGeneration = (
    <a className="rounded bg-green-200 px-4 py-2">生成ページへ</a>
  );

  return (
    <>
      <div>
        <p className="my-4 text-center text-2xl">AIcon Maker</p>
      </div>
      <div className="mx-8 mb-4 border-y border-gray-200 py-2 px-4">
        <p>
          AIcon
          MakerはSNSやコミニュケーションツールが多様化する現代に必要なアイコン作成ツールです。
        </p>
        <p>AIがあなたに合ったあなただけのアイコンを生成します。</p>
      </div>
      <div className="text-center">
        <div className="my-2 mx-10 inline-block items-center text-center">
          <p>タグを選んで生成</p>
          <Link href="/custom-generation">{goGeneration}</Link>
        </div>
        <div className="my-2 mx-10 inline-block items-center text-center">
          <p>Oracle</p>
          <Link href="/oracle-generation">{goGeneration}</Link>
        </div>
      </div>
      <div className="my-10 content-center text-center">
        <p>Samples</p>
        <SampleIcons></SampleIcons>
      </div>
    </>
  );
};

export default Home;
