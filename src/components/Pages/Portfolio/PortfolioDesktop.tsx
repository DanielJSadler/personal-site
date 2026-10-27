import { PortfolioCard } from "~/components/Molecules/PortfolioCard";
import { projects } from "./projects";
export const PortfolioDesktop = ({ showContent }: { showContent: boolean }) => (
 <section className="projects-face">
  <h1>Selected work</h1>
  <div className="projects-grid">{projects.map(project => <PortfolioCard {...project} key={project.name} clickable={showContent} />)}</div>
 </section>
);
