import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

interface Props {
  name: string;
  url: string;
  picture: string;
}

export const PortfolioCard = ({ name, url, picture }: Props) => {
  return (
    <a
      href={url}
      className="group/card flex flex-col items-start space-y-4 lg:items-center"
      referrerPolicy="no-referrer"
      target="_blank"
    >
      <Image
        src={picture}
        height={500}
        width={500}
        alt={name}
        className="h-[100px] w-[200px] lg:h-full lg:w-full"
      />
      <div className="flex w-full max-w-[500px] flex-row items-center justify-between">
        <p className="font-helvetica text-sm text-black lg:text-base">
          {name.toUpperCase()}
        </p>
        <ArrowRightIcon
          height={20}
          color="black"
          className="transition-all duration-200 group-hover/card:translate-x-1 group-hover/card:scale-110"
        />
      </div>
    </a>
  );
};
