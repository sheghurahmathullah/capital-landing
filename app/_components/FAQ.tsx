"use client";
import React, { useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FAQ = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: "What services does Capital Engineering Consultancy offer?",
      answer:
        "We provide comprehensive services including architectural and structural design, MEP engineering, project management, authority approvals, and construction supervision.",
    },
    {
      question: "How does Capital Engineering Consultancy ensure regulatory compliance for projects?",
      answer:
        "Our team works closely with local authorities to secure all necessary permits and approvals, ensuring every project meets legal and safety standards.",
    },
    {
      question: "Can Capital Engineering Consultancy manage both residential and commercial projects?",
      answer:
        "Yes, we have expertise in handling a wide range of projects including residential buildings, commercial spaces, industrial facilities, and fit-out works.",
    },
    {
      question: "How involved is your team during the construction phase?",
      answer:
        "We offer end-to-end supervision, conducting regular site visits and coordination to ensure quality, timelines, and design adherence are maintained.",
    },
  ];

  useGSAP(() => {
    // Initial state
    gsap.set([titleRef.current, accordionRef.current?.children], {
      opacity: 0,
      y: 30,
    });

    // Create timeline for animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "center center",
        toggleActions: "play none none reverse",
        markers: false,
      },
    });

    // Animate elements
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });
    tl.to(
      accordionRef.current?.children || [],
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.5"
    );
  }, []);

  return (
    <div ref={sectionRef} className="container mx-auto px-5 w-full py-24">
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-[#211574] mb-12 text-center"
        >
          Frequently Asked Questions
        </h2>
        
        <div ref={accordionRef} className="w-full space-y-2">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border rounded-lg overflow-hidden transition-all hover:shadow-lg"
              >
                <AccordionTrigger className="px-6 py-5 text-left hover:no-underline group">
                  <div className="flex items-center w-full">
                    <div className="w-8 h-8 rounded-full bg-[#211574]/10 flex-shrink-0 flex items-center justify-center mr-4 group-hover:bg-[#e9647c]/20 transition-colors">
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        className="text-[#211574] group-hover:text-[#e9647c] transition-colors"
                      >
                        <path 
                          d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-lg font-medium text-[#211574] group-hover:text-[#e9647c] transition-colors">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-0">
                  <div className="pl-12 border-l-2 border-[#e9647c]">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-[#211574] to-[#3a2b9c] text-white rounded-full font-medium hover:shadow-lg transition-all hover:translate-y-[-2px]">
            Contact Us for More
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;