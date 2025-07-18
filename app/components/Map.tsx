"use client"
import React from 'react'

const Map = () => {
  return (
     <iframe
     className='h-[50vh] w-full rounded-2xl shadow-lg'
    width="30%"
    // height="300"
    style={{ border: 0, borderRadius: '12px' }}
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    src="https://www.google.com/maps?q=Spring+Leaf+Building+No,mumbai&hl=en&z=15&output=embed"
  ></iframe>
  )
}

export default Map