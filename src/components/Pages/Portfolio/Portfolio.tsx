import { PortfolioCard } from "~/components/PortfolioCard";

export const Portfolio = () => {
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
    <div className="h-screen overflow-y-scroll">
      <div className="portfolio-container grid h-screen w-full grid-cols-1 items-center gap-4 overflow-y-scroll pb-[200px] pt-[50px] md:grid-cols-2 md:gap-8">
        <p className="text-xs lg:text-base">
          Having worked on a over 9 projects so far, here are a few I can show
          off!
        </p>
        {projects.map((project) => (
          <PortfolioCard {...project} key={project.name} />
        ))}
      </div>
    </div>
  );
};
