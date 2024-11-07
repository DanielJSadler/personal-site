import clsx from "clsx";
import { DanielSadlerSvg } from "~/components/Atoms/DanielSadlerSvg";

interface Props {
  showContent: boolean;
}
export const Homepage = ({ showContent }: Props) => (
  <div className="cube__face cube__face--front relative flex items-center justify-center">
    {/* <div className="absolute h-2/3 w-2/3 rounded-full bg-gradient-to-b from-[#00C2FF] to-[#293FFF] blur-3xl" /> */}
    <div
      className={clsx(
        "relative flex h-full w-full items-center justify-center bg-white/35",
        {
          "fade-in": showContent,
          "fade-out": !showContent,
        },
      )}
    >
      <section className="z-50 flex h-full w-full flex-col items-center justify-center space-y-8">
        <DanielSadlerSvg fill="black" />
      </section>
    </div>
  </div>
);
