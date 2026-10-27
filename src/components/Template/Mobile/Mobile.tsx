"use client";
import { Homepage } from "~/components/Pages/Homepage";
import { Navigation } from "../Navigation";
import { Gradients } from "../Gradients/Gradients";
import { Experience } from "~/components/Pages/Experience/Experience";
import { Pictures } from "~/components/Pages/Pictures";
import { SkillsPage } from "~/components/Pages/Skills/Skills";
import { Portfolio } from "~/components/Pages/Portfolio";

interface Props {
  setCurrentClass: React.Dispatch<React.SetStateAction<string>>;
  currentClass: string;
}

export const Mobile = ({ currentClass, setCurrentClass }: Props) => {
  const handleButtonClick = (side: string) => {
    setTimeout(() => {
      setCurrentClass(`show-${side}`);
    }, 200);
  };
  return (
    <div className="mobile-world relative flex h-full w-full items-center justify-center md:hidden">
      <div className="mobile-navigation absolute bottom-0 z-50 flex w-full items-center justify-center">
        <Navigation handleButtonClick={handleButtonClick} currentSide={currentClass.replace("show-", "")} />
      </div>
      <Gradients currentClass={currentClass} />
      <div hidden={currentClass !== "show-front"} className="mobile-content absolute h-full w-full">
        <Homepage showContent={currentClass === "show-front"} />
      </div>
      <div hidden={currentClass !== "show-back"} className="mobile-content absolute h-full w-full">
        <Pictures showContent={currentClass === "show-back"} />
      </div>
      <div hidden={currentClass !== "show-right"} className="mobile-content absolute h-full w-full">
        <SkillsPage showContent={currentClass === "show-right"} />
      </div>

      <div hidden={currentClass !== "show-left"} className="mobile-content absolute h-full w-full">
        <Portfolio showContent={currentClass === "show-left"} />
      </div>
      <div hidden={currentClass !== "show-bottom"} className="mobile-content absolute h-full w-full">
        <Experience
          showContent={currentClass === "show-bottom"}
          header="Hi! I'm Daniel"
          text="I’m a full-stack developer passionate about creating seamless, user-friendly applications. With a focus on web technologies like React, Next.js, and Tailwind, I build responsive, high-performance interfaces. I also have extensive experience in mobile development with React Native. On the backend, I specialise in Node.js, Postgres, Prisma, and GraphQL, delivering robust and scalable solutions."
        />
      </div>
      <div hidden={currentClass !== "show-top"} className="mobile-content absolute h-full w-full">
        <Experience
          showContent={currentClass === "show-top"}
          header="More about me"
          text="When I'm not coding, you'll often find me out running, having completed my first half marathon in 2024! I also completed a sprint triathlon in summer 2023. I enjoy specialty coffee, craft beer, and have a background in coffee roasting and barista work. I also love to travel and am hoping to do 30 countries before I am 30."
        />
      </div>
    </div>
  );
};
