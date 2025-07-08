import type { PropsWithChildren } from "react";

type CheckboxType = PropsWithChildren<{
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}>;

export default function Checkbox({ children, props }: CheckboxType) {
  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex cursor-pointer items-center"
        htmlFor="check-2"
      >
        <input
          type="checkbox"
          className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all checked:border-slate-800 checked:bg-slate-800 hover:shadow-md"
          id="check-2"
          {...props}
        />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
      <label
        className="ml-2 cursor-pointer text-sm text-white"
        htmlFor="check-2"
      >
        {children}
      </label>
    </div>
  );
}
