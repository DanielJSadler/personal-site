import { type ButtonHTMLAttributes, type DetailedHTMLProps } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: React.ReactNode;
}

export const PictureButton = ({ icon, ...props }: Props) => {
  return (
    <button
      {...props}
      className="group z-50 flex flex-row items-center space-x-2 rounded-xl bg-white p-2 transition-all duration-200 hover:cursor-pointer hover:bg-black"
    >
      {icon}
    </button>
  );
};
