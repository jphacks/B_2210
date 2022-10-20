import { NextRouter, useRouter } from "next/router";
import { FC } from "react";

type Props = {
  tags: string[];
  className: string;
  children: string;
};

export const PostTagButton: FC<Props> = ({ tags, className, children }) => {
  const apiURL = "https://aicon-maker-backend.herokuapp.com/aiconapi/reserve";
  const router = useRouter();

  const postTags = async () => {
    const response = await fetch(apiURL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: tags,
      }),
    });
    console.log(response);
    if (!response.ok) {
      console.log("response status is not ok");
      return;
    }

    const data = await response.json();
    console.log(data);

    router.push({ pathname: "/generation-result", query: { id: data.id } });
  };

  return (
    <>
      <button
        className={className}
        onClick={() => {
          postTags();
        }}
      >
        {children}
      </button>
    </>
  );
};
