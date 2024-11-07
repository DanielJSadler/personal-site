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
import { Portfolio } from "~/components/Pages/Portfolio";
import { Homepage } from "~/components/Pages/Homepage";
import { DesktopCubeRef } from "~/utils/type";

interface DesktopCubeProps {
  setLoadingArray: React.Dispatch<React.SetStateAction<string[]>>;
}

const DesktopCube = forwardRef<DesktopCubeRef, DesktopCubeProps>(
  ({ setLoadingArray }, ref) => {
    const [currentClass, setCurrentClass] = useState("show-front");
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
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

        setTimeout(() => {
          setCurrentClass(`show-${side}`);
          setTimeout(() => {
            setIsFullScreen(true);
            setShowContent(true);
          }, 1000);
        }, 1000);
      } else {
        setCurrentClass(`show-${side}`);
      }
    };

    return (
      <main
        className={clsx(
          "relative flex max-h-screen min-h-screen flex-col overflow-x-hidden overflow-y-hidden scroll-smooth bg-[#D8D8D8] text-white",
          { "is-fullscreen": isFullScreen },
        )}
      >
        <Navigation handleButtonClick={handleButtonClick} />
        <div
          className={clsx("scene flex items-center justify-center", {
            "scene-fullscreen": isFullScreen,
          })}
        >
          {/* Front Gradient */}
          <div
            className={clsx(
              `absolute h-2/3 w-2/3 rounded-full bg-gradient-to-b from-[#00C2FF] to-[#293FFF] blur-3xl transition-opacity duration-[700ms]`,
              {
                "opacity-100": currentClass === "show-front",
                "opacity-0": currentClass !== "show-front",
              },
            )}
          />

          {/* Right Gradient */}
          <div
            className={clsx(
              `absolute h-2/3 w-2/3 rounded-full bg-gradient-to-b from-[#00C2FF] to-[#FF29C3] blur-3xl transition-opacity duration-[700ms]`,
              {
                "opacity-100": currentClass === "show-right",
                "opacity-0": currentClass !== "show-right",
              },
            )}
          />

          {/* Back Gradient */}
          <div
            className={clsx(
              `absolute h-2/3 w-2/3 rounded-full bg-gradient-to-b from-[#FF29C3] to-[#FFD700] blur-3xl transition-opacity duration-[700ms]`,
              {
                "opacity-100": currentClass === "show-back",
                "opacity-0": currentClass !== "show-back",
              },
            )}
          />

          {/* Left Gradient */}
          <div
            className={clsx(
              `absolute h-2/3 w-2/3 rounded-full bg-gradient-to-b from-[#FFD700] to-[#4CAF50] blur-3xl transition-opacity duration-[700ms]`,
              {
                "opacity-100": currentClass === "show-left",
                "opacity-0": currentClass !== "show-left",
              },
            )}
          />

          {/* Top Gradient */}
          <div
            className={clsx(
              `absolute h-2/3 w-2/3 rounded-full bg-gradient-to-b from-[#4CAF50] to-[#FF5733] blur-3xl transition-opacity duration-[700ms]`,
              {
                "opacity-100": currentClass === "show-top",
                "opacity-0": currentClass !== "show-top",
              },
            )}
          />

          {/* Bottom Gradient */}
          <div
            className={clsx(
              `absolute h-2/3 w-2/3 rounded-full bg-gradient-to-b from-[#FF5733] to-[#00C2FF] blur-3xl transition-opacity duration-[700ms]`,
              {
                "opacity-100": currentClass === "show-bottom",
                "opacity-0": currentClass !== "show-bottom",
              },
            )}
          />
          <div
            className={clsx(
              "cube flex items-center justify-center",
              currentClass,
            )}
            ref={cubeRef}
          >
            <Homepage showContent={showContent} />

            <Pictures showContent={showContent} />

            <SkillsPage showContent={showContent} />

            <Portfolio showContent={showContent} />
            <div className="cube__face cube__face--top bg-gradient-to-t @container/experience">
              <div
                className={clsx("z-50 h-full w-full bg-white/35", {
                  "fade-in": showContent,
                  "fade-out": !showContent,
                })}
              >
                <Experience
                  header="About Me"
                  text="When I'm not coding, you'll often find me out running, having completed my first half marathon in 2024! I also completed a sprint triathlon in summer 2023. I enjoy specialty coffee, craft beer, and have a background in coffee roasting and barista work. I also love to travel and am hoping to do 30 countries before I am 30."
                />
              </div>
            </div>
            <div className="cube__face cube__face--bottom flex items-center justify-center @container/experience">
              <div
                className={clsx("z-50 h-full w-full bg-white/35", {
                  "fade-in": showContent,
                  "fade-out": !showContent,
                })}
              >
                <Experience
                  header="Experience"
                  text="I’m a full-stack developer passionate about creating seamless, user-friendly applications. With a focus on web technologies like React, Next.js, and Tailwind, I build responsive, high-performance interfaces. I also have extensive experience in mobile development with React Native. On the backend, I specialise in Node.js, Postgres, Prisma, and GraphQL, delivering robust and scalable solutions."
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  },
);
DesktopCube.displayName = "DesktopCube";

export default DesktopCube;
