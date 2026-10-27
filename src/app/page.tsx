"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { LandingPage } from "~/components/Pages";
import { type DesktopCubeRef } from "~/utils/type";
import { Mobile } from "~/components/Template/Mobile/Mobile";
import { useDesktop } from "~/hooks/useDesktop";

const DesktopCube = dynamic(() => import("~/components/Template/DesktopCube/DesktopCube"), { ssr: false });

const Page = () => {
  const [currentClass, setCurrentClass] = useState("show-front");
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingArray, setLoadingArray] = useState<string[]>([]);
  const cubeRef = useRef<DesktopCubeRef>(null);
  const desktop = useDesktop();

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
    const updateHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      className="portfolio-app relative h-screen w-screen overflow-y-hidden font-mono"
    >
      <LandingPage
        onClick={handleClick}
        visible={visible}
        loading={loading}
        loadingArray={loadingArray}
      />
      {desktop === true && <DesktopCube
        currentClass={currentClass}
        setCurrentClass={setCurrentClass}
        loading={loading}
        ref={cubeRef}
        setLoadingArray={setLoadingArray}
      />}
      {desktop === false && <Mobile currentClass={currentClass} setCurrentClass={setCurrentClass} />}
    </div>
  );
};

export default Page;
