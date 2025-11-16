import clsx from "clsx";
import { PortfolioCard } from "~/components/Molecules/PortfolioCard";
import { projects } from "./projects";

interface Props {
  showContent: boolean;
}

export const PortfolioDesktop = ({ showContent }: Props) => {
  const getImageSizes = (index: number) => {
    if (index === 0) {
      return `h-[200px]  md:h-[250px] md:w-[125px] w-[100px]  `;
    }
    if (index === 1) {
      return `h-[100px] md:w-[250px] md:h-[125px] w-[200px]`;
    }
  };
  return (
    <div
      className={clsx("h-full w-full bg-white/35 p-32 duration-1000 lg:p-24", {
        "fade-in": showContent,
        "fade-out": !showContent,
      })}
      style={{ zIndex: showContent ? 48 : 0 }}
    >
      <div className="flex h-full flex-col items-center justify-between px-[36px] text-center">
        <div className="flex w-full flex-row items-start justify-between gap-7 pt-[75px]">
          {projects.slice(0, 2).map((project, index) => (
            <PortfolioCard
              {...project}
              key={project.name}
              clickable={showContent}
              className={getImageSizes(index)}
            />
          ))}
        </div>

        <div className="flex w-full flex-row-reverse items-center justify-between gap-7">
          {projects.slice(2, 4).map((project, index) => (
            <PortfolioCard
              {...project}
              key={project.name}
              clickable={showContent}
              className={getImageSizes(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
