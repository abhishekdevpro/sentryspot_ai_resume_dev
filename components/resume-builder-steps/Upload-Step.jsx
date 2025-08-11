
"use client";

import { FaUpload, FaFileAlt } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import DefaultResumeData from "../utility/DefaultResumeData";
import { ResumeContext } from "../context/ResumeContext";
import { Button } from "../ui/Button";

export default function UploadStep({ onNext, onBack, onChange, value }) {
  const router = useRouter();
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const { setResumeData } = useContext(ResumeContext);
  const resumeId = router.query.id || localStorage.getItem("resumeId");
  if (!resumeId) {
    toast.error("Resume ID or token not found");
    return;
  }

  const handleStartFromScratch = () => {
    // localStorage.setItem("currentSection", 0);
    // setResumeData(DefaultResumeData);
    router.push(`/dashboard/aibuilder/${resumeId}`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-h1 text-brand mb-2">
          Are you uploading an existing resume?
        </h2>
        <p className="text-p text-brand-light">
          Just review, edit, and update it with new information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => {
            onChange("upload");
            onNext();
          }}
          className="p-6 border-2 rounded-lg text-center app-card-bg hover:border-blue-400"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <FaUpload className="text-blue-600 w-8 h-8" />
          </div>
          <h3 className="text-h2 text-brand">Yes, upload from my resume</h3>
          <p className="text-p text-brand-light">
            We will give you expert guidance to fill out your info and enhance
            your resume
          </p>
        </button>

        <button
          onClick={handleStartFromScratch}
          className="p-6 border-2 rounded-lg app-card-bg text-center hover:border-blue-400"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <FaFileAlt className="text-blue-600 w-8 h-8" />
          </div>
          <h3 className="text-h2 text-brand">No, start from scratch</h3>
          <p className="text-brand text-p">
            We will guide you through the whole process so your skills can shine
          </p>
        </button>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          onClick={onBack}
          variant="secondary"
          // className="px-6 py-2 border rounded-lg hover:bg-gray-50"
        >
          Back
        </Button>
      </div>
    </div>
  );
}
