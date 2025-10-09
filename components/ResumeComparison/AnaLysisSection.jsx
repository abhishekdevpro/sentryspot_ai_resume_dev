import React from 'react';
import StatusIcon from './StatusIcon';

const AnalysisSection = ({
  title,
  badgeText,
  badgeColor = "bg-blue-100 text-blue-700",
  description,
  children
}) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 border-2">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeColor}`}>
          {badgeText}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      {children}
    </div>
  );
};

export default AnalysisSection;