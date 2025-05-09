import React from "react";

const tableBody = (fileLoaded, sortedVideos, formatDate, formatNumber) => {
  return (
    <>
      {!fileLoaded ? (
        <tr>
          <td colSpan="4" className="p-4 text-center text-gray-500 italic">
            No data loaded. Please upload a CSV file.
          </td>
        </tr>
      ) : sortedVideos.length === 0 ? (
        <tr>
          <td colSpan="4" className="p-4 text-center text-gray-500 italic">
            No valid data found in the file.
          </td>
        </tr>
      ) : (
        sortedVideos.map((video) => (
          <tr
            key={video.id}
            className="border-t cell-border-color hover:bg-theme3 bg-gray-100"
          >
            <td className="p-3 whitespace-nowrap">
              <a
                href={video.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-font hover:underline inline-flex items-center"
              >
                {video.username}
              </a>
            </td>
            <td className="p-3">{formatDate(video.post_created)}</td>
            <td className="p-3">{formatNumber(video.views_count)}</td>
          </tr>
        ))
      )}
    </>
  );
};

export default tableBody;
