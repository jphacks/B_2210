import { FC } from "react";
import type { Tags } from "../types/tag";
import { Tag } from "../components/Tag";
import { AdditionalTag } from "../components/AdditionalTag";
import { TfiPlus } from "react-icons/tfi";

type Props = {
  tags: string[];
  selectedTags: Set<string>;
  setSelectedTags: (selectedTags: Set<string>) => void;
  additionalTags: string[];
  editTag: (index: number) => (tag: string) => void;
  createNewTag: () => void;
};

export const SelectTag: FC<Props> = ({
  tags,
  selectedTags,
  setSelectedTags,
  additionalTags,
  editTag,
  createNewTag,
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

  const selectRandomTag = () => {
    const newSelectedTags = new Set(selectedTags);
    const allTags = [...tags, ...additionalTags];
    console.log(newSelectedTags);
    console.log(tags);
    console.log(additionalTags);
    tags.map((tag) => newSelectedTags.delete(tag));
    additionalTags.map((tag) => newSelectedTags.delete(tag));

    const index = Math.floor(Math.random() * allTags.length);
    newSelectedTags.add(allTags[index]);
    setSelectedTags(newSelectedTags);
    console.log(newSelectedTags);
  };

  const onAddTag = () => {
    createNewTag();
  };

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {tags.map((tag: string, index) => (
          <div key={index} className="inline-block">
            <Tag isSelected={selectedTags.has(tag)} onSelectTag={onSelectTag}>
              {tag}
            </Tag>
          </div>
        ))}
        {additionalTags.map((tag: string, index: number) => (
          <div key={index} className="inline-block">
            <AdditionalTag
              isSelected={selectedTags.has(tag)}
              onSelectTag={onSelectTag}
              onTagNameInput={editTag(index)}
              isLastEmpty={index == additionalTags.length - 1 && tag === ""}
            >
              {tag}
            </AdditionalTag>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center">
        <button
          className="my-4 mx-6 rounded-full bg-rose-200 px-2 py-2"
          onClick={onAddTag}
        >
          <TfiPlus size="1.5em" />
        </button>
        <button
          className="my-4 mx-6 rounded-full bg-rose-200 px-4 py-2"
          onClick={selectRandomTag}
        >
          おまかせ
        </button>
      </div>
    </>
  );
};
