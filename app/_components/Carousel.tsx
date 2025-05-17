"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

interface Property {
  id: number;
  name: string;
  Category: string;
  description: string;
  image: string;
}

export default function Carousel() {
  const properties: Property[] = [
    {
      id: 1,
      name: "BAPS Hindu Mandir",
      Category: "Religious",
      description:
        "A majestic traditional stone temple built by BAPS in Abu Dhabi, symbolizing peace, spirituality, and cultural harmony",
      image: "/projects/BAPS Hindu Mandir - Religious.webp",
    },
    {
      id: 2,
      name: "Change Food Kezad",
      Category: "Food & Beverages",
      description:
        "A high-efficiency food processing facility in KEZAD, designed and supervised by Capital Engineering Consultancy",
      image: "/projects/Change Foods kezad - Food & Beverages .jpg",
    },
    {
      id: 3,
      name: "Tesoro Casa",
      Category: "Commercial",
      description:
        "Interior fit-out of TESORO CASA's Galleria unit by Capital Engineering Consultancy, blending luxury design with brand standards.",
      image: "/projects/Tesoro Casa - Commercial.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const textRef = useRef<HTMLDivElement>(null);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);
  const animateSlide = useCallback(
    (direction: "next" | "prev") => {
      if (isAnimating) return;
      setIsAnimating(true);

      // Clear existing timeout
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }

      const nextIndex =
        direction === "next"
          ? (currentIndex + 1) % properties.length
          : (currentIndex - 1 + properties.length) % properties.length;

      // Animate out
      gsap.to(slideRefs.current[1], {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });

      gsap.to(textRef.current, {
        y: direction === "next" ? 20 : -20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentIndex(nextIndex);

          // Animate in
          gsap.fromTo(
            slideRefs.current[1],
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
          );

          gsap.fromTo(
            textRef.current,
            { y: direction === "next" ? -20 : 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => {
                setIsAnimating(false);
                // Start next automatic transition
                startAutoTransition();
              },
            }
          );
        },
      });
    },
    [currentIndex, isAnimating, properties.length]
  );

  const startAutoTransition = useCallback(() => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }
    autoplayTimeoutRef.current = setTimeout(() => {
      animateSlide("next");
    }, 3000);
  }, [animateSlide]);

  useEffect(() => {
    startAutoTransition();
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [startAutoTransition]);

  const nextSlide = useCallback(() => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }
    animateSlide("next");
  }, [animateSlide]);

  const prevSlide = useCallback(() => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }
    animateSlide("prev");
  }, [animateSlide]);

  const handleMouseEnter = useCallback(() => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    startAutoTransition();
  }, [startAutoTransition]);

  const getSlideIndex = (offset: number) => {
    return (currentIndex + offset + properties.length) % properties.length;
  };

  return (
    <div
      className="w-full max-w-[88rem] mx-auto px-4 md:px-8 py-0 md:py-8 mt-8 
      relative 
      overflow-hidden"
    >
      {/* Dot Pattern Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          )}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between mb-4 lg:mb-8">
          <h1 className="text-4xl w-80 lg:w-1/3 lg:text-5xl font-bold text-gray-800">
            Our Projects
          </h1>
          <p className="text-gray-600 text-lg lg:text-justify w-80 lg:w-96 md:text-xl lg:px-3">
            Delivering innovative, precise, and high-quality projects that meet
            global engineering and construction standards.
          </p>
        </div>

        {render && (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative h-[280px] sm:h-[350px] md:h-[400px] mx-auto max-w-[900px]">
              <div
                ref={(el) => {
                  slideRefs.current[0] = el;
                }}
                className="absolute hidden lg:block top-7 lg:top-1/4 -translate-y-1/2 -left-24 md:-left-6 w-[100%] md:w-[50%] aspect-[3/2] z-10 transition-all duration-500"
                style={{
                  transform:
                    "perspective(1000px) rotateY(45deg) translateX(-50%)",
                  opacity: "0.4",
                  transformOrigin: "left center",
                }}
              >
                <div className="w-full h-full relative rounded-lg overflow-hidden">
                  <Image
                    src={properties[getSlideIndex(-1)].image || "/Carousel.png"}
                    alt="Previous"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div
                ref={(el) => {
                  slideRefs.current[1] = el;
                }}
                className="absolute top-[15%] bottom-0 left-0 right-0 m-auto w-full lg:w-[70%] h-[85%] z-20 transition-all duration-500"
                style={{
                  transform: "none",
                  margin: "auto",
                }}
              >
                <div className="w-full h-full relative rounded-lg overflow-hidden">
                  <Image
                    src={properties[currentIndex].image || "/Carousel.png"}
                    alt={properties[currentIndex].name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div
                ref={(el) => {
                  slideRefs.current[2] = el;
                }}
                className="absolute hidden lg:block top-7 lg:top-1/4 -translate-y-1/2 -right-24 md:-right-6 w-[100%] md:w-[50%] aspect-[3/2] z-10 transition-all duration-500"
                style={{
                  transform:
                    "perspective(1000px) rotateY(-45deg) translateX(50%)",
                  opacity: "0.4",
                  transformOrigin: "right center",
                }}
              >
                <div className="w-full h-full relative rounded-lg overflow-hidden">
                  <Image
                    src={properties[getSlideIndex(1)].image || "/Carousel.png"}
                    alt="Next"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-[1.5%] lg:left-[12%] -translate-y-1/2 rounded-full bg-black text-black lg:text-white z-30 h-8 w-8 md:h-10 md:w-10"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-[2%] lg:right-[12%] -translate-y-1/2 rounded-full bg-black text-black lg:text-white z-30 h-8 w-8 md:h-10 md:w-10"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>

            <div ref={textRef} className="lg:max-w-[48%] mx-auto mt-3 lg:mt-6">
              <div className="flex flex-row justify-between items-center mb-2 px-4">
                <h2 className="text-base lg:text-2xl font-bold truncate">
                  {properties[currentIndex].name}
                </h2>
                <p className="text-sm lg:text-lg font-bold ml-4">
                  {properties[currentIndex].Category}
                </p>
              </div>
              <p className="text-sm lg:text-sm text-gray-500 px-4">
                {properties[currentIndex].description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
