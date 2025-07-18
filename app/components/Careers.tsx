"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Careers = () => {
  useGSAP(() => {
    const careersplit = new SplitText(".careers", { type: "chars,words" });
    gsap.from(careersplit.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.06,
      scrollTrigger: {
        trigger: ".career",
      },
    });
    gsap.from(".data>*", {
      yPercent: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.17,
      delay: 0.5,
      scrollTrigger: {
        trigger: ".data",
      },
    });
  });

  return (
    <div  id="career-sec">
      <div className="career flex flex-col  justify-center items-center pt-25 py-2">
        <h1 className="careers mb-2 text-[200%] font-bold tracking-tight">
          CAREERS
        </h1>
        <div className="absolute translate-y-7 bg-cyan-700 mt-4 w-[110px] h-2 rounded-lg "></div>
      </div>
      <div className="data py-4 px-[10vw] mt-10 text-xl mb-20">
        <p>
          At Adwyzors, we strive to create an environment that supports both
          personal and professional growth. We encourage individuals to take on
          meaningful responsibilities and actively contribute to our shared
          success.
        </p>
        <br />
        <p>
          Our strong value system drives high performance while offering a
          platform for team members to unlock their creative potential. A
          pleasant, inclusive, and supportive atmosphere empowers every
          individual to discover and develop their strengths.
        </p>
        <br />
        <p>
          If you possess strong analytical skills, a solid understanding of
          Finance or Accounting, and a passion for continuous learning and
          professional growth — Adwyzors is the right place for you.
        </p>
        <br />
        <div className="flex flex-row justify-center items-center mt-10">
          <Link href="/career">
          <button
            type="button"
            
            className="px-8 py-4 text-xl font-medium text-white bg-orange-400 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:orange-blue-300 rounded-lg text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            Apply Now
          </button></Link>
        </div>
      </div>

      <div className="text-center">
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Every business is unique. Let us create a tailored service package
            that perfectly fits your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-cyan-600 hover:bg-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Get Custom Quote
            </button>
            <button className="inline-flex items-center px-6 py-3 border-2 border-cyan-600 text-base font-medium rounded-lg text-cyan-600 bg-white hover:bg-cyan-50 transition-all duration-200">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
