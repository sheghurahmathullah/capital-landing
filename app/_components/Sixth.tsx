"use client";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Sixth = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    {
      id: "01",
      title: "Architecture & Landscape",
      description:
        "Crafting visionary designs that blend aesthetics with functionality.",
      image: "/expertise/Architectural & Landscape.webp",
      position: "bottom",
      color: "from-emerald-50 to-white",
      accent: "bg-emerald-500",
    },
    {
      id: "02",
      title: "Fit-out and Interior Design",
      description: "Creating sophisticated interiors tailored to client needs.",
      image: "/expertise/Fit-out & Interior Design.webp",
      position: "center",
      color: "from-amber-50 to-white",
      accent: "bg-amber-500",
    },
    {
      id: "03",
      title: "Structural Engineering",
      description: "Engineering robust and innovative structural solutions.",
      image: "/expertise/Structural Engineering.webp",
      position: "bottom",
      color: "from-slate-50 to-white",
      accent: "bg-slate-500",
    },
    {
      id: "04",
      title: "Project Management",
      description: "Ensuring seamless execution from concept to completion.",
      image: "/expertise/Project management.webp",
      position: "bottom",
      color: "from-blue-50 to-white",
      accent: "bg-blue-500",
    },
    {
      id: "05",
      title: "Environmental Solutions",
      description: "Implementing sustainable strategies for a greener future.",
      image: "/expertise/Environmental solution.webp",
      position: "center",
      color: "from-green-50 to-white",
      accent: "bg-green-500",
    },
    {
      id: "06",
      title: "MEP Design & Services",
      description:
        "Delivering efficient mechanical, electrical, and plumbing solutions.",
      image: "/expertise/MEP.webp",
      position: "bottom",
      color: "from-red-50 to-white",
      accent: "bg-red-500",
    },
  ];

  useGSAP(() => {
    // Initial state
    gsap.set([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 80,
    });

    gsap.set(cardsRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.95,
    });

    gsap.set(imageRefs.current, {
      scale: 1.2,
    });

    gsap.set(overlayRefs.current, {
      height: "100%",
    });

    // Create master timeline
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom bottom",
        toggleActions: "play none none none",
      },
    });

    // Title animation
    masterTl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "expo.out",
    });

    // Subtitle animation
    masterTl.to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8"
    );

    // Cards animation with staggered reveal
    features.forEach((_, i) => {
      masterTl.to(
        cardsRef.current[i],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        i * 0.1
      );

      // Image scale animation
      masterTl.to(
        imageRefs.current[i],
        {
          scale: 1,
          duration: 1.5,
          ease: "expo.out",
        },
        i * 0.1
      );

      // Image overlay animation
      masterTl.to(
        overlayRefs.current[i],
        {
          height: "0%",
          duration: 1.2,
          ease: "expo.inOut",
        },
        i * 0.1 + 0.3
      );
    });

    // Hover animations for cards
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(imageRefs.current[i], {
          scale: 1.05,
          duration: 0.5,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(imageRefs.current[i], {
          scale: 1,
          duration: 0.5,
        });
      });
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="container mx-auto px-5 py-20 lg:py-32 relative overflow-hidden 
      bg-gradient-to-br from-gray-50 to-gray-100 
      before:absolute before:inset-0 
      before:bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.05)_50%,transparent_75%)] 
      before:opacity-50 
      before:pointer-events-none"
    >
      {/* Architectural Blueprint-Inspired Background Elements */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full 
          bg-[linear-gradient(transparent_1px,transparent_1px),linear-gradient(90deg,transparent_1px,transparent_1px)] 
          bg-[size:50px_50px] 
          opacity-30 
          rotate-6 
          scale-110"
        ></div>

        {/* Subtle Construction Grid Overlay */}
        <div
          className="absolute inset-0 
          bg-[radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] 
          bg-[size:20px_20px] 
          opacity-50"
        ></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-emerald-100/30 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-blue-100/30 blur-3xl"></div>

        {/* New Architectural Accent Elements */}
        <div
          className="absolute top-10 right-20 w-20 h-20 
          border-4 border-dashed border-gray-200/50 
          rotate-45 opacity-30"
        ></div>

        <div
          className="absolute bottom-20 left-20 w-16 h-16 
          bg-gray-100/20 
          border-2 border-gray-200/30 
          transform skew-x-12 opacity-40"
        ></div>
      </div>

      <div className="relative z-10">
        <h1
          ref={titleRef}
          className="text-5xl lg:text-7xl font-medium text-center mb-6 tracking-tight text-gray-900"
        >
          Our <span className="text-[#211574]">Expertise</span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl lg:text-2xl font-light text-center mb-16 lg:mb-28 max-w-4xl mx-auto text-gray-600 leading-relaxed"
        >
          We are experts in creating efficient, quality building systems and
          infrastructure without compromising aesthetic design.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-start lg:px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`flex flex-col w-full max-w-[480px] mx-auto rounded-2xl overflow-hidden transition-all duration-300 bg-gradient-to-b ${feature.color} hover:shadow-xl`}
            >
              {/* Card content */}
              <div className="p-6 pb-0 relative">
                {/* <div className={`absolute top-6 right-6 w-3 h-3 rounded-full ${feature.accent}`}></div> */}
                <span className="text-5xl font-medium text-gray-300">
                  {feature.id}
                </span>
                <h3 className="text-xl font-semibold mt-2 text-gray-800">
                  {feature.title}
                </h3>

                {/* Show description on top for center positioned cards */}
                {feature.position === "center" && (
                  <p className="text-gray-600 mt-3 text-base">
                    {feature.description}
                  </p>
                )}
              </div>

              {/* Image container */}
              <div className="relative w-full aspect-[4/3] mt-4 overflow-hidden">
                {/* Image overlay for animation */}
                <div
                  ref={(el) => {
                    overlayRefs.current[index] = el;
                  }}
                  className="absolute top-0 left-0 w-full h-full bg-white z-10"
                ></div>

                {/* Image with scale animation */}
                <div
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Show description at bottom for bottom positioned cards */}
              {feature.position === "bottom" && (
                <div className="p-6 pt-4">
                  <p className="text-gray-600 text-base">
                    {feature.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sixth;
