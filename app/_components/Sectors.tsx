"use client";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Sectors = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const sectors = [
    {
      id: "01",
      title: "Commercial",
      image: "/sectors/Commercial.webp",
      slug: "commercial",
    },
    {
      id: "02",
      title: "Oil & Gas",
      image: "/sectors/oil_gas.webp",
      slug: "oil-and-gas",
    },
    {
      id: "03",
      title: "Industrial & Logistics",
      image: "/sectors/Industrial_logistics.webp",
      slug: "industrial-and-logistics",
    },
    {
      id: "04",
      title: "Residential & Villa",
      image: "/sectors/Residential_Villa.webp",
      slug: "residential-and-villa",
    },
    {
      id: "05",
      title: "Road & Infrastructure",
      image: "/sectors/Road & Infrastructure.webp",
      slug: "road-and-infrastructure",
    },
    {
      id: "06",
      title: "Healthcare & Hospitality",
      image: "/sectors/Hospitality & Healthcare.webp",
      slug: "healthcare-and-hospitality",
    },
  ];

  useGSAP(() => {
    // Initial state
    gsap.set([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 40,
    });

    gsap.set(cardsRef.current, {
      opacity: 0,
      y: 60,
      scale: 0.95,
    });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom bottom",
        toggleActions: "play none none none",
      },
    });

    // Animate title and subtitle
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      // Animate cards with stagger
      .to(
        cardsRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: "random",
          },
          ease: "back.out(1.2)",
        },
        "-=0.4"
      );

    // Add hover animations for each card
    cardsRef.current.forEach((card) => {
      if (!card) return;

      const image = card.querySelector("img");
      const overlay = card.querySelector(".card-overlay");
      const button = card.querySelector(".learn-more-btn");
      const title = card.querySelector(".sector-title");
      const id = card.querySelector(".sector-id");

      // Hover animation timeline
      const cardTl = gsap.timeline({ paused: true });

      cardTl
        .to(image, {
          scale: 1.05,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(
          overlay,
          {
            backgroundColor: "rgba(200, 40, 40, 0.4)",
            duration: 0.4,
          },
          0
        )
        .to(
          title,
          {
            y: -20,
            duration: 0.4,
          },
          0
        )
        .to(
          id,
          {
            opacity: 0,
            y: -10,
            duration: 0.3,
          },
          0
        )
        .to(
          button,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          0.2
        );

      card.addEventListener("mouseenter", () => cardTl.play());
      card.addEventListener("mouseleave", () => cardTl.reverse());
    });
  }, []);

  return (
    <div ref={sectionRef} className="container mx-auto px-5 py-20 lg:py-32">
      <div className="max-w-4xl mx-auto mb-20 lg:mb-28 text-center">
        <h1
          ref={titleRef}
          className="text-5xl lg:text-7xl font-medium text-center mb-6 tracking-tight text-gray-900"
        >
          Our <span className="text-[#211574]">Sector</span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl lg:text-2xl font-light text-center mb-16 lg:mb-28 max-w-4xl mx-auto text-gray-600 leading-relaxed"
        >
          We specialize in delivering innovative and high-quality solutions
          across various sectors, ensuring functionality and sustainability
          while maintaining architectural excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector, index) => (
          <div
            key={sector.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="relative group overflow-hidden rounded-lg aspect-[4/3]"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={sector.image}
                alt={sector.title}
                fill
                className="object-cover transition-all duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3}
              />
            </div>

            <div className="card-overlay absolute inset-0 bg-black/40 flex flex-col justify-between p-8 transition-all duration-500">
              <span className="sector-id text-white text-lg font-light tracking-wider">
                {sector.id}
              </span>

              <div className="text-white">
                <h3 className="sector-title text-white text-2xl lg:text-3xl font-medium mb-6 transition-transform duration-500">
                  {sector.title}
                </h3>
                <Link
                  href={`/${sector.slug}`}
                  className="learn-more-btn opacity-0 translate-y-4 px-8 py-3 bg-transparent border border-white/70 text-white text-sm rounded-full font-light tracking-wider hover:bg-white/10 hover:border-white transition-all duration-500 inline-block"
                >
                  Explore Sector
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sectors;
