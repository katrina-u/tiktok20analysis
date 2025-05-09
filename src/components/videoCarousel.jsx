import React, { useRef, useState } from "react";
import { ViewAllModal } from "./videoCarousel/viewAllModal";
import { CarouselContainer } from "./videoCarousel/carouselContainer";

const VideoCarousel = ({ videos }) => {
  const carouselRef = useRef(null);  

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative my-8 group">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white px-4">
        Featured Videos
      </h2>

      <button
        onClick={() => scroll("left")}
        className="hidden md:block absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Scroll left"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <CarouselContainer carouselRef={carouselRef} videos={videos}/>
      
      <button
        onClick={() => scroll("right")}
        className="hidden md:block absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Scroll right"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      <ViewAllModal videos={videos} />
    </div>
  );
};

export default VideoCarousel;
