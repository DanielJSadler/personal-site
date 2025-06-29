"use client";
import { useEffect, useRef, useState } from "react";
import { LandingPage } from "~/components/Pages";
import { type DesktopCubeRef } from "~/utils/type";
import DesktopCube from "~/components/Template/DesktopCube/DesktopCube";
import { Mobile } from "~/components/Template/Mobile/Mobile";

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
      className={`relative h-screen w-screen overflow-y-hidden ${visible ? `cursor-none` : `cursor-default`} font-mono`}
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
