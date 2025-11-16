import { type ButtonHTMLAttributes, type DetailedHTMLProps } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
  icon?: React.ReactNode;
}

export const NavButton = ({ label, icon, ...props }: Props) => {
  return (
    <button
      {...props}
      className="group flex flex-row items-center space-x-0 border-[0.5px] border-white/50 px-4 py-2 backdrop-blur-sm backdrop-brightness-125 transition-all duration-200 hover:cursor-pointer hover:bg-black/10 sm:space-x-2 lg:w-full"
    >
      {icon}
      <span className="text-[14px] font-medium text-black transition-all duration-200 group-hover:text-white lg:text-xs">
        {label.toUpperCase()}
      </span>
    </button>
  );
};
