"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Parallax from "./components/Parallax";
import Services from "./components/Services";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import Careers from "./components/Careers";
import ReactLenis from "lenis/react";
import About from "./components/About";

export default function Home() {
  return (
    <ReactLenis root>
      <Navbar />
      <Hero/>
      <Parallax/>
      <Services/>
      <About/>
      <Blogs/>
      <Careers/>
      <Footer/>
    
    </ReactLenis>
  );
}
