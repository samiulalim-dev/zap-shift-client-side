import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-lime-500"></div>
    </div>
  );
};

export default LoadingSpinner;
