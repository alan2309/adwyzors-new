"use client"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/all"
import { useGSAP } from "@gsap/react"
import BlogCard from "./BlogCard"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

const Blogs = () => {
  type Post = {
    author: null
    title: string
    description: string
    url: string
    source: string
    image: string
    category: string
    language: string
    country: string
    published_at: string
  }

  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const blogRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://api.mediastack.com/v1/news?access_key=02e4932a0e6893306d6e7c1b22125389&countries=in&keywords=tax&languages=en",
        )
        const data = await response.json()
        setPosts(data.data || [])
      } catch (error) {
        console.error("Failed to fetch posts:", error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useGSAP(
    () => {
      // Only run animations after posts are loaded and elements exist
      if (loading || posts.length === 0) return

      // Title animation with SplitText
      if (titleRef.current) {
        const blogSplit = new SplitText(titleRef.current, { type: "chars,words" })

        gsap.set(blogSplit.chars, { opacity: 0, yPercent: 100 })
        gsap.to(blogSplit.chars, {
          opacity: 1,
          yPercent: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: blogRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Cards animation
      const blogCards = document.querySelectorAll(".blog-card")
      if (blogCards.length > 0) {
        gsap.set(blogCards, { xPercent: 100, opacity: 0 })
        gsap.to(blogCards, {
          xPercent: 0,
          opacity: 1,
          duration: 1.5,
          ease: "expo.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Underline animation
      const underline = document.querySelector(".blog-underline")
      if (underline) {
        gsap.set(underline, { scaleX: 0 })
        gsap.to(underline, {
          scaleX: 1,
          duration: 1,
          ease: "expo.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: blogRef.current,
            start: "top 80%",
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
    { dependencies: [posts, loading] },
  )

  // Additional effect to refresh ScrollTrigger when content changes
  useEffect(() => {
    if (!loading && posts.length > 0) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [posts, loading])

  if (loading) {
    return (
      <div
        id="blog-sec"
        className="blog bg-gradient-to-r from-cyan-50 to-blue-50 py-16 flex items-center justify-center"
        style={{ minHeight: "90vh" }}
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mb-4"></div>
          <p className="text-gray-600">Loading latest blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={blogRef}
      id="blog-sec"
      className="blog bg-gradient-to-r from-cyan-50 to-blue-50 py-16"
      style={{ minHeight: "90vh" }}
    >
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="relative inline-block">
          <h1
            ref={titleRef}
            className="blogs text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4"
          >
            LATEST BLOGS & UPDATES
          </h1>
          <div className="blog-underline absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-cyan-700 h-2 w-28 rounded-lg origin-center"></div>
        </div>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Stay updated with our latest insights, tips, and industry news
        </p>
      </div>

      {/* Blog Cards Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {posts.length > 0 ? (
          <div
            ref={cardsRef}
            className="blogcards flex gap-6 overflow-x-auto overflow-y-hidden pb-6 px-2 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {posts.map((blog, index) => (
              <div key={index} className="blog-card flex-shrink-0">
                <BlogCard
                  id={index}
                  title={blog.title}
                  description={blog.description}
                  url={blog.url}
                  imgurl={blog.image}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No blog posts available at the moment.</p>
          </div>
        )}

        {/* Gradient Overlays for scroll indication */}
        {posts.length > 0 && (
          <>
            <div className="absolute left-0 top-0 bottom-6 w-8 bg-gradient-to-r from-cyan-50 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-6 w-8 bg-gradient-to-l from-blue-50 to-transparent pointer-events-none"></div>
          </>
        )}
      </div>

      {/* Optional: View All Button */}
      {posts.length > 0 && (
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All Blogs
            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      <style jsx>{`
        .blogcards::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default Blogs
