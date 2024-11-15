import { EnvelopeIcon } from "@heroicons/react/24/outline";
import {
  CubeBack,
  CubeBottom,
  CubeFront,
  CubeLeft,
  CubeRight,
  CubeTop,
} from "~/components/Atoms/CubeIcons";
import { NavButton } from "~/components/Atoms/NavButton";

interface Props {
  handleButtonClick: (side: string) => void;
}

export const Navigation = ({ handleButtonClick }: Props) => {
  return (
    <div className="absolute bottom-4 z-50 flex flex-row flex-wrap items-center justify-center gap-x-2 gap-y-4 px-[20px]">
      <NavButton
        label="Home"
        icon={
          <CubeFront className="h-[16px] w-[16px] fill-black/50 stroke-black transition-all duration-100 group-hover:fill-white/80 group-hover:stroke-white lg:h-[24px] lg:w-[24px]" />
        }
        onClick={() => handleButtonClick("front")}
      />
      <NavButton
        label="About"
        icon={
          <CubeBottom className="h-[16px] w-[16px] fill-black/50 stroke-black transition-all duration-100 group-hover:fill-white/80 group-hover:stroke-white lg:h-[24px] lg:w-[24px]" />
        }
        onClick={() => handleButtonClick("bottom")}
      />
      <NavButton
        label="Skills"
        onClick={() => handleButtonClick("right")}
        icon={
          <CubeRight className="h-[16px] w-[16px] fill-black/50 stroke-black transition-all duration-100 group-hover:fill-white/80 group-hover:stroke-white lg:h-[24px] lg:w-[24px]" />
        }
      />
      <NavButton
        label="Bio"
        onClick={() => handleButtonClick("top")}
        icon={
          <CubeTop className="h-[16px] w-[16px] fill-black/50 stroke-black transition-all duration-100 group-hover:fill-white/80 group-hover:stroke-white lg:h-[24px] lg:w-[24px]" />
        }
      />
      <NavButton
        label="Portfolio"
        onClick={() => handleButtonClick("left")}
        icon={
          <CubeLeft className="h-[16px] w-[16px] fill-black/50 stroke-black transition-all duration-100 group-hover:fill-white/80 group-hover:stroke-white lg:h-[24px] lg:w-[24px]" />
        }
      />
      <NavButton
        label="Pictures"
        onClick={() => handleButtonClick("back")}
        icon={
          <CubeBack className="h-[16px] w-[16px] fill-black/50 stroke-black transition-all duration-100 group-hover:fill-white/80 group-hover:stroke-white lg:h-[24px] lg:w-[24px]" />
        }
      />
      <NavButton
        label="Contact"
        className="h-full w-full"
        icon={
          <EnvelopeIcon className="duration-duration-200 h-[16px] w-[16px] stroke-black transition-all group-hover:stroke-white lg:h-[24px] lg:w-[24px]" />
        }
      />
    </div>
  );
};
