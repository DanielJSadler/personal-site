"use client";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { Experience } from "~/components/Pages/Experience/Experience";
import { SkillsPage } from "~/components/Pages/Skills/Skills";
import { Navigation } from "~/components/Template/Navigation";
import { useWindowSize } from "~/hooks";
import { Pictures } from "~/components/Pages/Pictures";
import { Portfolio, PortfolioDesktop } from "~/components/Pages/Portfolio";
import { Homepage } from "~/components/Pages/Homepage";
import { type DesktopCubeRef } from "~/utils/type";
import { Gradients } from "../Gradients/Gradients";

interface DesktopCubeProps {
  setLoadingArray: React.Dispatch<React.SetStateAction<string[]>>;
  loading: boolean;
  setCurrentClass: React.Dispatch<React.SetStateAction<string>>;
  currentClass: string;
}

const DesktopCube = forwardRef<DesktopCubeRef, DesktopCubeProps>(
  ({ setLoadingArray, loading, currentClass, setCurrentClass }, ref) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showContent, setShowContent] = useState(true);
    const cubeRef = useRef<HTMLDivElement>(null);
    const { width } = useWindowSize();

    const rotateCube = async () => {
      const sides = ["front", "right", "back", "left", "top", "bottom"];
      const messages = [
        "Loading Front...",
        "Loading Right...",
        "Loading Back...",
        "Loading Left...",
        "Loading Top...",
        "Loading Bottom...",
      ];

      for (let i = 0; i < sides.length; i++) {
        setCurrentClass(`show-${sides[i]}`);
        if (i !== 0) {
          setLoadingArray((prevArray) => [...prevArray, messages[i]!]);
        }
        await new Promise((resolve) => setTimeout(resolve, 400));
      }
      setCurrentClass("show-front");
      setLoadingArray((prevArray) => [...prevArray, "Rotation Complete!"]);
    };

    useImperativeHandle(ref, () => ({
      rotateCube,
    }));

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
      if (width && width > 1024) {
        setIsFullScreen(false);
      }

      changeSide();
    }, [currentClass, width]);

    const handleButtonClick = (side: string) => {
      if (isFullScreen) {
        setIsFullScreen(false);
        setShowContent(false);

        setTimeout(
          () => {
            setCurrentClass(`show-${side}`);
            setTimeout(
              () => {
                setShowContent(true);
              },
              loading ? 200 : 1000,
            );
          },
          loading ? 200 : 1000,
        );
      } else {
        setCurrentClass(`show-${side}`);
      }
    };

    return (
      <main
        className={clsx(
          "hidden max-h-screen min-h-screen w-full flex-col items-center justify-center overflow-x-hidden overflow-y-hidden scroll-smooth bg-[#D8D8D8] text-white md:relative md:flex",
          {
            "is-fullscreen": isFullScreen,
          },
        )}
      >
        <PortfolioDesktop showContent={currentClass === "show-left"} />
        <div
          className={clsx("scene flex items-center justify-center", {
            "scene-fullscreen": isFullScreen,
          })}
        >
          {/* Front Gradient */}
          <Gradients currentClass={currentClass} />
          <div
            className={clsx(
              "cube flex items-center justify-center",
              currentClass,
            )}
            ref={cubeRef}
          >
            <div className="cube__face cube__face--front relative flex items-center justify-center">
              <Homepage showContent={showContent} />
            </div>
            <div className="cube__face cube__face--back h-full w-full">
              <Pictures showContent={showContent} />
            </div>
            <div className="cube__face cube__face--right z-50 flex items-center justify-center @container">
              <SkillsPage showContent={showContent} />
            </div>
            <div className="cube__face cube__face--left @container">
              <Portfolio showContent={showContent} />
            </div>
            <div className="cube__face cube__face--top bg-gradient-to-t @container/experience">
              <Experience
                showContent={showContent}
                header="More about me"
                text="When I'm not coding, you'll often find me out running, having completed my first half marathon in 2024! I also completed a sprint triathlon in summer 2023. I enjoy specialty coffee, craft beer, and have a background in coffee roasting and barista work. I also love to travel and am hoping to do 30 countries before I am 30."
              />
            </div>
            <div className="cube__face cube__face--bottom flex items-center justify-center @container/experience">
              <Experience
                showContent={showContent}
                header="Hi! I'm Daniel"
                text="I’m a full-stack developer passionate about creating seamless, user-friendly applications. With a focus on web technologies like React, Next.js, and Tailwind, I build responsive, high-performance interfaces. I also have extensive experience in mobile development with React Native. On the backend, I specialise in Node.js, Postgres, Prisma, and GraphQL, delivering robust and scalable solutions."
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 flex w-full items-center justify-center">
          <Navigation handleButtonClick={handleButtonClick} />
        </div>
      </main>
    );
  },
);
DesktopCube.displayName = "DesktopCube";

export default DesktopCube;
