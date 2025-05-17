"use client";
import React, { useEffect, useRef } from "react";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Add from "./_components/Add";
import About from "./_components/About";
import Sixth from "./_components/Sixth";
import FAQ from "./_components/FAQ";
import Testimonials from "./_components/Testimonials";
import Building from "@/components/Canvas/Building";
import Sectors from "./_components/Sectors";
import FounderInsights from "./_components/CeoVideo"

import { useScroll } from "./lib/use-scroll";
import { cn } from "@/lib/utils";
import HorizontalScroll from "@/components/global/HorizontalScroll";
import Carousel from "./_components/Carousel";

const Page = () => {
  const { state, scrollingThreshold, setScrolling, setState } = useScroll();
  const buildingRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const twoDRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const prevTopRef = useRef<number>(0);
  const afterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    console.log({
      state,
    });

    if (state === "before-3d") {
      twoDRef.current?.focus();

      document.body.style.overflow = "auto";
    }
    if (state === "after-3d") {
      twoDRef.current?.focus();
      // window.scrollTo({
      //   top: afterRef.current!.getBoundingClientRect().top + window.scrollY,
      //   behavior: "smooth",
      // });

      document.body.style.overflow = "auto";
    }
    if (state === "3d") {
      canvasRef.current?.focus();
      window.scrollTo({
        top: buildingRef!.current!.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      });
      setTimeout(() => {
        window.scrollTo({
          top:
            buildingRef!.current!.getBoundingClientRect().top + window.scrollY,
          behavior: "smooth",
        });
        document.body.style.overflow = "hidden";
      }, 1000);
    }
  }, [state]);

  useEffect(() => {
    if (buildingRef.current) {
      const bounding = buildingRef.current.getBoundingClientRect();
      const isScrolledUp = prevTopRef.current < bounding.top;

      const isValueChangedFromNegativeToPositive =
        prevTopRef.current < 0 && bounding.top >= 0;
      const isValueChangedFromPositiveToNegative =
        prevTopRef.current > 0 && bounding.top <= 0;
      if (isScrolledUp && isValueChangedFromNegativeToPositive) {
        setScrolling("up");
        setState("3d");
      }
      if (isValueChangedFromPositiveToNegative) {
        setScrolling("down");
      }
      if (prevTopRef.current !== bounding.top) {
        prevTopRef.current = bounding.top;
      }
    }
  });
  return (
    <main
      className={cn(
        "relative no-scrollbar",
        state === "3d" ? "overflow-hidden" : "overflow-visible"
      )}
      ref={twoDRef}
    >
      <div
        className={cn(
          scrollingThreshold == 0 ? "visible h-auto" : "invisible -z-10"
        )}
      >
        {/* <Navbar /> */}
        <Hero />
        <div ref={aboutRef}>
          <About />
        </div>
      </div>

      <div className="">
        <Building containerRef={buildingRef} canvasRef={canvasRef} />
      </div>
      <div
        ref={afterRef}
        className={cn(
          "opacity-100 overflow-visible  transition-all",
          state === "after-3d"
            ? "h-auto max-h-auto"
            : "h-0 max-h-0 overflow-hidden"
        )}
      >
        <Add />
        <Sixth />
        <Sectors />
        <Carousel />
        <HorizontalScroll />
       
        <Testimonials />
        <FounderInsights/>
        <FAQ />
      </div>
    </main>
  );
};

export default Page;
