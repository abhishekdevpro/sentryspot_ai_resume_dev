import React from "react";

const CircularGauge = ({
  percent = 0,
  size = 88,
  stroke = 8,
  version = "current",
}) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, Number(percent) || 0));
  const offset = circumference - (clamped / 100) * circumference;

  const color = version === "current" ? "#14b8a6" : "#3b82f6"; // Teal for current, Blue for previous

  return (
    <svg width={size} height={size} className="block">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e5e7eb"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="52%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="fill-gray-800 font-bold text-sm"
      >
        {clamped}%
      </text>
    </svg>
  );
};

export default CircularGauge;
