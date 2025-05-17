"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import Link from "next/link";

const HeroWithNavbar = () => {
  // Navbar state
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [expertiseDropdownOpen, setExpertiseDropdownOpen] = useState(false);
  const [sectorsDropdownOpen, setSectorsDropdownOpen] = useState(false);

  // Hero section state
  const [currentIndex, setCurrentIndex] = useState(0);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const clientsRef = useRef(null);
  const videoRef = useRef(null);
  const bgLayerRef = useRef(null);

  // Navbar effects
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const menuWrapper = document.querySelector(".mobile-menu-wrapper");
      const menuContainer = document.querySelector(".mobile-menu-area");
      const expertiseDropdown = document.querySelector(".expertise-dropdown");
      const sectorsDropdown = document.querySelector(".sectors-dropdown");
      const expertiseButton = document.querySelector(".expertise-button");
      const sectorsButton = document.querySelector(".sectors-button");

      // Handle mobile menu clicks
      if (
        menuWrapper &&
        menuContainer &&
        !menuContainer.contains(event.target as Node) &&
        menuWrapper.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }

      // Handle dropdown clicks
      if (
        expertiseDropdown &&
        expertiseButton &&
        !expertiseDropdown.contains(event.target as Node) &&
        !expertiseButton.contains(event.target as Node)
      ) {
        setExpertiseDropdownOpen(false);
      }

      if (
        sectorsDropdown &&
        sectorsButton &&
        !sectorsDropdown.contains(event.target as Node) &&
        !sectorsButton.contains(event.target as Node)
      ) {
        setSectorsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Hide navbar when scrolled beyond hero section
      const heroHeight = window.innerHeight;
      setIsNavbarVisible(scrollPosition < heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Hero animations
  useGSAP(() => {
    const textTl = gsap.timeline();

    gsap.set(
      [
        titleRef.current,
        descRef.current,
        buttonRef.current,
        clientsRef.current,
      ],
      {
        y: 100,
        autoAlpha: 0,
      }
    );

    textTl
      .to(titleRef.current, {
        duration: 1,
        y: 0,
        autoAlpha: 1,
        ease: "power3.out",
      })
      .to(
        descRef.current,
        { duration: 1, y: 0, autoAlpha: 1, ease: "power3.out" },
        "-=0.7"
      )
      .to(
        buttonRef.current,
        { duration: 0.8, y: 0, autoAlpha: 1, ease: "power3.out" },
        "-=0.7"
      )
      .to(
        clientsRef.current,
        { duration: 0.8, y: 0, autoAlpha: 1, ease: "power3.out" },
        "-=0.5"
      );
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Navbar - Only visible in hero section */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-sm py-3"
            : "bg-transparent py-5"
        } px-6 md:px-10 lg:px-16`}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" scroll={false}>
              <Image
                src="/new-logo.png"
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              scroll={false}
              className="text-white hover:text-gray-300 transition-colors"
            >
              HOME
            </Link>

            {/* Expertise Dropdown */}
            <div className="relative">
              <button
                className="expertise-button text-white hover:text-gray-300 transition-colors flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpertiseDropdownOpen(!expertiseDropdownOpen);
                  setSectorsDropdownOpen(false);
                }}
              >
                OUR EXPERTISE
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {expertiseDropdownOpen && (
                <div className="expertise-dropdown absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/architecture-and-landscape"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Architecture & Landscape
                  </Link>
                  <Link
                    href="/fitout-and-interior-design"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Fit Out & Interior Design
                  </Link>
                  <Link
                    href="/power-and-infrastructure"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Power & Infrastructure
                  </Link>
                  <Link
                    href="/bim-service"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    BIM Services
                  </Link>
                  <Link
                    href="/mep-design"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    MEP Design and Services
                  </Link>
                  <Link
                    href="/structural-engineering"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Structural Engineering
                  </Link>
                  <Link
                    href="/oil-and-gas-marine"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Oil & Gas and Marine & Ports
                  </Link>
                  <Link
                    href="/project-management-consultancy"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Project Management Consultancy
                  </Link>
                  <Link
                    href="/environmental-solutions"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Environmental Solutions
                  </Link>
                </div>
              )}
            </div>

            {/* Sectors Dropdown */}
            <div className="relative">
              <button
                className="sectors-button text-white hover:text-gray-300 transition-colors flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setSectorsDropdownOpen(!sectorsDropdownOpen);
                  setExpertiseDropdownOpen(false);
                }}
              >
                SECTORS
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {sectorsDropdownOpen && (
                <div className="sectors-dropdown absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/commercial"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Commercial
                  </Link>
                  <Link
                    href="/education"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Education
                  </Link>
                  <Link
                    href="/railways"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Railways
                  </Link>
                  <Link
                    href="/shelters"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Shelters
                  </Link>
                  <Link
                    href="/oil-and-gas"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Oil & Gas
                  </Link>
                  <Link
                    href="/power-and-energy"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Power & Energy
                  </Link>
                  <Link
                    href="/marine-and-ports"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Marine & Ports
                  </Link>
                  <Link
                    href="/healthcare-and-hospitality"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Healthcare & Hospitality
                  </Link>
                  <Link
                    href="/industrial-and-logistics"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Industrial & Logistics
                  </Link>
                  <Link
                    href="/roads-and-infrastructure"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Roads & Infrastructure
                  </Link>
                  <Link
                    href="/wtp-ro-and-desalination"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    WTP, RO & Desalination Plants
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/newsroom"
              scroll={false}
              className="text-white hover:text-gray-300 transition-colors"
            >
              NEWSROOM
            </Link>
            <Link
              href="/careers"
              scroll={false}
              className="text-white hover:text-gray-300 transition-colors"
            >
              CAREERS
            </Link>
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* Contact Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              scroll={false}
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors font-medium"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Only visible when open */}
      <div
        className={`mobile-menu-wrapper fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`mobile-menu-area absolute top-0 right-0 h-full w-80 bg-black transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } p-6 flex flex-col overflow-y-auto`}
        >
          <div className="flex justify-end mb-8">
            <button
              className="text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              scroll={false}
              className="text-white hover:text-gray-300 transition-colors py-2 font-medium"
            >
              HOME
            </Link>

            {/* Mobile Expertise Dropdown */}
            <div className="py-2">
              <button
                className="text-white hover:text-gray-300 transition-colors flex items-center justify-between w-full font-medium"
                onClick={() => setExpertiseDropdownOpen(!expertiseDropdownOpen)}
              >
                OUR EXPERTISE
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${
                    expertiseDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {expertiseDropdownOpen && (
                <div className="mt-2 ml-4 flex flex-col space-y-2">
                  <Link
                    href="/architecture-and-landscape"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Architecture & Landscape
                  </Link>
                  <Link
                    href="/fitout-and-interior-design"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Fit Out & Interior Design
                  </Link>
                  <Link
                    href="/power-and-infrastructure"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Power & Infrastructure
                  </Link>
                  <Link
                    href="/bim-service"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    BIM Services
                  </Link>
                  <Link
                    href="/mep-design"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    MEP Design and Services
                  </Link>
                  <Link
                    href="/structural-engineering"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Structural Engineering
                  </Link>
                  <Link
                    href="/oil-and-gas-marine"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Oil & Gas and Marine & Ports
                  </Link>
                  <Link
                    href="/project-management-consultancy"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Project Management Consultancy
                  </Link>
                  <Link
                    href="/environmental-solutions"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Environmental Solutions
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Sectors Dropdown */}
            <div className="py-2">
              <button
                className="text-white hover:text-gray-300 transition-colors flex items-center justify-between w-full font-medium"
                onClick={() => setSectorsDropdownOpen(!sectorsDropdownOpen)}
              >
                SECTORS
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${
                    sectorsDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {sectorsDropdownOpen && (
                <div className="mt-2 ml-4 flex flex-col space-y-2">
                  <Link
                    href="/commercial"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Commercial
                  </Link>
                  <Link
                    href="/education"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Education
                  </Link>
                  <Link
                    href="/railways"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Railways
                  </Link>
                  <Link
                    href="/shelters"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Shelters
                  </Link>
                  <Link
                    href="/oil-and-gas"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Oil & Gas
                  </Link>
                  <Link
                    href="/power-and-energy"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Power & Energy
                  </Link>
                  <Link
                    href="/marine-and-ports"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Marine & Ports
                  </Link>
                  <Link
                    href="/healthcare-and-hospitality"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Healthcare & Hospitality
                  </Link>
                  <Link
                    href="/industrial-and-logistics"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Industrial & Logistics
                  </Link>
                  <Link
                    href="/roads-and-infrastructure"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    Roads & Infrastructure
                  </Link>
                  <Link
                    href="/wtp-ro-and-desalination"
                    className="text-gray-300 hover:text-white transition-colors py-1"
                  >
                    WTP, RO & Desalination Plants
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/newsroom"
              scroll={false}
              className="text-white hover:text-gray-300 transition-colors py-2 font-medium"
            >
              NEWSROOM
            </Link>
            <Link
              href="/careers"
              scroll={false}
              className="text-white hover:text-gray-300 transition-colors py-2 font-medium"
            >
              CAREERS
            </Link>
            <Link
              href="/contact"
              scroll={false}
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors font-medium text-center mt-4"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="h-screen w-full flex items-center justify-center">
        <div className="container mx-auto h-full flex flex-col md:flex-col lg:flex-row lg:gap-5 items-center relative overflow-hidden">
          {/* Background Video Layer */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-10 opacity-100"
          >
            <source src="/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay Layer */}
          <div ref={bgLayerRef} className="absolute inset-0 bg-black/50 z-20" />

          {/* Text Content Layer - Static */}
          <div className="flex flex-col gap-3 md:gap-6 lg:gap-8 p-5 md:p-8 lg:p-5 relative z-40 w-full lg:w-1/2 mt-28 md:mt-32 lg:mt-10">
            <p
              ref={titleRef}
              className="text-5xl md:text-5xl lg:text-6xl font-[500] w-11/12 md:w-11/12 lg:w-full text-white 
              drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
            >
              Your Premier Partner in Engineering & Construction
            </p>
            <p
              ref={descRef}
              className="text-base md:text-lg lg:text-2xl font-[400] w-full md:w-4/5 lg:w-full text-white 
              drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
            >
              Capital Engineering Consultancy provides innovative design and
              engineering solutions to meet global construction demands
            </p>
            <Link href="/about">
              <Button
                ref={buttonRef}
                className="bg-red-600 text-white p-3 md:p-3 hover:bg-red-700 w-40 md:w-40 mb-10 md:mb-16 lg:mb-10 
                drop-shadow-md text-lg"
              >
                Know More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWithNavbar;
