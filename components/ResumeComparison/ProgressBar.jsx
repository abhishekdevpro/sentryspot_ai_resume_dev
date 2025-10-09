import React from 'react';

const ProgressBar = ({ label, issues, progress, color = "blue" }) => {
  const progressColors = {
    blue: "bg-blue-600",
    teal: "bg-teal-600"
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-blue-600">{issues} issues to fix</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${progressColors[color]} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;