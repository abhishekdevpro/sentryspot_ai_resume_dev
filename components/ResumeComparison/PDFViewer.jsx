import React from "react";
import { X } from "lucide-react";

const PDFViewer = ({ isOpen, onClose, filePath, title = "PDF Viewer" }) => {
  if (!isOpen) return null;
  const BASE_URL = "https://api.sentryspot.co.uk";
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 h-5/6 max-w-6xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 h-full">
          {filePath ? (
            <iframe
              src={`${BASE_URL}${filePath}#toolbar=0`}
              className="w-full h-full border-0"
              title={title}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No PDF file available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
