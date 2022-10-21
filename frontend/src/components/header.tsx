import { FC } from "react";
import Link from "next/link";

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="mx-auto flex h-12 max-w-4xl items-center justify-between p-4">
        <Link href="/">
          <a>AIcon Maker</a>
        </Link>
        <button>
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
          </svg>
        </button>
      </div>
    </header>
  );
};
