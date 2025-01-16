import { ArrowRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Image from "next/image";

interface Props {
  name: string;
  url: string;
  picture: string;
  className?: string;
  imageHeight?: number;
  imageWidth?: number;
  clickable: boolean;
}

export const PortfolioCard = ({
  name,
  url,
  picture,
  className,
  imageHeight = 500,
  imageWidth = 500,
  clickable,
}: Props) => {
  return (
    <a
      href={url}
      className={clsx(
        `group/card flex flex-col items-start space-y-4 lg:items-center`,
        className,
        clickable ? `pointer-events-auto` : `pointer-events-none`,
      )}
      referrerPolicy="no-referrer"
      target="_blank"
    >
      <Image
        src={picture}
        alt={name}
        height={imageHeight}
        width={imageWidth}
        className="aspect-square h-full w-full rounded-lg object-cover object-left"
      />
      <div className="flex w-full max-w-[500px] flex-row items-center justify-between">
        <p className="text-xs text-black lg:text-base">{name.toUpperCase()}</p>
        <ArrowRightIcon
          height={20}
          color="black"
          className="hidden transition-all duration-200 group-hover/card:translate-x-1 group-hover/card:scale-110 md:flex"
        />
      </div>
    </a>
  );
};
