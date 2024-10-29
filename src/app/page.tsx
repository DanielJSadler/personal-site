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

export default function HomePage() {
  const [page, setPage] = useState(1);
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
        "relative flex max-h-screen min-h-screen flex-col overflow-y-scroll scroll-smooth bg-powederBlue text-white",
        { "is-fullscreen": isFullScreen },
      )}
    >
      <Navigation handleButtonClick={handleButtonClick} />
      <div className={clsx("scene", { "scene-fullscreen": isFullScreen })}>
        <div className={clsx("cube", currentClass)} ref={cubeRef}>
          <div className="cube__face cube__face--front bg-gradient-to-t from-red-500 to-orange-500">
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
              <LandingPage setPage={setPage} />
            </div>
          </div>
          <div className="cube__face cube__face--back bg-gradient-to-t from-fuchsia-500 to-cyan-500">
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
              Back
            </div>
          </div>
          <div className="cube__face cube__face--right bg-gradient-to-t from-emerald-500 to-emerald-900 @container">
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
              <SkillsPage />
            </div>
          </div>
          <div className="cube__face cube__face--left bg-gradient-to-t from-slate-900 to-slate-700">
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
              Left
            </div>
          </div>
          <div className="cube__face cube__face--top bg-gradient-to-t from-lapisLazuli to-moonStone @container">
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
                setPage={setPage}
                header="About Me"
                text="When I'm not coding, you'll often find me out running, having completed my first half marathon in 2024! I also completed a sprint triathlon in summer 2023. I enjoy specialty coffee, craft beer, and have a background in coffee roasting and barista work."
              />
            </div>
          </div>
          <div className="cube__face cube__face--bottom bg-gradient-to-t from-fuchsia-600 to-purple-600 @container">
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
                setPage={setPage}
                header="Experience"
                text="I’m a full-stack developer passionate about creating seamless, user-friendly applications. With a focus on web technologies like React, Next.js, and Tailwind, I build responsive, high-performance interfaces. I also have extensive experience in mobile development with React Native. On the backend, I specialize in Node.js, Postgres, Prisma, and GraphQL, delivering robust and scalable solutions."
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
