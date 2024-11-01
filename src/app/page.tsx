"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { LandingPage } from "~/components/Pages";
import { Experience } from "~/components/Pages/Experience/Experience";
import { SkillsPage } from "~/components/Pages/Skills/Skills";
import { Navigation } from "~/components/Template/Navigation";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/16/solid";
import { useWindowSize } from "~/hooks";
import { Pictures } from "~/components/Pages/Pictures";
import { Portfolio } from "~/components/Pages/Portfolio";

export default function HomePage() {
  const [currentClass, setCurrentClass] = useState("show-front");
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [showContent, setShowContent] = useState(true);
  const cubeRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;

    const changeSide = () => {
      cube.classList.forEach((cls) => {
        if (cls.startsWith("show-")) cube.classList.remove(cls);
      });
      cube.classList.add(currentClass);
    };
    if (width && width <= 1024) {
      setIsFullScreen(true);
    }

    changeSide();
  }, [currentClass, width]);

  const handleButtonClick = (side: string) => {
    if (isFullScreen) {
      setIsFullScreen(false);
      setShowContent(false);

      setTimeout(() => {
        setCurrentClass(`show-${side}`);
        setTimeout(() => {
          setIsFullScreen(true);
          setShowContent(true);
        }, 500);
      }, 1000);
    } else {
      setCurrentClass(`show-${side}`);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <main
      className={clsx(
        "relative flex max-h-screen min-h-screen flex-col overflow-y-hidden scroll-smooth bg-powederBlue text-white",
        { "is-fullscreen": isFullScreen },
      )}
    >
      <Navigation handleButtonClick={handleButtonClick} />
      <div className={clsx("scene", { "scene-fullscreen": isFullScreen })}>
        <div className={clsx("cube", currentClass)} ref={cubeRef}>
          <div className="cube__face cube__face--front bg-gradient-to-r from-orange-500 to-red-500">
            <div
              className={clsx("h-full w-full", {
                "fade-in": showContent,
                "fade-out": !showContent,
              })}
            >
              {isFullScreen ? (
                <ArrowsPointingInIcon
                  className="absolute right-4 top-4 hidden h-10 w-10 fill-white transition-all duration-200 hover:scale-125 hover:cursor-pointer lg:block"
                  onClick={toggleFullScreen}
                />
              ) : (
                <ArrowsPointingOutIcon
                  className="absolute right-4 top-4 hidden h-10 w-10 fill-white transition-all duration-200 hover:scale-125 hover:cursor-pointer lg:block"
                  onClick={toggleFullScreen}
                />
              )}
              <LandingPage />
            </div>
          </div>
          <div className="cube__face cube__face--back bg-gradient-to-t from-purple-500 to-indigo-500">
            <div
              className={clsx("h-full w-full", {
                "fade-in": showContent,
                "fade-out": !showContent,
              })}
            >
              {isFullScreen ? (
                <ArrowsPointingInIcon
                  className="absolute right-4 top-4 hidden h-10 w-10 fill-white transition-all duration-200 hover:scale-125 hover:cursor-pointer lg:block"
                  onClick={toggleFullScreen}
                />
              ) : (
                <ArrowsPointingOutIcon
                  className="absolute right-4 top-4 hidden h-10 w-10 fill-white transition-all duration-200 hover:scale-125 hover:cursor-pointer lg:block"
                  onClick={toggleFullScreen}
                />
              )}
              <Pictures />
            </div>
          </div>
          <div className="cube__face cube__face--right bg-gradient-to-r from-red-500 to-purple-500 @container">
            <div
              className={clsx("h-full w-full @container/skills", {
                "fade-in": showContent,
                "fade-out": !showContent,
              })}
            >
              {isFullScreen ? (
                <ArrowsPointingInIcon
                  className="absolute right-4 top-4 hidden h-10 w-10 fill-white transition-all duration-200 hover:scale-125 hover:cursor-pointer lg:block"
                  onClick={toggleFullScreen}
                />
              ) : (
                <ArrowsPointingOutIcon
                  className="absolute right-4 top-4 hidden h-10 w-10 fill-white transition-all duration-200 hover:scale-125 hover:cursor-pointer lg:block"
                  onClick={toggleFullScreen}
                />
              )}
              <SkillsPage />
            </div>
          </div>
          <div className="cube__face cube__face--left bg-gradient-to-r from-purple-500 to-orange-500 @container">
            <div
              className={clsx("h-full w-full", {
                "fade-in": showContent,
                "fade-out": !showContent,
              })}
            >
              {isFullScreen ? (
                <ArrowsPointingInIcon
                  className="absolute right-4 top-4 hidden h-10 w-10 fill-white transition-all duration-200 hover:scale-125 hover:cursor-pointer lg:block"
                  onClick={toggleFullScreen}
                />
              ) : (
                <ArrowsPointingOutIcon
                  className="absolute right-4 top-4 hidden h-10 w-10 fill-white transition-all duration-200 hover:scale-125 hover:cursor-pointer lg:block"
                  onClick={toggleFullScreen}
                />
              )}
              <Portfolio />
            </div>
          </div>
          <div className="cube__face cube__face--top bg-gradient-to-t from-orange-500 to-purple-500 @container/experience">
            <div
              className={clsx("h-full w-full", {
                "fade-in": showContent,
                "fade-out": !showContent,
              })}
            >
              {isFullScreen ? (
                <ArrowsPointingInIcon
                  className="absolute right-4 top-4 hidden h-10 w-10 fill-white transition-all duration-200 hover:scale-125 hover:cursor-pointer lg:block"
                  onClick={toggleFullScreen}
                />
              ) : (
                <ArrowsPointingOutIcon
                  className="absolute right-4 top-4 hidden h-10 w-10 fill-white transition-all duration-200 hover:scale-125 hover:cursor-pointer lg:block"
                  onClick={toggleFullScreen}
                />
              )}
              <Experience
                header="About Me"
                text="When I'm not coding, you'll often find me out running, having completed my first half marathon in 2024! I also completed a sprint triathlon in summer 2023. I enjoy specialty coffee, craft beer, and have a background in coffee roasting and barista work. I also love to travel and am hoping to do 30 countries before I am 30."
              />
            </div>
          </div>
          <div className="cube__face cube__face--bottom bg-gradient-to-b from-red-500 to-purple-500 @container/experience">
            <div
              className={clsx("h-full w-full", {
                "fade-in": showContent,
                "fade-out": !showContent,
              })}
            >
              {isFullScreen ? (
                <ArrowsPointingInIcon
                  className="absolute right-4 top-4 hidden h-10 w-10 fill-white transition-all duration-200 hover:scale-125 hover:cursor-pointer lg:block"
                  onClick={toggleFullScreen}
                />
              ) : (
                <ArrowsPointingOutIcon
                  className="absolute right-4 top-4 hidden h-10 w-10 fill-white transition-all duration-200 hover:scale-125 hover:cursor-pointer lg:block"
                  onClick={toggleFullScreen}
                />
              )}
              <Experience
                header="Experience"
                text="I’m a full-stack developer passionate about creating seamless, user-friendly applications. With a focus on web technologies like React, Next.js, and Tailwind, I build responsive, high-performance interfaces. I also have extensive experience in mobile development with React Native. On the backend, I specialise in Node.js, Postgres, Prisma, and GraphQL, delivering robust and scalable solutions."
              />
            </div>
          </div>
        </div>
        <div
          className={clsx(
            "absolute -bottom-[100px] left-[100px] -z-10 h-[300px] w-[500px] -skew-x-[20deg] bg-gray-600 blur-3xl transition-opacity duration-500",
            { "fade-in-shadow": !isFullScreen, "fade-out": isFullScreen },
          )}
        />
      </div>
    </main>
  );
}
