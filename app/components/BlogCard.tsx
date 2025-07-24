"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"


const BlogCard = ({title="", description= "" ,url="",imgurl=""}) => {
  return (
    <Card className="flex-shrink-0 w-80 md:w-96 bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden">
      {/* Blog Image */}
      <div className="relative overflow-hidden">
        <Image
          src={imgurl}
          alt="Blog post thumbnail"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Content */}
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-cyan-600 transition-colors leading-tight">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Description */}
        <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed">
        {description}
        </CardDescription>

        {/* Read More Button */}
        <Button className="w-full bg-gradient-to-r from-orange-300 to-orange-600 hover:from-orange-400 hover:to-orange-800 text-white font-medium transition-all duration-200 group/btn">
          <Link href={url}>Read More</Link>
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default BlogCard
