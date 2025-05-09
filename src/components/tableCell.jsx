import React from "react";

const TableCell = ({ sortedVideos, formatDate, formatNumber }) => {
  return (
    <>
      {sortedVideos.map((video) => (
        <tr
          key={video.id}
          className="border-t cell-border-color hover:bg-theme3 bg-gray-100"
        >
          <td className="p-3 whitespace-nowrap">
            <a
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fontColor2 hover:underline inline-flex items-center"
            >
              {video.username}
            </a>
          </td>
          <td className="p-3 ">{formatDate(video.post_created)}</td>
          <td className="p-3">{formatNumber(video.views_count)}</td>
        </tr>
      ))}
    </>
  );
};

export default TableCell;
