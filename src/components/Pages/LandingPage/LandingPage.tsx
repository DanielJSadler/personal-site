"use client";

import { useRef, type PointerEvent } from "react";
import "./intro.css";
import {
  DanielSadlerSvg,
  MobileDanielSadlerSvg,
} from "~/components/Atoms/DanielSadlerSvg";
interface Props {
  visible: boolean;
  onClick: () => void;
  loading: boolean;
  loadingArray: string[];
}
import { LoadingBar } from "~/components/Atoms/LoadingBar/LoadingBar";

export const LandingPage = ({
  onClick,
  visible,
  loading,
  loadingArray,
}: Props) => {
  const cursor = useRef<HTMLSpanElement>(null);
  const moveCursor = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || !cursor.current) return;
    cursor.current.style.left = `${event.clientX}px`;
    cursor.current.style.top = `${event.clientY}px`;
    cursor.current.style.opacity = "1";
  };
  return (
    <section
      onPointerMove={moveCursor}
      onPointerLeave={() => { if (cursor.current) cursor.current.style.opacity = "0"; }}
      style={{ zIndex: 1000 }}
      className={`landing-page absolute z-[1000] flex h-screen w-screen flex-col items-center justify-center bg-black ${visible ? `flex` : `hidden`}`}
    >
      <button type="button" onClick={onClick} disabled={loading} className="intro-entry" aria-label="Enter portfolio">
        <span className="sr-only">Enter portfolio</span>
      </button>
      <div>
        <DanielSadlerSvg fill="white" className="hidden md:flex" />
        <MobileDanielSadlerSvg fill="white" className="flex md:hidden" />
        <div className="h-2">
          {loading && <LoadingBar segments={loadingArray} />}
        </div>
      </div>
      <span className="intro-hint" aria-hidden="true">{loading ? "Loading" : "Enter"}</span>
      <span ref={cursor} className={`intro-cursor ${loading ? "is-loading" : ""}`} aria-hidden="true">
        <span>{loading ? "Loading" : "Enter"}</span>
      </span>
    </section>
  );
};
