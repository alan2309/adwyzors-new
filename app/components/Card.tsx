"use client"
import React from "react";
import { ArrowRight, MoveRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Card = ({ id = 0, title="", description= "" }) => {
  return (
    <div
      className="card max-w-sm p-6 h-[340px] min-w-[240px] bg-white border border-gray-200 rounded-lg shadow-xl"
      id={`${id}`}>
      <a href="#">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-black">
          {title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
       {description}
      </p>
      {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
    </a> */}
      <Button className="w-[50%] bg-gradient-to-r from-orange-300 to-orange-600 hover:from-orange-400 hover:to-orange-800 text-white font-medium transition-all duration-200 group/btn">
          <span>Read More</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
    </div>
  );
};

export default Card;
