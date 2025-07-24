"use client"
import { useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/all"
import { useGSAP } from "@gsap/react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const floatingRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    // Initial setup - hide elements
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, statsRef.current], {
      opacity: 0,
      y: 50,
    })

    // Title animation - animate the container instead of splitting gradient text
    tl.to(
      titleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "expo.out",
      },
      0.5,
    )

    // Subtitle animation
    tl.to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
      },
      1.2,
    )

    // CTA buttons animation
    tl.to(
      ctaRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "expo.out",
      },
      1.8,
    )

    // Stats animation
    tl.to(
      statsRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "expo.out",
      },
      2.2,
    )

    // Floating elements animation
    gsap.to(".floating-1", {
      y: -20,
      rotation: 5,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })

    gsap.to(".floating-2", {
      y: -15,
      rotation: -3,
      duration: 2.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 0.5,
    })

    gsap.to(".floating-3", {
      y: -25,
      rotation: 8,
      duration: 3.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1,
    })

    // Parallax effect on scroll
    gsap.to(".hero-bg", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    // Stats counter animation with proper typing
    const counters = document.querySelectorAll(".counter")
    counters.forEach((counter) => {
      const target = counter as HTMLElement
      const countValue = target.getAttribute("data-count")
      if (countValue) {
        gsap.to(target, {
          textContent: countValue,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          delay: 2.5,
        })
      }
    })
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{
        minHeight: "100vh",
        height: "auto",
        paddingTop: "80px", // Account for navbar
        paddingBottom: "40px",
      }}
    >
      {/* Animated Background */}
      <div className="hero-bg absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-slate-900/80"></div>
      </div>

      {/* Floating Elements */}
      <div ref={floatingRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-1 absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 blur-sm"></div>
        <div className="floating-2 absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-15 blur-sm"></div>
        <div className="floating-3 absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-green-400 to-cyan-500 rounded-full opacity-20 blur-sm"></div>
        <div className="floating-1 absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-25 blur-sm"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-12">
        {/* Main Title */}
        <div
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 leading-tight"
        >
          <div className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent block mb-2 sm:mb-4">
            ADWYZORS
          </div>
          <div className="text-white block text-2xl sm:text-2xl md:text-3xl lg:text-4xl">Financial Excellence</div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4"
        >
          Empowering businesses with comprehensive accounting, tax planning, and financial advisory services. Your
          trusted partner for sustainable growth and financial success.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4">
          <Link href="/#service-sec">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-2xl hover:shadow-cyan-500/25 transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>

        {/* Stats Section - Uncommented and fixed */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <div className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 mr-2">👥</div>
            </div>
            <div
              className="counter text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2"
              data-count="500"
            >
              0
            </div>
            <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">Happy Clients</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <div className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 mr-2">🏆</div>
            </div>
            <div className="counter text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2" data-count="15">
              0
            </div>
            <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">Years Experience</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <div className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 mr-2">📈</div>
            </div>
            <div className="counter text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2" data-count="98">
              0
            </div>
            <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">Success Rate %</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <div className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 mr-2">⭐</div>
            </div>
            <div className="counter text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2" data-count="24">
              0
            </div>
            <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">Awards Won</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
