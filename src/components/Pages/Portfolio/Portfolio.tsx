import clsx from "clsx";
import { PortfolioCard } from "~/components/Molecules/PortfolioCard";
import { projects } from "./projects";

interface Props {
  showContent: boolean;
}

export const Portfolio = ({ showContent }: Props) => {
  const getImageSizes = (index: number) => {
    if (index === 0) {
      return `h-[200px] xl:h-[250px] xl:w-[125px] w-[100px]  `;
    }
    if (index === 1) {
      return `h-[100px] xl:w-[250px] xl:h-[125px] w-[200px]`;
    }
  };
  return (
    <div
      className={clsx("h-screen w-full bg-white/35 duration-1000 md:h-full", {
        "fade-in": showContent,
        "fade-out": !showContent,
      })}
    >
      <div className="flex h-full flex-col items-center px-[36px] text-center md:justify-center">
        <p className="pt-4 font-helvetica text-sm uppercase text-black md:text-2xl">
          {`Having worked on  over 9 projects so far, here are a few I can
            show off!`}
        </p>
        <div className="flex w-full flex-row items-start justify-center gap-7 pt-[75px] md:hidden">
          {projects.slice(0, 2).map((project, index) => (
            <PortfolioCard
              {...project}
              key={project.name}
              className={getImageSizes(index)}
            />
          ))}
        </div>
        <div className="flex w-full flex-row-reverse items-center justify-center gap-7 md:hidden">
          {projects.slice(2, 4).map((project, index) => (
            <PortfolioCard
              {...project}
              key={project.name}
              className={getImageSizes(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
