import React from "react";

const FileUpload = ({ fileName, handleFileUpload }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-fontColor1 font-medium text-center">
        Upload CSV file only:
      </label>
      <div className="flex items-center justify-center">
        <label className="flex items-center gap-2 cursor-pointer bg-theme1 text-fontColor2 px-4 py-2 rounded-l hover:bg-theme1-dark transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          <span>Browse Files</span>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        <div className="flex-1 p-2 border border-l-0 rounded-r bg-white text-fontColor2 truncate min-w-[200px]">
          {fileName || "No file selected"}
        </div>
      </div>
      {fileName && (
        <p className="text-sm text-theme1 mt-1 text-center">
          Selected file: {fileName}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
