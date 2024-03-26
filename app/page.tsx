"use client";

import { useEffect, useRef } from "react";
import "./style.css";
import Navbar from "./navbar/navbar";
import TypeTest from "./type/type-test";

const cursorOffset = (e: any, ref: any) => {
  const rect = ref.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ref.current.style.setProperty("--cursor-x", x + "px");
  ref.current.style.setProperty("--cursor-y", y + "px");
};

export default function Home() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => cursorOffset(e, ref);
    const currentRef = ref.current;
    currentRef?.addEventListener("mousemove", handleMouseMove);
    return () => currentRef?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main>
      <div className="page-wrapper">
        <div className="w-embed"></div>
        <main>
          <header className="home-hero" ref={ref}>
            <div className="home-hero-bg-wrap">
              <div className="home-hero-bg-tiles"></div>
            </div>
            <Navbar />
            <TypeTest />
          </header>
        </main>
      </div>
    </main>
  );
}
