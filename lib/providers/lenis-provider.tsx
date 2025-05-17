"use client";
import { LenisRef, ReactLenis, useLenis } from "lenis/react";

interface LenisProviderProps {
  children: React.ReactNode;
}
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenis = useLenis(({ scroll }) => {
    console.log({
      scroll,
    });
  });

  return <ReactLenis root>{children}</ReactLenis>;
}
