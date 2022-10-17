import { FC, useState } from "react";
import Link from "next/link";
import type { Questions } from "../types/questions";

const OracleGeneration: FC = () => {
  // 質問をたくさん用意してランダムで数個答える想定
  // 質問を階層的に用意するのもあり
  const questions: Questions = {
    "どっちが好き？": ["自然", "都会"],
    "旅行に行くなら？": ["ストックホルム", "キルナ", "ガムラスタン"],
    "好きなアーティストは？": ["ヨルシカ", "ヨルシカ"],
  };
  const categories = Object.keys(questions);

  const [page, setPage] = useState<number>(0);
  const [choices, setChoices] = useState<string[]>([]);

  const onTransitPage = (dp: number, choice: string) => {
    setChoices([...choices, choice]);
    setPage(page + dp);
  };

  const buttonStyle: string = "mx-2 my-2 rounded bg-orange-200 px-4 py-2";

  return (
    <div className="">
      <div id="category">
        <p>{categories[page]}</p>
      </div>
      <div className="mx-auto flex items-center justify-between">
        {questions[categories[page]].map((choice: string) =>
          page < categories.length - 1 ? (
            <button
              className={buttonStyle}
              onClick={() => onTransitPage(1, choice)}
            >
              {choice}
            </button>
          ) : (
            <Link href="/waiting">
              <a className={buttonStyle}>{choice}</a>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default OracleGeneration;
