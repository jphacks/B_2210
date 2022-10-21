import { FC, useState } from "react";
import type { Questions } from "../types/questions";
import { Title } from "../components/Title";
import { PostTagButton } from "../components/PostTagButton";

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
      <Title>{categories[page]}</Title>
      <div className="mx-auto flex flex-wrap items-center justify-center">
        {questions[categories[page]].map((choice: string) =>
          page < categories.length - 1 ? (
            <button
              className={buttonStyle}
              onClick={() => onTransitPage(1, choice)}
            >
              {choice}
            </button>
          ) : (
            <PostTagButton tags={choices} className={buttonStyle}>
              {choice}
            </PostTagButton>
          )
        )}
      </div>
    </div>
  );
};

export default OracleGeneration;
