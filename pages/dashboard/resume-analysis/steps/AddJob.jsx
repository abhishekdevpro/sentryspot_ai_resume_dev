"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/Button";
// import Button from "../../ui/Button";

export default function AddJob({ onNext, onBack, updateFormData, formData }) {
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(true); // default valid if empty

  const MIN_WORDS = 50;
  const MAX_WORDS = 500;

  useEffect(() => {
    const words = formData.job_description
      ? formData.job_description
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0)
      : [];
    const count = words.length;
    setWordCount(count);

    // Check validity:
    if (count === 0) {
      // Field is optional → valid if empty
      setIsValid(true);
      setError("");
    } else if (count < MIN_WORDS) {
      setIsValid(false);
      setError(`Job description must be at least ${MIN_WORDS} words`);
    } else if (count > MAX_WORDS) {
      setIsValid(false);
      setError(`Job description must not exceed ${MAX_WORDS} words`);
    } else {
      setIsValid(true);
      setError("");
    }
  }, [formData.job_description]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    updateFormData({ job_description: value });
  };

  const handleNext = () => {
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold mb-4">Add Job Description</h2>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
          Job Description (Optional)
        </label>
        <textarea
          className={`w-full border p-3 rounded-lg resize-none ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Paste your Job Description here... (Optional, but if added must be between 50–500 words)"
          rows={8}
          value={formData.job_description || ""}
          onChange={handleTextChange}
        />

        {/* Word count */}
        {formData.job_description && (
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-gray-600">
              <span
                className={
                  wordCount < MIN_WORDS || wordCount > MAX_WORDS
                    ? "text-red-500"
                    : "text-green-600"
                }
              >
                {wordCount}
              </span>
              {" / "}
              <span className="text-gray-500">{MAX_WORDS}</span> words
            </div>

            <div className="text-xs text-gray-500">
              Min: {MIN_WORDS} words
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-xs mt-1 text-left">{error}</p>
        )}

        {/* Success message */}
        {isValid && formData.job_description && (
          <p className="text-green-600 text-xs mt-1 text-left">
            ✓ Job description meets requirements
          </p>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          onClick={onBack}
          // className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isValid}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
