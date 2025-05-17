"use client";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Set initial states
    gsap.set([imageContainerRef.current, contentRef.current], {
      opacity: 0,
      y: 50,
    });

    gsap.set(imageRef.current, {
      rotationY: 15,
      rotationX: -5,
      transformPerspective: 1000,
      transformOrigin: "center center",
    });

    gsap.set(accentRef.current, {
      scale: 0.8,
      rotation: 45,
      opacity: 0,
    });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom center",
        scrub: 0.5,
        markers: false,
      },
    });

    // Image container animation
    tl.to(imageContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    });

    // 3D image tilt effect on scroll
    tl.to(
      imageRef.current,
      {
        rotationY: -5,
        rotationX: 2,
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      },
      "<"
    );

    // Content animation
    tl.to(
      contentRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.8"
    );

    // Staggered text animation
    tl.from(
      [
        titleRef.current,
        subtitleRef.current,
        descriptionRef.current,
        buttonRef.current,
      ],
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
      },
      "-=0.6"
    );

    // Accent shape animation
    tl.to(
      accentRef.current,
      {
        opacity: 0.15,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      },
      "-=1"
    );

    // Parallax effect for the container
    gsap.to(containerRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden py-32 px-4 md:px-8 bg-white"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <div className="absolute inset-0 bg-[size:50px_50px] [background-image:linear-gradient(to_right,black_1px,transparent_1px),linear-gradient(to_bottom,black_1px,transparent_1px)]"></div>
      </div>

      {/* Floating accent shape */}
      <div
        ref={accentRef}
        className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#f04343] blur-[80px] opacity-0 z-0"
      ></div>

      <div ref={containerRef} className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image container with 3D effect */}
          <div
            ref={imageContainerRef}
            className="w-full lg:w-1/2 h-[400px] lg:h-[500px] relative opacity-0"
          >
            <div
              ref={imageRef}
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black"
            >
              <Image
                src="/about.png"
                alt="About our company"
                fill
                className="object-cover object-center"
                quality={100}
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="w-full lg:w-1/2 opacity-0">
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6"
            >
              <span className="inline-block text-[#f04343]">Engineering</span>{" "}
              the future
            </h2>

            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl font-medium text-gray-700 mb-6"
            >
              Precision. Innovation. Excellence.
            </p>

            <p
              ref={descriptionRef}
              className="text-gray-600 mb-8 leading-relaxed"
            >
              Since 2006, Capital Engineering Consultancy has been at the
              forefront of engineering innovation across the UAE, Oman, India,
              KSA, and the UK. We specialize in delivering cutting-edge
              solutions in Engineering Consultancy, Residential & Commercial
              Design, Industrial Developments, and Infrastructure projects.
              <br />
              <br />
              Our portfolio includes collaborations with the Sharjah Ruler's
              Office, leading real estate developers, and multinational
              corporations. Each project reflects our commitment to unique,
              precise designs that exceed client expectations.
            </p>

            <div ref={buttonRef}>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="relative overflow-hidden group px-8 py-6 rounded-full border-2 border-gray-900 hover:border-transparent transition-all duration-300"
                >
                  <span className="relative z-10 font-medium">Know More</span>
                  <span className="absolute inset-0 bg-[#f04343] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-in-out"></span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
