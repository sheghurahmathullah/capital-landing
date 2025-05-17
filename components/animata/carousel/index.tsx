"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ITestimonial {
  id: number;
  name: string;
  role: string;
  message: string;
  image: string;
  bgColor: string;
}

interface IImageCarouselProps {
  items: ITestimonial[];
}

export default function ImageCarousel({
  items: initialItems,
}: IImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-slide effect with animation check
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % initialItems.length);
        setTimeout(() => setIsAnimating(false), 500); // Match transition duration
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [initialItems.length, isAnimating]);

  // Debounced navigation handlers
  const handleNext = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % initialItems.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [initialItems.length, isAnimating]);

  const handlePrev = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + initialItems.length) % initialItems.length
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [initialItems.length, isAnimating]);

  const visibleIndices = [
    (currentIndex - 1 + initialItems.length) % initialItems.length,
    currentIndex,
    (currentIndex + 1) % initialItems.length,
  ];

  const visibleItems = visibleIndices.map((index) => initialItems[index]);

  return (
    <div className="flex justify-center items-center h-[38rem] w-full">
      <div className="relative h-[31rem] w-screen lg:w-[80%] lg:max-w-[75rem] overflow-hidden rounded-2xl p-2">
        {/* Navigation Buttons with disabled state */}
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 
            ${
              isAnimating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black/20 hover:bg-red-600"
            } 
            rounded-lg p-2 transition-colors duration-200`}
          aria-label="Previous slide"
        >
          <ChevronLeft
            className={`w-6 h-6 ${
              isAnimating ? "text-gray-600" : "text-black hover:text-white"
            }`}
          />
        </button>
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 
            ${
              isAnimating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black/20 hover:bg-red-600"
            } 
            rounded-lg p-2 transition-colors duration-200`}
          aria-label="Next slide"
        >
          <ChevronRight
            className={`w-6 h-6 ${
              isAnimating ? "text-gray-600" : "text-black hover:text-white"
            }`}
          />
        </button>

        {/* Testimonial Cards */}
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute left-[50%] top-[10%] h-[350px] w-[300px] p-6 rounded-xl text-white shadow-lg ${
              index === 1 ? "bg-red-500" : "bg-gray-500"
            }`}
            style={{
              transform:
                index === 1
                  ? "translateX(-50%) scale(1.1)"
                  : index === 0
                  ? "translateX(-150%) rotate(-15deg)"
                  : "translateX(50%) rotate(15deg)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              filter: index === 1 ? "none" : "blur(1px)",
              zIndex: index === 1 ? 3 : 1,
              opacity: 1,
            }}
          >
            <p className={`text-sm h-28 w-full font-camber`}>{item.message}</p>
            {/* Client Section with Slant */}
            <div
              className="absolute bottom-0 left-0 flex items-center space-x-3 bg-white p-2 text-black rounded-bl-xl"
              style={{
                clipPath: "polygon(0% 0%, 85% 0%, 100% 100%, 0% 100%)",
                width: "75%",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className={`text-sm font-bold font-camber`}>{item.name}</p>
                <p className={`text-xs font-extralight font-camber`}>
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
