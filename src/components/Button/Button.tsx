import { type ButtonHTMLAttributes, type DetailedHTMLProps } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
}

export const Button = (props: Props) => {
  return (
    <button
      {...props}
      className="[before:transition-timing-function:cubic-bezier(1,0.15,0.34,1.03)] border-1 relative z-10 overflow-hidden rounded-bl-2xl rounded-tr-2xl border-eerieBlack bg-eerieBlack px-6 py-4 text-sm transition-all duration-300 [transition-timing-function:cubic-bezier(1,0.15,0.34,1.03)] before:absolute before:left-1/2 before:top-1/2 before:z-[-1] before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 before:transform before:rounded-full before:bg-white before:p-[16%] before:transition-transform before:duration-300 before:content-[''] hover:text-eerieBlack hover:before:scale-[2.5] lg:text-base"
    >
      {props.label}
    </button>
  );
};
