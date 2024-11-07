import clsx from "clsx";
import { type Skills } from "~/components/Skills/skills.types";
import { SkillsSection } from "~/components/Skills/SkillsSection";

interface Props {
  showContent: boolean;
}
export const SkillsPage = ({ showContent }: Props) => {
  const frontEndSkills: Skills[] = [
    {
      skill: "React",
      url: "https://reactjs.org/",
    },
    {
      skill: "Next.js",
      url: "https://nextjs.org/",
    },
    {
      skill: "HTML + CSS",
      url: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
    },
    {
      skill: "Tailwind CSS",
      url: "https://tailwindcss.com/",
    },
    {
      skill: "Styled Components",
      url: "https://styled-components.com/",
    },
    {
      skill: "React Native",
      url: "https://reactnative.dev/",
    },
    { skill: "Jest", url: "https://jestjs.io/" },
    { skill: "Cypress", url: "https://www.cypress.io/" },
    { skill: "Storybook", url: "https://storybook.js.org/" },
  ];

  const backEndSkills: Skills[] = [
    {
      skill: "Node.js",
      url: "https://nodejs.org/",
    },
    {
      skill: "Prisma",
      url: "https://www.prisma.io/",
    },
    {
      skill: "GraphQL",
      url: "https://graphql.org/",
    },
    {
      skill: "tRPC",
      url: "https://trpc.io/",
    },
    {
      skill: "PostgreSQL",
      url: "https://www.postgresql.org/",
    },
    {
      skill: "Express",
      url: "https://expressjs.com/",
    },
  ];

  const devOpsSkills: Skills[] = [
    {
      skill: "Docker",
      url: "https://www.docker.com/",
    },
    {
      skill: "AWS",
      url: "https://aws.amazon.com/",
    },
    {
      skill: "Terraform",
      url: "https://www.terraform.io/",
    },
    {
      skill: "CloudFormation",
      url: "https://aws.amazon.com/cloudformation/",
    },
    {
      skill: "iOS Deployment",
      url: "https://developer.apple.com/documentation/xcode/distributing_your_app_for_beta_testing_and_releases",
    },
    {
      skill: "Android Deployment",
      url: "https://developer.android.com/studio/publish",
    },
    {
      skill: "Vercel",
      url: "https://vercel.com/",
    },
  ];
  return (
    <div className="cube__face cube__face--right z-50 flex items-center justify-center @container">
      <div
        className={clsx("z-50 h-full w-full bg-white/35 @container/skills", {
          "fade-in": showContent,
          "fade-out": !showContent,
        })}
      >
        <section className="skill-container z-50">
          <SkillsSection skills={frontEndSkills} title="Front End" />
          <SkillsSection skills={backEndSkills} title="Back End" />
          <SkillsSection skills={devOpsSkills} title="Dev Ops " />
        </section>
      </div>
    </div>
  );
};
