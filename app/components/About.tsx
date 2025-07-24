"use client"
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const blogsplit = new SplitText(".about", { type: "chars,words" });

    gsap.from(blogsplit.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.04,
      scrollTrigger: {
        trigger: ".about",
      },
    });
  });
  return (
    <div>
      <div className="flex justify-center  items-center mt-15 mb-10 py-2">
        <h1 className="about mb-2 text-[200%] font-bold tracking-tight">
          Company&apos;s Catered To....
        </h1>
        <div className="absolute translate-y-7 bg-cyan-700 mt-4 w-[110px] h-2 rounded-lg "></div>
      </div>
      <div className="flex justify-center items-center px-[20vw] text-2xl">
      <p className="text-center">  In our multi-disciplinary services, we serve across various industries &
        diverse verticals, thus generating deep insights into multifarious
        businesses & differences in economic, social, political & regulatory
        environments. This understanding helps us to tailor our solutions &
        cater to specific client requirements better.</p>
      </div>
    </div>
  );
};

export default About;
