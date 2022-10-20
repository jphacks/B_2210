import { useRouter } from "next/router";
import { FC, useState } from "react";

type Props = {
  tags: string[];
  className: string;
  children: string;
};

export const PostTagButton: FC<Props> = ({ tags, className, children }) => {
  const apiURL = "https://aicon-maker-backend.herokuapp.com/aiconapi/reserve";
  const router = useRouter();
  const [isPosted, setIsPosted] = useState<boolean>(false);

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
          if (!isPosted) {
            setIsPosted(true);
            postTags().then(() => setIsPosted(false));
          }
        }}
      >
        {isPosted ? "..." : children}
      </button>
    </>
  );
};
