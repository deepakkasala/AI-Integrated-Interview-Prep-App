import React from "react";

const SkeletonLoader = () => {
  return (
    <div
      role="status"
      className="animate-pulse space-y-6 max-w-3xl mx-auto p-6"
    >
      {/* Header Placeholder */}
      <div className="h-6 bg-gray-200 rounded-md dark:bg-gray-400 w-1/2"></div>

      {/* Paragraph Block */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-full"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-11/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-10/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-9/12"></div>
      </div>

      {/* Card Section */}
      <div className="bg-gray-100 dark:bg-gray-400 rounded-lg p-4 space-y-2">
        <div className="h-2.5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-2.5 bg-gray-300 rounded w-2/3"></div>
        <div className="h-2.5 bg-gray-300 rounded w-1/2"></div>
      </div>

      {/* Subsection */}
      <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-400 w-1/2 mt-8"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-full"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-11/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-10/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-9/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-full"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-11/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-10/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-9/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-full"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-11/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-10/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-9/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-full"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-11/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-10/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-400 w-9/12"></div>
      </div>

      {/* Footer Block */}
      <div className="bg-gray-100 dark:bg-gray-400 rounded-lg p-4 space-y-2">
        <div className="h-2.5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-2.5 bg-gray-300 rounded w-2/3"></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SkeletonLoader;
