"use client";
import { forwardRef, useImperativeHandle } from "react";
import { Experience } from "~/components/Pages/Experience/Experience";
import { SkillsPage } from "~/components/Pages/Skills/Skills";
import { Navigation } from "~/components/Template/Navigation";
import { Pictures } from "~/components/Pages/Pictures";
import { PortfolioDesktop } from "~/components/Pages/Portfolio";
import { Homepage } from "~/components/Pages/Homepage";
import { type DesktopCubeRef } from "~/utils/type";
import { ThreeCube, sides, type Side } from "./ThreeCube";

interface DesktopCubeProps {
 setLoadingArray: React.Dispatch<React.SetStateAction<string[]>>;
 loading: boolean;
 setCurrentClass: React.Dispatch<React.SetStateAction<string>>;
 currentClass: string;
}
const DesktopCube = forwardRef<DesktopCubeRef, DesktopCubeProps>(
 ({ setLoadingArray, currentClass, setCurrentClass }, ref) => {
  const active = currentClass.replace("show-", "") as Side;
  useImperativeHandle(ref, () => ({ rotateCube: async () => {
   if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.innerWidth >= 768) {
    for (const side of sides) {
     setCurrentClass(`show-${side}`);
     setLoadingArray(previous => [...previous, `Loading ${side}...`]);
     await new Promise(resolve => setTimeout(resolve, 350));
    }
   }
   setCurrentClass("show-front");
  }}));
  return <main className="desktop-world hidden md:block">
   <ThreeCube active={active} onSideChange={side => setCurrentClass(`show-${side}`)}>{[
    <Homepage key="home" showContent />,
    <SkillsPage key="skills" showContent />,
    <Pictures key="pictures" showContent={active === "back"} />,
    <PortfolioDesktop key="portfolio" showContent />,
    <Experience key="bio" showContent header="More about me" text="When I'm not coding, you'll often find me out running, having completed my first half marathon in 2024! I also completed a sprint triathlon in summer 2023. I enjoy specialty coffee, craft beer, and have a background in coffee roasting and barista work. I also love to travel and am hoping to do 30 countries before I am 30." />,
    <Experience key="about" showContent header="Hi! I'm Daniel" text="I'm a full-stack developer passionate about creating seamless, user-friendly applications. With a focus on React, Next.js, and Tailwind, I build responsive, high-performance interfaces. I also work with React Native, Node.js, Postgres, Prisma, and GraphQL." />,
   ]}</ThreeCube>
   <div className="desktop-navigation"><Navigation handleButtonClick={side => setCurrentClass(`show-${side}`)} currentSide={active} /></div>
  </main>;
 });
DesktopCube.displayName = "DesktopCube";
export default DesktopCube;
