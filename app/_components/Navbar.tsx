"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power3.in",
        pointerEvents: "none",
      });
    }
  }, [isOpen]);

  return (
    <nav className="container mx-auto p-3 bg-white text-black relative z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="relative w-[150px] lg:w-[300px] h-10 lg:h-12">
          <Image src="/logo.png" alt="Logo" fill className="object-contain" />
        </div>

        {/* Desktop Menu - Only visible on large screens */}
        <div className="hidden xl:flex gap-4">
          {["OUR EXPERTISE", "SECTORS", "NEWSROOM", "CONTACT", "PORTFOLIO"].map(
            (item, index) => (
              <a
                key={index}
                href="/"
                className="relative text-sm transition-all duration-300 after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full my-2 font-semibold"
              >
                {item}
              </a>
            )
          )}
          <Button className="px-8 rounded-none hover:bg-red-600 hover:text-white">
            <a href="/">Contact us</a>
          </Button>
        </div>

        {/* Mobile/Tablet Menu Toggle Button - Visible on mobile and tablet */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden z-50 relative"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile/Tablet Menu */}
      <div
        ref={menuRef}
        className={`absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center gap-4 py-4 z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } xl:hidden`}
      >
        {["OUR EXPERTISE", "SECTORS", "NEWSROOM", "CONTACT", "PORTFOLIO"].map(
          (item, index) => (
            <a
              key={index}
              href="/"
              className="relative hover:text-blue-500 transition-all duration-300 text-base md:text-lg after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full overflow-hidden"
            >
              {item}
            </a>
          )
        )}
        <Button className="px-8 rounded-none hover:bg-red-600 hover:text-white">
          <a href="/">Contact us</a>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
