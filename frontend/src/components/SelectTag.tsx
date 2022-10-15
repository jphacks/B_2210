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
          <button onClick={() => onSelectTag(tag)}>{tag}</button>
        ))}
      </div>
    </>
  );
};
