import { FC, useState } from "react";
import type { Questions } from "../types/questions";
import { Title } from "../components/Title";
import { PostTagButton } from "../components/PostTagButton";

const OracleGeneration: FC = () => {
  const questions: Questions = {
    "学校の中で好きな場所は？": [
      "教室",
      "保健室",
      "屋上",
      "体育館",
      "校庭",
      "職員室",
    ],
    "苦手なのは？": ["5分前行動", "アドリブ", "ポーカーフェイス", "虫", "怪談"],
    "バスが30分来ない、どうする？": [
      "待つ",
      "歩いて行く",
      "友達を呼ぶ",
      "タクシーで行く",
      "ヒッチハイク",
    ],
    "旅行するならどこに行きたい？": [
      "南国のリゾート",
      "雪国",
      "砂漠のピラミッド",
      "ヨーロッパの文化遺産",
      "懐かしの故郷",
    ],
    "クラスの同窓会…あなたは？": [
      "みんなを集める幹事",
      "いつもの友達と固まってワイワイ",
      "久しぶりの友達に話しかける",
      "緊張して中々話せないかも",
      "誘われても行かない！",
    ],
    "ひとつ魔法が使えるならどうしたい？": [
      "空を自由に飛びたいな",
      "動物と話せるようになる",
      "自分の姿を自在に帰る",
      "モノをコピーして増やせる魔法",
      "頭が良くなる魔法",
      "好きな人を惚れさせる魔法",
    ],
    "休日の過ごし方は？": [
      "ピクニック",
      "スポーツ",
      "ショッピング",
      "勉強",
      "ゲーム",
      "何もせずダラダラ",
    ],
  };
  const categories = Object.keys(questions);

  const [page, setPage] = useState<number>(0);
  const [choices, setChoices] = useState<number[]>([]);

  const onTransitPage = (dp: number, index: number) => {
    setChoices([...choices, index]);
    setPage(page + dp);
  };

  const buttonStyle: string = "mx-2 my-2 rounded bg-orange-200 px-4 py-2";

  return (
    <div className="">
      <Title>{categories[page]}</Title>
      <div className="mx-auto flex flex-wrap items-center justify-center">
        {questions[categories[page]].map((choice: string, index: number) =>
          page < categories.length - 1 ? (
            <button
              key={index}
              className={buttonStyle}
              onClick={() => onTransitPage(1, index)}
            >
              {choice}
            </button>
          ) : (
            <div className="inline-block" key={index}>
              <PostTagButton
                tags={[...choices, index]}
                className={buttonStyle}
                apiURL="https://aicon-maker-backend.herokuapp.com/aiconapi/reserve"
              >
                {choice}
              </PostTagButton>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default OracleGeneration;
