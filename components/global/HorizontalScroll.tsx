"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { Button } from "../ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cards = [
  {
    id: 1,
    title: "Our Experience",
    image: "/horizontal-scroll/experience.webp",
    content:
      "With 17+ years of expertise,we have spent decades developing proven systems and practices that enable us to be a reliable, worry-free partner ",
  },
  {
    id: 2,
    title: "Our People",
    image: "/horizontal-scroll/Our people.webp",
    content:
      "We are dedicated professionals who take pride in our work and strive to build great relationships.",
  },
  {
    id: 3,
    title: "Our Partners",
    image: "/horizontal-scroll/partners.webp",
    content:
      "We look to add value and create long-term partnerships on every project, big or small, from start to finish ",
  },
];

function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      initScrollTrigger();
      setIsInitialized(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [isInitialized]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInitialized) {
      video.play().catch((err) => {
        console.warn("Video autoplay failed:", err);
      });
    } else {
      video.pause();
    }
  }, [isInitialized]);

  const initScrollTrigger = () => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;

    if (!section || !wrapper) return;

    const totalCardWidth = Array.from(wrapper.children).reduce(
      (acc, el) => acc + el.clientWidth,
      0
    );
    const gapSize = 32;
    const totalGapWidth = gapSize * (wrapper.children.length - 1);
    const extraRightPadding = window.innerWidth * 0.3;
    const scrollWidth = totalCardWidth + totalGapWidth + extraRightPadding;
    const viewportWidth = window.innerWidth;

    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    gsap.killTweensOf(wrapper);

    const ctx = gsap.context(() => {
      const tween = gsap.to(wrapper, {
        x: -(scrollWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth - viewportWidth}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          markers: false,
          onRefresh: (self) => {
            scrollTriggerRef.current = self;
          },
        },
      });

      if (tween.scrollTrigger) {
        scrollTriggerRef.current = tween.scrollTrigger;
      }
    });

    return () => {
      ctx.revert();
    };
  };

  if (!isInitialized) {
    return <div className="h-screen w-full" ref={sectionRef}></div>;
  }

  return (
    <section
      ref={sectionRef}
      className="relative  overflow-hidden container mx-auto w-full mt-10"
      style={{ height: "100vh" }}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
          className="absolute min-w-full min-h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/MEP.jpeg"
        >
          <source src="/timelapse.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      <div
        ref={wrapperRef}
        className="absolute top-1/2 left-0 flex gap-8 pl-10 lg:pl-28 -translate-y-1/2 z-20"
        style={{ paddingRight: "calc(50vw)" }} // Add extra padding at the end
      >
        <div className="flex-shrink-0 w-[300px] md:w-[600px] text-white flex flex-col justify-center items-start">
          <h2 className="text-2xl lg:text-5xl font-bold mb-6">
            The Capital Engineering Advantage
          </h2>
          <p className="mb-8 text-base">
            As a leading engineering and construction consultancy, we take pride
            in our commitment to excellence, innovation, and precision. Our
            expert team delivers cutting-edge solutions, ensuring superior
            quality and sustainability in every project. More than just
            builders, we forge lasting partnerships, uphold the highest safety
            standards, and contribute to the communities we serve.{" "}
          </p>
          <Button className="bg-white text-black hover:bg-white/90">
            Know More
          </Button>
        </div>

        {cards.map((card, idx) => (
          <div
            key={card.id}
            className="flex-shrink-0 w-[300px] md:w-[400px] bg-white rounded-xl overflow-hidden shadow-lg"
          >
            <div className="relative h-48">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-gray-600">{card.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HorizontalScroll;
