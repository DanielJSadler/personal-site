import clsx from "clsx";
import { MobileDanielSadlerSvg } from "~/components/Atoms/DanielSadlerSvg";

interface Props {
  text: string;
  header: string;
  showContent: boolean;
  children?: React.ReactNode;
}

export const Experience = ({ header, text, showContent, children }: Props) => {
  return (
    <div
      className={clsx("z-50 h-full w-full bg-white/35 duration-1000", {
        "fade-in": showContent,
        "fade-out": !showContent,
      })}
    >
      <section className="experience-container flex h-full w-full flex-col items-center justify-around space-y-8 px-8 pb-[200px] md:pb-0">
        <MobileDanielSadlerSvg className="flex md:hidden" />
        <div className="space-y-4">
          <h1 className="text-center font-helvetica text-xl text-black md:text-left md:text-3xl">
            {header.toUpperCase()}
          </h1>
          <h2 className="text-center text-sm text-black md:text-left md:text-xl">
            {text}
          </h2>
          {children}
        </div>
      </section>
    </div>
  );
};
