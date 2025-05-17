"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechNova",
    content:
      "The service transformed our workflow completely. Our productivity increased by 200% within the first month.",
    avatar: "/avatars/1.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Director, Alpha Corp",
    content:
      "Exceptional attention to detail and innovative solutions that exceeded our expectations at every turn.",
    avatar: "/avatars/2.jpg",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Founder, Verde",
    content:
      "We've worked with many agencies, but none delivered results like this team. Truly remarkable.",
    avatar: "/avatars/3.jpg",
  },
];

export default function Testimonials3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  // Store card refs
  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useGSAP(() => {
    // Register ScrollTrigger for the section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => animateSection(),
      onLeaveBack: () => resetAnimations(),
    });

    // 3D plane animation
    gsap.set(planeRef.current, {
      rotationX: 65,
      rotationY: 0,
      rotationZ: 0,
      transformPerspective: 1000,
      transformOrigin: "center center",
    });

    // Initial state
    gsap.set([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 40,
    });

    gsap.set(cardsRef.current, {
      opacity: 0,
      y: 60,
      z: 100,
      rotationY: 15,
    });

    function animateSection() {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate title and subtitle
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }).to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.4"
      );

      // Animate cards with 3D effect
      cardsRef.current.forEach((card, i) => {
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotationY: 0,
            duration: 0.8,
            delay: i * 0.1,
          },
          "-=0.6"
        );
      });

      // Animate the 3D plane
      tl.to(
        planeRef.current,
        {
          rotationX: 0,
          duration: 1.5,
          ease: "back.out(1.2)",
        },
        "-=0.8"
      );

      // Add subtle floating effect to cards
      cardsRef.current.forEach((card) => {
        gsap.to(card, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }

    function resetAnimations() {
      gsap.to([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 40,
        duration: 0.5,
      });

      gsap.to(cardsRef.current, {
        opacity: 0,
        y: 60,
        z: 100,
        rotationY: 15,
        duration: 0.5,
      });

      gsap.to(planeRef.current, {
        rotationX: 65,
        duration: 0.5,
      });
    }
  }, []);

  return (
    <div ref={sectionRef} className="relative py-32 overflow-hidden bg-white">
      {/* 3D plane element */}
      <div
        ref={planeRef}
        className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-100/20 to-transparent pointer-events-none"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 800 }}
          >
            Client Experiences
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Trusted by innovative companies worldwide
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={addToCardsRef}
              className="relative bg-white rounded-xl shadow-lg p-8 border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {/* Card background accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600" />

              {/* Avatar */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-white shadow-md">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6">{testimonial.content}</p>

              {/* Rating */}
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Decorative element */}
              <div className="absolute bottom-0 right-0 opacity-10">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <path
                    d="M0 100 L100 0"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global styles for this component */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
