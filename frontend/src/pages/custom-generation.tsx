import { FC, useState } from "react";
import { SelectTag } from "../components/SelectTag";
import { Tags } from "../types/tag";
import { Title } from "../components/Title";
import { PostTagButton } from "../components/PostTagButton";

const SelectTagPage: FC = () => {
  const tags: Tags = {
    "なんの絵？": [
      "ネコ",
      "トラ",
      "ライオン",
      "フクロウ",
      "タカ",
      "ペンギン",
      "アヒル",
      "ペリカン",
      "イヌ",
      "ウシ",
      "シカ",
      "ラッコ",
      "クジラ",
      "タコ",
      "イカ",
      "ロボット",
      "車",
      "歯車",
      "巨大樹",
      "山",
      "雲",
      "桜",
    ],
    雰囲気: [
      "かわいい",
      "かっこいい",
      "美しい",
      "きれい",
      "おしゃれ",
      "クール",
      "ふしぎ",
      "おもしろい",
      "気持ち悪い",
      "ホラー",
      "明るい",
      "暗い",
      "モフモフの",
      "無機質な",
    ],
  };
  const categories = Object.keys(tags);

  const [page, setPage] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    new Set<string>()
  );
  const [additionalTags, setAdditionalTags] = useState<Tags>(
    Object.fromEntries(categories.map((x) => [x, []]))
  );

  const editTag = (index: number) => {
    return (tag: string) => {
      const newAdditionalTags = Object.assign({}, additionalTags);
      const newSelectedTags = new Set(selectedTags);
      newSelectedTags.delete(additionalTags[categories[page]][index]);
      newSelectedTags.add(tag);
      setSelectedTags(newSelectedTags);
      newAdditionalTags[categories[page]][index] = tag;
      setAdditionalTags(newAdditionalTags);
    };
  };

  const createNewTag = () => {
    const newAdditionalTags = Object.assign({}, additionalTags);
    newAdditionalTags[categories[page]].push("");
    setAdditionalTags(newAdditionalTags);
  };

  const onTransitPage = (dp: number) => {
    setPage(page + dp);
  };

  const buttonStyle: string =
    "my-2 mx-2 rounded bg-gray-200 px-4 py-2 text-gray-900 disabled:bg-gray-100 disabled:text-gray-400";

  return (
    <div className="flex w-screen max-w-4xl justify-center">
      <div className="sm:w-5/6">
        <Title>{categories[page]}</Title>
        <SelectTag
          tags={tags[categories[page]]}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          additionalTags={additionalTags[categories[page]]}
          editTag={editTag}
          createNewTag={createNewTag}
        />
        <div className="mx-auto flex items-center justify-between">
          <button
            className={buttonStyle}
            onClick={() => onTransitPage(-1)}
            disabled={0 == page}
          >
            前へ
          </button>
          {page < categories.length - 1 ? (
            <button className={buttonStyle} onClick={() => onTransitPage(1)}>
              次へ
            </button>
          ) : (
            <PostTagButton
              tags={Array.from(selectedTags)}
              className={buttonStyle}
              apiURL="https://aicon-maker-backend.herokuapp.com/aiconapi/reserve"
            >
              生成
            </PostTagButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectTagPage;
