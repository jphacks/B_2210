import { FC, useState } from "react";
import { SelectTag } from "../components/SelectTag";
import { Tag } from "../types/tag";

const SelectTagPage: FC = () => {
  const tags: Tag = {
    雰囲気: ["かわいい", "おしゃれ", "クール", "おしとやか", "ふしぎ"],
    被写体: ["ねこ", "いぬ", "バッファロー"],
    作者: ["新海誠", "宮崎駿", "Ryo Watanabe", "axt-one"],
  };
  const categories = Object.keys(tags);

  const [page, setPage] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    new Set<string>()
  );

  const onTransitPage = (dp: number) => {
    const newPage = page + dp;
    if (0 <= newPage && newPage < categories.length) setPage(newPage);
  };

  return (
    <div className="">
      <div id="category">
        <p>{categories[page]}</p>
      </div>
      <SelectTag
        tags={tags[categories[page]]}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <div className="mx-auto flex items-center justify-between">
        <button
          className="mx-2 my-2 rounded bg-gray-200 px-4 py-2"
          onClick={() => onTransitPage(-1)}
        >
          前へ
        </button>
        <button
          className="my-2 mx-2 rounded bg-gray-200 px-4 py-2"
          onClick={() => onTransitPage(1)}
        >
          次へ
        </button>
      </div>
    </div>
  );
};

export default SelectTagPage;
