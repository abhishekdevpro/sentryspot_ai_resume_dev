"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Stepper from "./Stepper";
import UploadResume from "./steps/UploadResume";
import AddJob from "./steps/AddJob";
import ViewResults from "./steps/ViewResult";

const steps = ["Upload Resume", "Add Job", "View Results"];

export default function ResumeScan({ scanId }) {
  const [currentStep, setCurrentStep] = useState(0);

  // Global form state
  const [formData, setFormData] = useState({
    job_title: "",
    experience: "",
    location: "",
    resume_upload: null,
    job_description: "",
  });

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="relative max-h-screen flex flex-col items-center justify-center bg-white overflow-hidden p-4 md:p-8">
      {/* Doodle Backgrounds */}
      {/* <img
        src="/doodles/doodle1.svg"
        alt="doodle"
        className="absolute top-4 left-6 w-32 h-32 opacity-40"
      />
      <img
        src="/doodles/doodle1.svg"
        alt="doodle"
        className="absolute top-2 right-0 w-40 h-40 opacity-100"
      />
      <img
        src="/doodles/doodle2.svg"
        alt="doodle"
        className="absolute bottom-2 left-0 w-40 h-40 opacity-100"
      />
      <img
        src="/doodles/doodle1.svg"
        alt="doodle"
        className="absolute bottom-4 right-6 w-32 h-32 opacity-40"
      /> */}

      {/* Stepper */}
      <Stepper steps={steps} currentStep={currentStep} />

      {/* Step Content */}
      <div className="relative z-10 mt-8 w-full max-w-6xl p-6 bg-white shadow-lg rounded-2xl border border-blue-500">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              <UploadResume
                onNext={nextStep}
                updateFormData={updateFormData}
                formData={formData}
              />
            </motion.div>
          )}
          {currentStep === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              <AddJob
                onNext={nextStep}
                onBack={prevStep}
                updateFormData={updateFormData}
                formData={formData}
              />
            </motion.div>
          )}
          {currentStep === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              <ViewResults
                onBack={prevStep}
                formData={formData}
                scanId={scanId}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
