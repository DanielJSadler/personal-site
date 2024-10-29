import { Pill } from "../Pill";
import { type Skills } from "./skills.types";

interface Props {
  title: string;
  skills: Skills[];
}

export const SkillsSection = ({ skills, title }: Props) => {
  return (
    <div className="flex flex-shrink flex-col items-start space-y-2 rounded-2xl p-8">
      <h3>{title}: </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <a href={skill.url} key={skill.skill}>
            <Pill label={skill.skill} />
          </a>
        ))}
      </div>
    </div>
  );
};
