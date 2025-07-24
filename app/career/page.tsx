"use client"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/all"
import { useGSAP } from "@gsap/react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  TrendingUp,
  Target,
  Heart,
  CheckCircle,
  Briefcase,
  ArrowRight,
  Clock,
  Globe,
  GraduationCap,
  Star,
  Lightbulb,
  Shield,
} from "lucide-react"

type Job = {
  title: string
  description: string
  requirements: string[]
  experience: string
}

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

const Page = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const animationScope = useRef(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const strivesRef = useRef<HTMLDivElement>(null)
  const lookingRef = useRef<HTMLDivElement>(null)
  const rolesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs")
        const data = await res.json()
        setJobs(data)
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
      } finally {
        setLoading(false)
      }
    }
// const createJob = async () => {
//       await fetch("/api/jobs", {
//         method: "POST",
//         body: JSON.stringify({
//           title: "Senior Tax Consultant",
//           experience: "3-5 years",
//           description:
//             "Lead tax planning strategies and provide expert advice to high-net-worth clients and businesses.",
//           requirements: [
//             "CA qualification with specialization in taxation",
//             "Minimum 3 years of experience in direct & indirect taxation",
//             "Strong knowledge of GST, Income Tax, and corporate tax laws",
//             "Client relationship management experience",
//             "Excellent analytical and problem-solving skills",
//             "Proficiency in tax software and MS Office",
//           ],
//         }),
//         headers: { "Content-Type": "application/json" },
//       })}
    fetchJobs()
  }, [])

  useGSAP(
    () => {
      // Only run animations after jobs are loaded and elements exist
      if (loading || jobs.length === 0) return

      // Title animation
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 50 })
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          delay: 0.3,
        })
      }

      // Strives section animation
      const strivesCards = document.querySelectorAll(".strives-card")
      if (strivesCards.length > 0) {
        gsap.set(strivesCards, { y: 50, opacity: 0 })
        gsap.to(strivesCards, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: strivesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Looking for section animation
      const lookingItems = document.querySelectorAll(".looking-item")
      if (lookingItems.length > 0) {
        gsap.set(lookingItems, { scale: 0.8, opacity: 0 })
        gsap.to(lookingItems, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: lookingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Role cards animation
      const roleCards = document.querySelectorAll(".role-card")
      if (roleCards.length > 0) {
        gsap.set(roleCards, { x: -50, opacity: 0 })
        gsap.to(roleCards, {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rolesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Refresh ScrollTrigger after animations are set up
      ScrollTrigger.refresh()

      // Cleanup function
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    },
    { scope: animationScope, dependencies: [jobs, loading] },
  )

  // Add a separate effect to handle initial setup
  useEffect(() => {
    if (!loading && jobs.length > 0) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [jobs, loading])

  const companyStrives = [
    {
      icon: Target,
      title: "Excellence in Service",
      description:
        "We are committed to delivering the highest quality financial services, ensuring every client receives exceptional value and professional expertise.",
    },
    {
      icon: Shield,
      title: "Trust & Integrity",
      description:
        "Building lasting relationships through transparency, honesty, and ethical practices in all our professional dealings.",
    },
    {
      icon: Lightbulb,
      title: "Innovation & Growth",
      description:
        "Continuously evolving our services and embracing new technologies to provide cutting-edge financial solutions.",
    },
    {
      icon: Heart,
      title: "Client-Centric Approach",
      description:
        "Understanding each client's unique needs and delivering personalized solutions that drive their business success.",
    },
  ]

  const lookingFor = [
    {
      icon: GraduationCap,
      title: "Professional Qualifications",
      description: "CA, CPA, MBA, or relevant professional certifications",
    },
    {
      icon: TrendingUp,
      title: "Growth Mindset",
      description: "Eagerness to learn, adapt, and grow with our expanding team",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Strong interpersonal skills and ability to work effectively in teams",
    },
    {
      icon: Star,
      title: "Excellence Driven",
      description: "Commitment to delivering high-quality work and exceeding expectations",
    },
    {
      icon: Globe,
      title: "Client Focus",
      description: "Understanding of client needs and dedication to service excellence",
    },
    {
      icon: Clock,
      title: "Time Management",
      description: "Ability to manage multiple projects and meet deadlines effectively",
    },
  ]

  const getBadgeVariant = (experience: string) => {
    if (experience.includes("0-") || experience.includes("fresh")) {
      return "Entry Level"
    } else if (experience.includes("3-") || experience.includes("4-") || experience.includes("5")) {
      return "Senior Level"
    } else {
      return "Mid Level"
    }
  }

  return (
    <div ref={animationScope}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden min-h-screen pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Join{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">ADWYZORS</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 mt-4 mb-6">
            Build your career with us and be part of a team that&apos;s dedicated to financial excellence and client success.
          </p>
          <Link href="/career#jobs">
          <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3 text-lg font-semibold">
            Explore Opportunities
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          </Link>
        </div>
      </section>

      {/* Strives Section */}
      <section ref={strivesRef} className="py-16 bg-white">
        <div className="text-center max-w-3xl mx-auto mb-12 px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Strive For</h2>
          <p className="text-gray-600 text-lg">
            Our core values and principles that drive everything we do at ADWYZORS
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
          {companyStrives.map((item, index) => (
            <Card key={index} className="strives-card border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex-shrink-0">
                  <item.icon className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Looking For Section */}
      <section ref={lookingRef} className="py-16 bg-gray-50">
        <div className="text-center max-w-3xl mx-auto mb-12 px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What We&apos;re Looking For</h2>
          <p className="text-gray-600 text-lg">The qualities and skills we value in our team members</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {lookingFor.map((item, index) => (
            <div key={index} className="looking-item text-center">
              <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full">
                <item.icon className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Job Roles Section */}
      <section id="jobs" ref={rolesRef} className="py-16 bg-white">
        <div className="text-center max-w-3xl mx-auto mb-12 px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Positions & Requirements</h2>
          <p className="text-gray-600 text-lg">Detailed requirements for each position we&apos;re currently hiring for</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
            <p className="mt-4 text-gray-600">Loading positions...</p>
          </div>
        ) : (
          <div className="space-y-8 max-w-7xl mx-auto px-4">
            {jobs.map((role, index) => (
              <Card key={index} className="role-card border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{role.title}</CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">{role.description}</CardDescription>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200 w-fit">
                        {getBadgeVariant(role.experience)}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {role.experience}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-gray-900 text-lg mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-cyan-600" />
                    Requirements:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {role.requirements?.map((req, i) => (
                      <div key={i} className="flex items-start text-gray-600">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{req}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h2>
          <p className="text-lg mb-8">If you meet our requirements and share our values, we&apos;d love to hear from you.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-cyan-600 hover:bg-gray-100 font-semibold">Send Your Resume</Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold bg-transparent"
            >
              Contact US
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Page
