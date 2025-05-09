import React from "react";

const tableHeader = ({sortOrder, handleSort, sortKey}) => {
  return (
    <tr className="bg-theme1 text-fontColor2">
      <th
        className="p-3 text-left cursor-pointer whitespace-nowrap"
        onClick={() => handleSort("username")}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 20a6 6 0 0 0-12 0"></path>
            <circle cx="12" cy="10" r="4"></circle>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          <span>
            Name {sortKey === "username" && (sortOrder === "asc" ? "↑" : "↓")}
          </span>
        </div>
      </th>
      <th
        className="p-3 text-left cursor-pointer whitespace-nowrap"
        onClick={() => handleSort("post_created")}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path>
          </svg>
          <span>
            Date{" "}
            {sortKey === "post_created" && (sortOrder === "asc" ? "↑" : "↓")}
          </span>
        </div>
      </th>
      <th
        className="p-3 text-left cursor-pointer whitespace-nowrap"
        onClick={() => handleSort("views_count")}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"></path>
            <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"></path>
            <circle cx="12" cy="12" r="1"></circle>
            <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"></path>
          </svg>
          <span>
            Views{" "}
            {sortKey === "views_count" && (sortOrder === "asc" ? "↑" : "↓")}
          </span>
        </div>
      </th>
    </tr>
  );
};

export default tableHeader;
