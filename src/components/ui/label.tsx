import type { PropsWithChildren } from "react";

export default function Label({ children }: PropsWithChildren) {
  return <span className="text-center text-base text-white">{children}</span>;
}
