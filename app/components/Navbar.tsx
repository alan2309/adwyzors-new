"use client"
import { assets } from "../../assets/assets"
import { useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null)
  const menuref = useRef<HTMLUListElement>(null)

  useGSAP(() => {
    if (navRef.current) {
      // Create timeline for navbar background changes
      const navTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "100px top",
          scrub: 1,
          onUpdate: (self) => {
            // When scrolling down from hero section
            if (self.progress > 0) {
              gsap.to(navRef.current, {
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
                color:"rgba(0, 0, 0,1)",
                duration: 0.3,
                ease: "power2.out",
              })
            } else {
              // When at the top (hero section)
              gsap.to(navRef.current, {
                backgroundColor: "transparent",
                color:"rgba(255, 255, 255,1)",
                backdropFilter: "blur(0px)",
                duration: 0.3,
                ease: "power2.out",
              })
            }
          },
        },
      })

      // Alternative approach using multiple ScrollTriggers for more control
      ScrollTrigger.create({
        trigger: "body",
        start: "100px top",
        end: "bottom bottom",
        onEnter: () => {
          gsap.to(navRef.current, {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            duration: 0.2,
            ease: "power2.out",
          })
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, {
            backgroundColor: "transparent",
            backdropFilter: "blur(0px)",
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out",
          })
        },
      })
    }
  }, [])

  useEffect(() => {
    // Focus the input on mount
    menuref.current?.focus()
  }, [])

  const openmenu = () => {
    if (menuref.current) {
      gsap.to(menuref.current, {
        x: -256, // -16rem in pixels
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }

  const closemenu = () => {
    if (menuref.current) {
      gsap.to(menuref.current, {
        x: 256, // 16rem in pixels
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }

  return (
    <>
      {/* Background decoration */}
      <div className="nav fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%]">
        <Image src={assets.header_bg_color || "/placeholder.svg"} className="w-full" alt="" />
      </div>

      {/* Main Navigation */}
      <nav
        ref={navRef}
        className="bg-white/90 w-full text-white fixed px-5 lg:px-8 xl:px-[5%] py-4 flex items-center justify-between z-50 transition-all duration-300"
        style={{ backgroundColor: "transparent" }}
      >
        {/* Logo */}
        <a href="/" className="w-40 cursor-pointer mr-8 top-0">
          <Image src={assets.logo || "/placeholder.svg"} alt="ADWYZORS Logo" className="w-full" />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white/90 backdrop-blur-sm shadow-sm border border-white/10">
          <li>
            <a href="/#top" className="text-gray-800 hover:text-cyan-600 transition-colors duration-200 font-medium">
              Home
            </a>
          </li>
          <li>
            <a
              href="/#service-sec"
              className="text-gray-800 hover:text-cyan-600 transition-colors duration-200 font-medium"
            >
              Services
            </a>
          </li>
          <li>
            <a href="/#blog-sec" className="text-gray-800 hover:text-cyan-600 transition-colors duration-200 font-medium">
              Blogs
            </a>
          </li>
          <li>
            <a href="/#career-sec" className="text-gray-800 hover:text-cyan-600 transition-colors duration-200 font-medium">
              Career
            </a>
          </li>
        </ul>

        {/* CTA and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <a
            href="/contact"
            className="hidden lg:flex items-center gap-2 px-6 py-2.5 border border-gray-500 rounded-full ml-4 hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition-all duration-200 font-medium"
          >
            Contact us
            <Image src={assets.arrow_icon || "/placeholder.svg"} className="w-2.5" alt="" />
          </a>

          <button
            onClick={openmenu}
            className="block md:hidden ml-3 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Image src={assets.menu_black || "/placeholder.svg"} className="w-6" alt="Menu" />
          </button>
        </div>

        {/* Mobile Menu */}
        <ul
          ref={menuref}
          className="flex md:hidden flex-col gap-6 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-white/95 backdrop-blur-md shadow-2xl"
          style={{ transform: "translateX(256px)" }}
        >
          <div
            onClick={closemenu}
            className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <Image src={assets.close_black || "/placeholder.svg"} alt="Close" className="w-5" />
          </div>

          <li onClick={closemenu} className="mt-8">
            <a
              href="/#top"
              className="text-lg font-medium text-gray-800 hover:text-cyan-600 transition-colors duration-200 block py-2"
            >
              Home
            </a>
          </li>
          <li onClick={closemenu}>
            <a
              href="/#service-sec"
              className="text-lg font-medium text-gray-800 hover:text-cyan-600 transition-colors duration-200 block py-2"
            >
              Services
            </a>
          </li>
          <li onClick={closemenu}>
            <a
              href="/#blog-sec"
              className="text-lg font-medium text-gray-800 hover:text-cyan-600 transition-colors duration-200 block py-2"
            >
              Blogs
            </a>
          </li>
          <li onClick={closemenu}>
            <a
              href="/#career-sec"
              className="text-lg font-medium text-gray-800 hover:text-cyan-600 transition-colors duration-200 block py-2"
            >
              Career
            </a>
          </li>

          {/* Mobile Contact Button */}
          <li className="mt-8">
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-full font-medium hover:bg-cyan-700 transition-colors duration-200"
              onClick={closemenu}
            >
              Contact us
              <Image src={assets.arrow_icon || "/placeholder.svg"} className="w-2.5 filter invert" alt="" />
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
