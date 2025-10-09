"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScaningLoader({ isLoading }) {
  const steps = [
    "Analyzing Resume...",
    "Scanning Job Description...",
    "Matching Skills...",
    "Generating Results...",
  ];
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-50 text-white">
      {/* Company Logo */}
      <motion.img
        src="/assets/logo.png"
        alt="Company Logo"
        className="w-64 h-20 mb-6"
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: [0.8, 1, 0.8], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />

      {/* Loader Animation */}
      <motion.div
        className="flex space-x-2 mb-4"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-3 h-3 bg-white rounded-full"></div>
        <div className="w-3 h-3 bg-white rounded-full"></div>
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </motion.div>

      {/* Step Text */}
      <motion.p
        key={stepIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-lg font-medium"
      >
        {steps[stepIndex]}
      </motion.p>
    </div>
  );
}
