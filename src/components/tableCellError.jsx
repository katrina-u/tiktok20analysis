import React from "react";

export const tableCellError = () => {
  return (
    <tr>
      <td colSpan="4" className="p-4 text-center text-gray-500 italic">
        No data loaded. Please upload a CSV file.
      </td>
    </tr>
  );
};

export default tableCellError;
