import type { NextPage } from "next";
import { Prompt } from "../components/Prompt";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div>
        <p>プロンプトから生成</p>
        <Prompt />
      </div>
      <div className="my-2">
        <p>タグを選んで生成</p>
        <Link href="/SelectTagPage">
          <a className="rounded bg-green-200 px-4 py-2">生成ページへ</a>
        </Link>
      </div>
      <div className="my-2">
        <p>Oracle</p>
        <Link href="/oracle-generation">
          <a className="rounded bg-green-200 px-4 py-2">生成ページへ</a>
        </Link>
      </div>
    </>
  );
};

export default Home;
