import { FC } from "react";

type Props = {
  isSelected: boolean;
  onSelectTag: (tag: string) => void;
  children: string;
};

type EditTagProps = {
  onFocusOut: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Tag: FC<Props> = ({ isSelected, onSelectTag, children }) => {
  return (
    <button
      className={`${
        isSelected ? "bg-orange-300" : "bg-orange-100"
      } my-1 mx-2 rounded-full px-4 py-2`}
      onClick={() => onSelectTag(children)}
    >
      {children}
    </button>
  );
};

export const EditTag: FC<EditTagProps> = ({ onFocusOut, value, onChange }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFocusOut();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="my-1 mx-2 rounded-full border-2 border-orange-300 px-4 py-2 outline-none"
        onBlur={onFocusOut}
        onChange={onChange}
        value={value}
        autoFocus
      />
    </form>
  );
};
