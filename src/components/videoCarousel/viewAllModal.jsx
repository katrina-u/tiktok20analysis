import React, { useState } from "react";

export const ViewAllModal = ({ videos }) => {
  const [showAllModal, setShowAllModal] = useState(false);

  return (
    <>
      {videos.length > 5 && (
        <div className="flex-shrink-0 px-4 flex items-center">
          <button
            onClick={() => setShowAllModal(true)}
            className="text-blue-600 dark:text-fontColor1 hover:underline"
          >
            View all {videos.length} videos in Grid →
          </button>
        </div>
      )}

      {showAllModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white light:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">All Videos</h3>
              <button 
                onClick={() => setShowAllModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {videos.map((video) => (
                <a
                  key={video.id}
                  href={video.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-lg hover:shadow-md transition-shadow dark:hover:bg-theme1"
                >
                  <h4 className="font-medium line-clamp-2">{video.username}</h4>
                  <p className="text-sm text-fontColor2 mt-1">{video.post_description}</p>
                  <p className="text-xs text-fontColor2 mt-2">
                    {video.views_count.toLocaleString()} views
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};