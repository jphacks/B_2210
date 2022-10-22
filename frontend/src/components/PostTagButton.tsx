import { useRouter } from "next/router";
import { FC, useState } from "react";

type Props = {
  tags: string[] | number[];
  className?: string;
  children: string;
  apiURL: string;
};

export const PostTagButton: FC<Props> = ({
  tags,
  className,
  apiURL,
  children,
}) => {
  const router = useRouter();
  const [isPosted, setIsPosted] = useState<boolean>(false);

  const postTags = async () => {
    console.log(tags);
    if (tags.length == 0) {
      alert("一つ以上のタグを選択してください");
      return;
    }

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

    await router.push({
      pathname: "/generation-result",
      query: { id: data.id },
    });
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
