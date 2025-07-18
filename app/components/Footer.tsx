"use client"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUp, Calendar } from "lucide-react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Footer elements animation on scroll
    const footerElements = [logoRef.current, linksRef.current, contactRef.current, socialRef.current]

    gsap.from(footerElements, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        end: "bottom 20%",
      },
    })

    // Floating animation for social icons
    gsap.to(".social-icon", {
      y: -5,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
    })
  }, [])

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0 },
      ease: "power2.inOut",
    })
  }

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-sm"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/15 to-pink-500/15 rounded-full blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div ref={logoRef} className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                ADWYZORS
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-2"></div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for comprehensive financial services, accounting solutions, and business advisory.
              Empowering businesses to achieve sustainable growth and financial excellence.
            </p>

            {/* Quick Stats */}
            
          </div>

          {/* Quick Links */}
          <div ref={linksRef} className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#top" },
                { name: "About Us", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "Blog", href: "#blog" },
                { name: "Career", href: "#career" },
                { name: "Contact", href: "#contact" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {[
                "Tax Planning & Preparation",
                "Bookkeeping Services",
                "Financial Consulting",
                "Audit & Assurance",
                "Payroll Management",
                "Business Advisory",
              ].map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 flex items-center group text-sm"
                  >
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div ref={contactRef} className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-6 text-white">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    ADWYZORS, Spring leaf, Lokhandwala Township, Kandivali East, Mumbai-400101
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                <a
                  href="tel:+919819902363"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  +91 98199 02363
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                <a
                  href="mailto:yasharya98@gmail.com"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  yasharya98@gmail.com
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Mon - Sat: 9:00 AM - 6:00 PM</span>
              </div>
            </div>

            {/* Social Media */}
            <div ref={socialRef} className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: "#", color: "hover:text-blue-400" },
                  { icon: Twitter, href: "#", color: "hover:text-sky-400" },
                  { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
                  { icon: Instagram, href: "#", color: "hover:text-pink-400" },
                ].map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`social-icon p-3 bg-white/10 rounded-full text-gray-300 ${social.color} transition-all duration-300 hover:bg-white/20 hover:scale-110`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm">
            © 2024 ADWYZORS. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
