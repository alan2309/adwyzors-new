"use client";
import gsap from "gsap";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Parallax = () => {
  const container = useRef(null);
  const imageref = useRef(null);

  useGSAP(() => {
    const missionsplit = new SplitText(".title", { type: "chars,words" });
    const parasplit = new SplitText(".subtitle", { type: "lines" });

    gsap.from(missionsplit.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      delay: 4,
      ease: "expo.out",
        stagger: 0.06,
      scrollTrigger: {
        trigger: ".title",
        scrub: true,
      },
    });
    gsap.from(parasplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.4,
      scrollTrigger: {
        trigger: ".subtitle",
      },
    });

    gsap.fromTo(
      imageref.current,
      {
        y: "-400",
      },
      {
        y: "400",
        scrollTrigger: {
          trigger: container.current,
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div
      ref={container}
      className="main relative h-[100vh] mt-0 w-full overflow-hidden"
    >
      <Image
        ref={imageref}
        className="blur-xs h-[100vh] w-full object-cover scale-[2]"
        src="/parallax/back4.jpg"
        alt=""
      />

      <h1 className="absolute flex flex-col md:top-1/3 top-1/5 left-1/4 text-white">
        <span className="title text-[7vw] leading-none -translate-y-1/4 translate-x-[10vw]">
          MISSION
        </span>
        <p className="text-lg mt-4 md:text-3xl subtitle -translate-x-1/6">
          At ADWYZORS, our mission is to provide our clients with the best professional services in accounting,
              taxation and other business-related advisory services delivered in a timely and efficient manner
              through sheer dedication and commitment.
        </p>
        <p className="text-lg md:text-3xl subtitle -translate-x-1/6">
         We strive to build lasting relationship with our clients by understanding their unique needs and
              delivering customized solutions that drive sustainable growth and financial success.
        </p>
      </h1>
    </div>
  );
};

export default Parallax;
