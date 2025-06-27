// 'use client'

// import { useState } from 'react'
// import ProgressBar from '../../../components/resume-builder-steps/Progress-Bar'
// import ExperienceStep from '../../../components/resume-builder-steps/Experience'
// import TemplateStep from '../../../components/resume-builder-steps/Template-step'
// import UploadStep from '../../../components/resume-builder-steps/Upload-Step'
// import FileUploadStep from '../../../components/resume-builder-steps/File-upload'
// import { ResumeProvider } from '../../../components/context/ResumeContext'

// export default function Home() {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [formData, setFormData] = useState({
//     experience: '',
//     template: '',
//     hasPhoto: false,
//     columns: 1,
//     uploadType: '',
//     file: null,
//   })

//   const totalSteps = 4

//   const handleNext = () => {
//     setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
//   }

//   const handleBack = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 1))
//   }

//   const updateFormData = (data) => {
//     setFormData((prev) => ({ ...prev, ...data }))
//   }

//   return (
//     // <ResumeProvider>
//     <main className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* <ProgressBar currentStep={currentStep} totalSteps={totalSteps} /> */}

//         <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
//           {currentStep === 1 && (
//             <ExperienceStep
//               onNext={handleNext}
//               onChange={(experience) => updateFormData({ experience })}
//               value={formData.experience}
//             />
//           )}

//           {currentStep === 2 && (
//             <TemplateStep
//               onNext={handleNext}
//               onBack={handleBack}
//               onChange={(data) => updateFormData(data)}
//               value={{
//                 template: formData.template,
//                 hasPhoto: formData.hasPhoto,
//                 columns: formData.columns,
//               }}
//             />
//           )}

//           {currentStep === 3 && (
//             <UploadStep
//               onNext={handleNext}
//               onBack={handleBack}
//               onChange={(uploadType) => updateFormData({ uploadType })}
//               value={formData.uploadType}
//             />
//           )}

//           {currentStep === 4 && formData.uploadType === 'upload' && (
//             <FileUploadStep
//               onNext={handleNext}
//               onBack={handleBack}
//               onChange={(file) => updateFormData({ file })}
//               value={formData.file}
//             />
//           )}
//         </div>
//       </div>
//     </main>
//     // </ResumeProvider>
//   )
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../Navbar/Navbar";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateResume = async () => {
    setLoading(true);
    setError("");

    try {
      // Replace this with your actual token
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/resume-create",
        {},
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );

      // Assuming the response contains the ID
      console.log(response);
      const { id } = response.data.data;

      // Navigate to the dynamic route
      router.push(`/dashboard/resume-builder/${id}`);
    } catch (err) {
      console.error("Error creating resume:", err);
      setError("Failed to create resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
    <Navbar/>
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Resume Builder</h1>
        <p className="mb-6 text-gray-600">
          Click the button below to create your resume.
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleCreateResume}
          className={`px-6 py-3 text-white font-semibold rounded-lg ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Your Resume"}
        </button>
      </div>
    </main>
   </>
  );
}
