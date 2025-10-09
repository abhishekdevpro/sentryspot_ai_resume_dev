"use client";
import { X } from "lucide-react";

export default function ResumeComparisonModal({
  isOpen,
  onClose,
  beforeData,
  afterData,
}) {
  if (!isOpen) return null;

  const getScoreStyles = (score) => {
    if (score >= 75) {
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        ring: "ring-green-400",
        label: "Good",
      };
    } else if (score >= 50) {
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        ring: "ring-yellow-400",
        label: "Average",
      };
    } else {
      return {
        bg: "bg-red-100",
        text: "text-red-700",
        ring: "ring-red-400",
        label: "Bad",
      };
    }
  };

  const beforeStyles = getScoreStyles(beforeData?.score || 0);
  const afterStyles = getScoreStyles(afterData?.score || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="
          bg-white rounded-2xl shadow-2xl 
          w-11/12 max-w-6xl 
          max-h-[90vh] overflow-y-auto 
          relative animate-fadeIn
        "
        style={{ scrollbarWidth: "thin" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={28} />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Resume <span className="text-green-600">Comparison</span>
          </h2>

          {/* Comparison Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="border rounded-xl p-5 flex flex-col items-center shadow-md bg-gray-50 w-full">
              <span className="bg-red-500 text-white text-sm font-semibold px-4 py-1 rounded-full uppercase mb-4">
                Before
              </span>
              <div className="relative w-full max-h-[60vh] overflow-y-auto rounded-lg">
                <img
                  src={`https://api.sentryspot.co.uk${beforeData?.imageUrl}`}
                  alt="Before Resume"
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>
              <div
                className={`mt-5 w-full px-6 py-2 rounded-full flex flex-col items-center ring-2 ${beforeStyles.bg} ${beforeStyles.text} ${beforeStyles.ring}`}
              >
                <span className="text-2xl font-bold">{beforeData?.score}</span>
                <span className="text-sm font-medium">
                  {beforeStyles.label}
                </span>
                <span className="text-xs text-gray-500">Resume Strength</span>
              </div>
            </div>

            {/* After */}
            <div className="border rounded-xl p-5 flex flex-col items-center shadow-md bg-gray-50 w-full">
              <span className="bg-green-600 text-white text-sm font-semibold px-4 py-1 rounded-full uppercase mb-4">
                After
              </span>
              <div className="relative w-full max-h-[60vh] overflow-y-auto rounded-lg">
                <img
                  src={`https://api.sentryspot.co.uk${afterData?.imageUrl}`}
                  alt="After Resume"
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>
              <div
                className={`mt-5 w-full px-6 py-2 rounded-full flex flex-col items-center ring-2 ${afterStyles.bg} ${afterStyles.text} ${afterStyles.ring}`}
              >
                <span className="text-2xl font-bold">{afterData?.score}</span>
                <span className="text-sm font-medium">{afterStyles.label}</span>
                <span className="text-xs text-gray-500">Resume Strength</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
