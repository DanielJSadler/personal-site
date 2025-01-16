import { Pill } from "../Atoms/Pill";
import { type Skills } from "./skills.types";

interface Props {
  title: string;
  skills: Skills[];
}

export const SkillsSection = ({ skills, title }: Props) => {
  return (
    <div className="flex flex-shrink flex-col items-center space-y-2 rounded-2xl p-6 md:items-start md:p-8">
      <h3 className="text-sm font-medium text-black md:text-base">
        {title.toUpperCase()}{" "}
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-2 md:items-start md:justify-start">
        {skills.map((skill) => (
          <a href={skill.url} key={skill.skill}>
            <Pill label={skill.skill} />
          </a>
        ))}
      </div>
    </div>
  );
};
