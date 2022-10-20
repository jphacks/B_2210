import { FC } from "react";

type Props = {
  children: string;
};

export const Title: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="mt-4 mb-2 border-b border-gray-200">
        <p className="text-center text-xl">{children}</p>
      </div>
    </>
  );
};
