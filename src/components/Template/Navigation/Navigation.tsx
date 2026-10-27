import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  CubeBack,
  CubeBottom,
  CubeFront,
  CubeLeft,
  CubeRight,
  CubeTop,
} from "~/components/Atoms/CubeIcons";
import { NavButton } from "~/components/Atoms/NavButton";
import ContactModal from "~/components/Molecules/ContactModal/ContactModal";

interface Props {
  handleButtonClick: (side: string) => void;
  currentSide?: string;
}

export const Navigation = ({ handleButtonClick, currentSide }: Props) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <nav aria-label="Sections" data-current={currentSide} className="section-navigation z-50 flex w-fit flex-row flex-wrap items-center justify-center gap-x-2 gap-y-4 border-[0.5px] border-white bg-white/10 px-7 py-8 shadow-black drop-shadow-2xl backdrop-blur-sm backdrop-contrast-100 backdrop-saturate-150 lg:flex-col">
      <NavButton
        label="Home"
        aria-current={currentSide === "front" ? "page" : undefined}
        icon={
          <CubeFront className="hidden h-[16px] w-[16px] fill-black/50 stroke-black transition-all duration-100 group-hover:fill-white/80 group-hover:stroke-white sm:block lg:h-[24px] lg:w-[24px]" />
        }
        onClick={() => handleButtonClick("front")}
      />
      <NavButton
        label="About"
        aria-current={currentSide === "bottom" ? "page" : undefined}
        icon={
          <CubeBottom className="hidden h-[16px] w-[16px] fill-black/50 stroke-black transition-all duration-100 group-hover:fill-white/80 group-hover:stroke-white sm:block lg:h-[24px] lg:w-[24px]" />
        }
        onClick={() => handleButtonClick("bottom")}
      />
      <NavButton
        label="Skills"
        aria-current={currentSide === "right" ? "page" : undefined}
        onClick={() => handleButtonClick("right")}
        icon={
          <CubeRight className="hidden h-[16px] w-[16px] fill-black/50 stroke-black transition-all duration-100 group-hover:fill-white/80 group-hover:stroke-white sm:block lg:h-[24px] lg:w-[24px]" />
        }
      />
      <NavButton
        label="Bio"
        aria-current={currentSide === "top" ? "page" : undefined}
        onClick={() => handleButtonClick("top")}
        icon={
          <CubeTop className="hidden h-[16px] w-[16px] fill-black/50 stroke-black transition-all duration-100 group-hover:fill-white/80 group-hover:stroke-white sm:block lg:h-[24px] lg:w-[24px]" />
        }
      />
      <NavButton
        label="Portfolio"
        aria-current={currentSide === "left" ? "page" : undefined}
        onClick={() => handleButtonClick("left")}
        icon={
          <CubeLeft className="hidden h-[16px] w-[16px] fill-black/50 stroke-black transition-all duration-100 group-hover:fill-white/80 group-hover:stroke-white sm:block lg:h-[24px] lg:w-[24px]" />
        }
      />
      <NavButton
        label="Pictures"
        aria-current={currentSide === "back" ? "page" : undefined}
        onClick={() => handleButtonClick("back")}
        icon={
          <CubeBack className="hidden h-[16px] w-[16px] fill-black/50 stroke-black transition-all duration-100 group-hover:fill-white/80 group-hover:stroke-white sm:block lg:h-[24px] lg:w-[24px]" />
        }
      />
      <NavButton
        label="Contact"
        className="h-full w-full"
        onClick={() => setOpenModal(true)}
        icon={
          <EnvelopeIcon className="duration-duration-200 hidden h-[16px] w-[16px] stroke-black transition-all group-hover:stroke-white sm:block lg:h-[24px] lg:w-[24px]" />
        }
      />
      <ContactModal open={openModal} setOpen={setOpenModal} />
    </nav>
  );
};
