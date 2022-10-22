import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { SampleIcons } from "../components/SampleIcons";
import { Title } from "../components/Title";
import Seo from "../components/Seo";

const Home: NextPage = () => {
  const goGeneration = (
    <a className="block-inline my-4 rounded bg-rose-200 px-10 py-2">はじめる</a>
  );

  const menuBlockStyle = "mx-10 inline-block items-center text-center";

  return (
    <>
      <Seo
        pageTitle="AIconMaker"
        pageDescription="AIがあなたに合ったあなただけのアイコンを生成します。"
        pageImg="/logo.png"
      />
      <div className="my-8 items-center text-center">
        <Image src="/logo.png" height={150} width={400} objectFit="contain" />
      </div>
      <div className="mx-8 mb-4 border-y border-gray-200 py-2 px-4">
        <div className="flex justify-center text-sm text-gray-800">
          <div className="w-fit">
            <p>
              AIcon
              MakerはSNSやコミニュケーションツールが多様化する現代に必要なアイコン作成ツールです。
            </p>
            <p>AIがあなたに合ったあなただけのアイコンを生成します。</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-around text-center">
        <div className={menuBlockStyle}>
          <Title>心理テストで生成</Title>
          <Link href="/oracle-generation">{goGeneration}</Link>
        </div>
        <div className={menuBlockStyle}>
          <Title>タグを選んで生成</Title>
          <Link href="/custom-generation">{goGeneration}</Link>
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
