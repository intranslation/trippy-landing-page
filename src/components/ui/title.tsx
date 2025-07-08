import type { PropsWithChildren } from "react";

export default function Title({ children }: PropsWithChildren) {
  return <h1 className="text-5xl font-bold text-white">{children}</h1>;
}
