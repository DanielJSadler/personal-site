import clsx from "clsx";
import {
  DanielSadlerSvg,
  MobileDanielSadlerSvg,
} from "~/components/Atoms/DanielSadlerSvg";

interface Props {
  showContent: boolean;
}
export const Homepage = ({ showContent }: Props) => (
  <div
    className={clsx(
      "relative flex h-full w-full items-center justify-center bg-white/35 duration-1000",
      {
        "fade-in": showContent,
        "fade-out": !showContent,
      },
    )}
  >
    <section className="z-50 flex h-full w-full flex-col items-center justify-center space-y-8">
      <DanielSadlerSvg fill="black" className="hidden md:flex" />
      <MobileDanielSadlerSvg fill="black" className="flex md:hidden" />
    </section>
  </div>
);
