import { FC, ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto max-w-min-full-4xl flex-1">{children}</main>
      <Footer />
    </div>
  );
};
