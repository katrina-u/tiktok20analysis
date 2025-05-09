import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Header from "./header";
import FileUpload from "./fileUpload";
import TableHeader from "./tableHeader";
import TableCellError from "./tableCellError";
import TableCell from "./tableCell";
import VideoCarousel from "../components/videoCarousel";

const Tiktok = () => {
  const [videos, setVideos] = useState([]);
  const [sortKey, setSortKey] = useState("views_count");
  const [sortOrder, setSortOrder] = useState("desc");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const extractUsername = (url) => {
    if (!url) return "@unknown";
    try {
      const match = url.match(/https:\/\/tiktok\.com\/@([^/]+)/);
      return match ? `@${match[1]}` : "@invalid-url";
    } catch {
      return "@error";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "No date";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "Invalid date";
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  const formatNumber = (num) => {
    return isNaN(num) ? "No data" : num.toLocaleString();
  };

  const sortData = (data, key, order) => {
    if (!data || data.length === 0) return [];
    return [...data].sort((a, b) => {
      // Handle null/undefined values
      if (a[key] === null || a[key] === undefined)
        return order === "asc" ? 1 : -1;
      if (b[key] === null || b[key] === undefined)
        return order === "asc" ? -1 : 1;

      if (key === "post_created") {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return order === "asc" ? dateA - dateB : dateB - dateA;
      }
      if (key === "name" || key === "username") {
        return order === "asc"
          ? (a[key] || "").localeCompare(b[key] || "")
          : (b[key] || "").localeCompare(a[key] || "");
      }
      return order === "asc"
        ? (a[key] || 0) - (b[key] || 0)
        : (b[key] || 0) - (a[key] || 0);
    });
  };

  const handleSort = (key) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(newOrder);

    if (fileLoaded) {
      const sorted = sortData(videos, key, newOrder).slice(0, 20);
      setVideos(sorted);
    }
  };

  const parseCSVData = (data) => {
    return data.map((row) => ({
      id:
        row.source_post_id ||
        row.Id ||
        `row-${Math.random().toString(36).substr(2, 9)}`,
      name: row.name || "No name",
      href: row.post_url || "#",
      username: extractUsername(row.post_url),
      post_created: row.post_created,
      post_description: row.post_description,
      views_count: parseInt((row.views_count || "").replace(/,/g, ""), 10) || 0,
      likes_count: parseInt((row.likes_count || "").replace(/,/g, ""), 10) || 0,
      shares_count:
        parseInt((row.shares_count || "").replace(/,/g, ""), 10) || 0,
      comments_count:
        parseInt((row.comments_count || "").replace(/,/g, ""), 10) || 0,
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const isCSV =
        file.type === "text/csv" ||
        file.type === "application/vnd.ms-excel" || // sometimes used
        fileExtension === "csv";

      if (!isCSV) {
        setError("Invalid file type. Please upload a .csv file.");
        setFileName("");
        setVideos([]);
        return;
      }

      setLoading(true);
      setError(null);
      setVideos([]);
      setFileLoaded(false);
      setFileName(file.name);

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const data = results.data;

            const requiredFields = ["post_url", "views_count", "post_created"];
            const missingFields = requiredFields.filter(
              (field) => !results.meta.fields.includes(field)
            );

            if (missingFields.length > 0) {
              throw new Error(
                `Missing required column(s): ${missingFields.join(", ")}.`
              );
            }

            const completelyEmptyColumns = requiredFields.filter((field) =>
              data.every((row) => !row[field] || row[field].trim() === "")
            );

            if (completelyEmptyColumns.length > 0) {
              throw new Error(
                `Column(s) with no data: ${completelyEmptyColumns.join(", ")}.`
              );
            }

            const parsed = parseCSVData(data);
            const sorted = sortData(parsed, "views_count", "desc").slice(0, 20);
            setVideos(sorted);
            setFileLoaded(true);
          } catch (err) {
            setError(
              err.message ||
                "Error processing CSV data. Please check the file format."
            );
          } finally {
            setLoading(false);
          }
        },
        error: () => {
          setLoading(false);
          setError(
            "Failed to parse CSV file. Please ensure it is a valid CSV."
          );
        },
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch("/data.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            try {
              const parsed = parseCSVData(results.data);
              const sorted = sortData(parsed, "views_count", "desc").slice(
                0,
                20
              );
              setVideos(sorted);
              setFileLoaded(true);
            } catch (err) {
              setError(
                "Error processing CSV data. Please check the file format."
              );
            } finally {
              setLoading(false);
            }
          },
          error: (err) => {
            setLoading(false);
            setError(
              "Failed to parse CSV file. Please ensure the data is in the correct format."
            );
          },
        });
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to fetch the CSV file. Please try again later.");
      });
  }, []);

  const sortedVideos = sortData(videos, sortKey, sortOrder);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Header />
      <br />
      <FileUpload fileName={fileName} handleFileUpload={handleFileUpload} />

      {error && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {loading && (
        <div className="p-3 mb-4 bg-blue-100 text-blue-700 rounded">
          Loading data, please wait...
        </div>
      )}

      {fileLoaded && !loading && !error && videos.length >= 3 && (
        <VideoCarousel videos={videos} />
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-theme2">
            <thead>
              <TableHeader
                sortOrder={sortOrder}
                handleSort={handleSort}
                sortKey={sortKey}
              />
            </thead>
            <tbody>
              {!fileLoaded ? (
                <TableCellError />
              ) : sortedVideos.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-4 text-center text-gray-500 italic"
                  >
                    No valid data found in the file.
                  </td>
                </tr>
              ) : (
                <TableCell
                  sortedVideos={sortedVideos}
                  formatDate={formatDate}
                  formatNumber={formatNumber}
                />
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tiktok;
