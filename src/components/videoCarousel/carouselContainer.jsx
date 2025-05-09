import React from "react";

export const CarouselContainer = ({ carouselRef, videos }) => {
  return (
    <div
      ref={carouselRef}
      className="flex space-x-4 overflow-x-auto snap-x snap-mandatory scroll-smooth 
                px-4 pb-6 [scrollbar-width:none] [-ms-overflow-style:none] 
                [-webkit-overflow-scrolling:touch]"
    >
      {videos.slice(0, 5).map((video, index) => (
        <div
          key={video.id || index}
          className="snap-start min-w-[300px] md:min-w-[350px] bg-white light:bg-gray-700 
                      rounded-xl shadow-md hover:shadow-lg transition-all p-4 flex-shrink-0 
                      border border-gray-100 light:border-gray-600"
        >
          <h3 className="font-bold text-lg text-gray-800 light:text-white mb-1 line-clamp-2">
            {video.username}
          </h3>
          <p className="text-sm text-gray-500 light:text-gray-300 mb-3">
            Likes: {video.likes_count}
          </p>

          <a
            href={video.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-theme1 hover:bg-fontColor2 text-white text-center py-2 rounded-md transition-colors duration-200"
          >
            Watch Video
          </a>

          <div className="text-sm text-gray-400 light:text-gray-400 mt-2">
            Views: {video.views_count.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};
