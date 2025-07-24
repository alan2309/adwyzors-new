"use client"
import Map from "../components/Map"
import Navbar from "../components/Navbar"
import Form from "./Form"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, User, Link } from "lucide-react"

const ContactPage = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gray-50 pb-8 mb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="pt-[15vh] text-4xl md:text-6xl font-bold text-gray-900 py-5">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 mb-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Address Section */}
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  <span className="border-b-4 border-orange-400 pb-1">ADDRESS</span>
                </h2>
              </div>
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-orange-400 mt-1 flex-shrink-0" />
                    <p className="text-lg text-gray-700 leading-relaxed">
                      ADWYZORS, Spring leaf, Lokhandwala Township, Kandivali East, Mumbai-400101
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Details Section */}
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  <span className="border-b-4 border-orange-400 pb-1">CONTACT DETAILS</span>
                </h2>
              </div>
              <Card className="shadow-sm">
                <CardContent className="p-6 space-y-6">
                  {/* First Contact */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-orange-400" />
                      <span className="text-xl font-semibold text-gray-900">CA Yash Dev Arya</span>
                    </div>
                    <div className="flex items-center space-x-3 ml-8">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a
                        href="mailto:yasharya98@gmail.com"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        yasharya98@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-3 ml-8">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <Link href="tel:9819902363" className="text-blue-600 hover:text-blue-800 transition-colors">
                        +91 98199 02363
                      </Link>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  {/* Second Contact */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-orange-400" />
                      <span className="text-xl font-semibold text-gray-900">CA Yash Dev Arya</span>
                    </div>
                    <div className="flex items-center space-x-3 ml-8">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a
                        href="mailto:yasharya98@gmail.com"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        yasharya98@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-3 ml-8">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <Link href="tel:9819902363" className="text-blue-600 hover:text-blue-800 transition-colors">
                        +91 98199 02363
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                <span className="border-b-4 border-orange-400 pb-1">SEND US A MESSAGE</span>
              </h2>
            </div>
            <Form />
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              <span className="border-b-4 border-orange-400 pb-1">FIND US ON THE MAP</span>
            </h2>
          </div>
          <div className="rounded-lg overflow-hidden shadow-sm">
            <Map />
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage
