import { FC } from "react";
import { Tag } from "../types/tag";

type Props = {
  tags: string[];
  selectedTags: Set<string>;
  setSelectedTags: (selectedTags: Set<string>) => void;
};

export const SelectTag: FC<Props> = ({
  tags,
  selectedTags,
  setSelectedTags,
}) => {
  const onSelectTag = (tag: string) => {
    const newSelectedTags = new Set(selectedTags);
    if (newSelectedTags.has(tag)) {
      newSelectedTags.delete(tag);
    } else {
      newSelectedTags.add(tag);
    }
    setSelectedTags(newSelectedTags);
    console.log(newSelectedTags);
  };

  return (
    <>
      <div id="tags">
        {tags.map((tag: string) => (
          <button
            className={`${
              selectedTags.has(tag) ? "bg-orange-300" : "bg-orange-100"
            } mx-2 rounded-full px-4 py-2`}
            onClick={() => onSelectTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </>
  );
};
