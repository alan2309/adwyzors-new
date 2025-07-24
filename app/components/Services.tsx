"use client";
import React, { useRef, useEffect, useState } from "react";
import Card from "./Card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

type Service = {
  title: string,
  description: string
};

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Fetch data
  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    };
//     const createService = async () => {
//   await fetch('/api/services', {
//     method: 'POST',
//     body: JSON.stringify({  title: " Noteworthy technology acquisitions 2021", description:" Here are the biggest enterprise technology acquisitions of 2021 so far,in reverse chronological order." }),
//     headers: { 'Content-Type': 'application/json' },
//   });
// };
    fetchServices();
  }, []);

  useGSAP(
    () => {
      if (!cardsRef.current) return;

      const servicesplit = new SplitText(".services", { type: "chars,words" });

      gsap.from(servicesplit.chars, {
        opacity: 0,
        yPercent: 100,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: ".service",
        },
      });

      // Cards animation
      gsap.from(cardsRef.current.children, {
        yPercent: 50,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          end: "bottom 15%",
        },
      });

      // Underline animation
      gsap.from(".service-underline", {
        scaleX: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.5,
        scrollTrigger: {
          trigger: ".service",
          start: "top 80%",
        },
      });
    },
    { dependencies: [services] }
  ); 

  return (
    <div id="service-sec" className="service">
      <div className="flex justify-center items-center mt-15 py-2 relative">
        <h1 className="services mb-2 text-[200%] font-bold tracking-tight">
          Our Services
        </h1>
        <div className="service-underline absolute translate-y-7 bg-cyan-700 mt-4 w-[110px] h-2 rounded-lg"></div>
      </div>

      <div
        ref={cardsRef}
        className="cards px-[8vw] mt-[10vh] py-3 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 gap-10 mb-15"
      >
        {services.map((service, index) => (
          <Card
            key={index}
            id={index}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
