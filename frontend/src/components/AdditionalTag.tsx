import { FC, useState } from "react";
import { Tag, EditTag } from "./Tag";
import { FiEdit3 } from "react-icons/fi";

type Props = {
  isSelected: boolean;
  onSelectTag: (tag: string) => void;
  children: string;
  onTagNameInput: (tag: string) => void;
  isLastEmpty: boolean;
};

export const AdditionalTag: FC<Props> = ({
  isSelected,
  onSelectTag,
  children,
  onTagNameInput,
  isLastEmpty,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(isLastEmpty);
  const onClickEditButton = () => {
    setIsEdit(!isEdit);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTagNameInput(e.currentTarget.value);
  };

  return (
    <>
      <div className="inline-block w-fit">
        {isEdit ? (
          <EditTag
            onFocusOut={onClickEditButton}
            onChange={onChange}
            value={children}
          />
        ) : (
          <Tag isSelected={isSelected} onSelectTag={onSelectTag}>
            {children}
          </Tag>
        )}
        {isEdit ? (
          <></>
        ) : (
          <button
            className="-ml-2 py-2 pl-1 pr-2 align-middle"
            onClick={onClickEditButton}
          >
            <FiEdit3 size="1.5em" />
          </button>
        )}
      </div>
    </>
  );
};
