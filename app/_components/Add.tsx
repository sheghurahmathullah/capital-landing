"use client";

import React from "react";

import Image from "next/image";
import { Marquee } from "@/components/animata/marquee";

const reviews = [
  {
    img: "/brands/logo-8.webp",
  },
  {
    img: "/brands/logo-7.png",
  },
  {
    img: "/brands/logo-6.jpg",
  },
  {
    img: "/brands/logo-5.png",
  },
  {
    img: "/brands/logo-3.avif",
  },
  {
    img: "/brands/logo-4.svg", 
  },
  {
    img: "/brands/logo-2.svg", 
  },
  {
    img: "/brands/logo-1.svg", 
  },
];

const Add = () => {
  return (
    <div className="flex flex-col gap-6 pt-10 relative overflow-hidden mt-15">
      {/* Header */}
      <div className="container mx-auto  relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee
          pauseOnHover
          className="[--duration:10s] [--gap:2rem] md:[--gap:4rem] lg:[--gap:8rem]"
        >
          {reviews.map((review, index) => (
            <div className="relative size-12 md:size-20 lg:size-40 flex items-center justify-center" key={index}>
              <Image
                src={review.img}
                alt="marquee image"
                width={500}
                height={500}
                className="rounded-full object-contain w-full h-full"
                priority
              />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </div>
  );
};

export default Add;
