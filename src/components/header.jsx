import React from "react";

const navbar = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-fontColor2 font-sans grid place-items-center">
        Top TikTok Videos
      </h1>
      <p className="text-sm text-gray-600 grid place-items-center">
        Upload a CSV file to analyze TikTok data
      </p>
    </div>
  );
};

export default navbar;
