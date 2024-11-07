"use client";
import { useRef, useState } from "react";
import { LandingPage } from "~/components/Pages";
import localFont from "next/font/local";
import { DesktopCubeRef } from "~/utils/type";
import DesktopCube from "~/components/Template/DesktopCube/DesktopCube";
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
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingArray, setLoadingArray] = useState<string[]>([]); // Array to hold loading messages
  const cubeRef = useRef<DesktopCubeRef>(null);

  const handleClick = async () => {
    setLoading(true);
    await cubeRef.current?.rotateCube(); // Call the rotateCube function
    setTimeout(() => {
      console.log("Setting visible to false");
      setVisible(false);
      setLoading(false); // Stops loading indication if needed
    }, 1000); // Adjust delay as needed
  };

  return (
    <div
      className={`relative h-screen w-screen ${visible ? `cursor-none` : `cursor-auto`} ${helveticaNeue.className}`}
    >
      <LandingPage
        onClick={handleClick}
        visible={visible}
        loading={loading}
        loadingArray={loadingArray}
      />
      <DesktopCube ref={cubeRef} setLoadingArray={setLoadingArray} />
    </div>
  );
};

export default Page;
