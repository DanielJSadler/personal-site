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
      className="spaxe-x-0 group flex flex-row items-center rounded-xl bg-white p-2 transition-all duration-200 hover:cursor-pointer hover:bg-black sm:space-x-2"
    >
      {icon}
      <span className="text-[10px] font-medium text-black transition-all duration-200 group-hover:text-white lg:text-xs">
        {label.toUpperCase()}
      </span>
    </button>
  );
};
