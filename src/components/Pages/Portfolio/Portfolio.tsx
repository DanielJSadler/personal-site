import clsx from "clsx";
import { PortfolioCard } from "~/components/Molecules/PortfolioCard";

interface Props {
  showContent: boolean;
}

export const Portfolio = ({ showContent }: Props) => {
  const projects = [
    {
      name: "Everyone's Invited",
      url: "https://www.everyonesinvited.uk/",
      picture: "/photos/portfolio/everyoneinvited.png",
    },
    {
      name: "Contic",
      url: "https://www.contic.co.uk",
      picture: "/photos/portfolio/contic.png",
    },
    {
      name: "City Tower Manchester",
      url: "https://citytower-manchester.co.uk/",
      picture: "/photos/portfolio/city-tower.png",
    },
  ];

  return (
    <div className="cube__face cube__face--left bg-gradient-to-r @container">
      <div
        className={clsx("h-full w-full bg-white/35", {
          "fade-in": showContent,
          "fade-out": !showContent,
        })}
      >
        <div className="h-screen overflow-y-scroll">
          <div className="portfolio-container grid h-screen w-full grid-cols-1 items-center gap-4 overflow-y-scroll pb-[200px] pt-[50px] md:grid-cols-2 md:gap-8">
            <p className="font-helvetica text-xs text-black lg:text-base">
              {`Having worked on a over 9 projects so far, here are a few I can
              show off!`.toUpperCase()}
            </p>
            {projects.map((project) => (
              <PortfolioCard {...project} key={project.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
