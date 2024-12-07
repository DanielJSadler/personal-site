"use client";
import { useEffect, useRef, useState } from "react";
import { LandingPage } from "~/components/Pages";
import localFont from "next/font/local";
import { type DesktopCubeRef } from "~/utils/type";
import DesktopCube from "~/components/Template/DesktopCube/DesktopCube";
import { Mobile } from "~/components/Template/Mobile/Mobile";
const helveticaNeue = localFont({
  src: [
    {
      path: "../../public/fonts/HelveticaNeueBlack.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeueBlackItalic.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../public/fonts/HelveticaNeueHeavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeueHeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/fonts/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeueBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeueMediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/HelveticaNeueLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeueLightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/HelveticaNeueThin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeueThinItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/HelveticaNeueUltraLight.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeueUltraLightItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/HelveticaNeueItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-helvetica-neue",
});

const Page = () => {
  const [currentClass, setCurrentClass] = useState("show-front");
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingArray, setLoadingArray] = useState<string[]>([]);
  const cubeRef = useRef<DesktopCubeRef>(null);

  const handleClick = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    await cubeRef.current?.rotateCube();
    setTimeout(() => {
      console.log("Setting visible to false");
      setVisible(false);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!visible) {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      window.addEventListener("resize", () => {
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      });
    }
  }, [visible]);

  return (
    <div
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      className={`relative h-screen w-screen overflow-y-hidden ${visible ? `cursor-none` : `cursor-default`} ${helveticaNeue.className}`}
    >
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="viewport" content="width=device-width" />
      <LandingPage
        onClick={handleClick}
        visible={visible}
        loading={loading}
        loadingArray={loadingArray}
      />
      <DesktopCube
        currentClass={currentClass}
        setCurrentClass={setCurrentClass}
        loading={loading}
        ref={cubeRef}
        setLoadingArray={setLoadingArray}
      />
      <Mobile currentClass={currentClass} setCurrentClass={setCurrentClass} />
    </div>
  );
};

export default Page;
