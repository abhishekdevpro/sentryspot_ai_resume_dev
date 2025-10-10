"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
// import Button from "../../buttonUIComponent";
// import { getJobTitle, getLocations } from "../../services/scanService";
import WindowedSelect from "react-windowed-select";
import { getJobTitle, getLocations } from "../../../../components/services/scanService";

export default function UploadResume({ onNext, updateFormData, formData }) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [jobTitles, setJobTitles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [showJobSuggestions, setShowJobSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filteredJobTitles, setFilteredJobTitles] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [errors, setErrors] = useState({});

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length > 0) {
        const file = acceptedFiles[0];
        updateFormData({ resume_upload: file });
        // Don't auto-upload, wait for form validation
      }
    },
    [updateFormData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.job_title || formData?.job_title.trim() === "") {
      newErrors.job_title = "Job title is required";
    }

    if (!formData?.experience || formData?.experience === "") {
      newErrors.experience = "Experience is required";
    }

    if (!formData?.location || formData?.location.trim() === "") {
      newErrors.location = "Location is required";
    }

    if (!formData?.resume_upload) {
      newErrors.resume = "Resume file is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleUpload = () => {
  //   if (!validateForm()) {
  //     return;
  //   }

  //   setIsUploading(true);
  //   setProgress(0);

  //   let interval = setInterval(() => {
  //     setProgress((prev) => {
  //       if (prev >= 100) {
  //         clearInterval(interval);
  //         setTimeout(() => onNext(), 600);
  //         return 100;
  //       }
  //       return prev + 10;
  //     });
  //   }, 200);
  // };
  const handleUpload = () => {
    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    // ✅ Call onNext immediately to show Add Job step
    onNext();

    // 🎨 Still show progress animation in background (optional)
    setIsUploading(true);
    setProgress(0);

    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const fetchJobTitle = async () => {
    const res = await getJobTitle();
    setJobTitles(res.data);
  };
  const fetchLocations = async () => {
    const res = await getLocations();
    console.log(res.data, "locations");
    setLocations(res.data.location_names);
  };

  useEffect(() => {
    fetchJobTitle();
    fetchLocations();
  }, []);

  const handleJobTitleChange = (value) => {
    updateFormData({ job_title: value });
    if (errors.job_title) {
      setErrors((prev) => ({ ...prev, job_title: "" }));
    }
    if (value.trim()) {
      const filtered = jobTitles.filter((jt) =>
        jt.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredJobTitles(filtered);
      setShowJobSuggestions(true);
    } else {
      setShowJobSuggestions(false);
      setFilteredJobTitles([]);
    }
  };

  const handleLocationChange = (value) => {
    updateFormData({ location: value });
    if (errors.location) {
      setErrors((prev) => ({ ...prev, location: "" }));
    }
    if (value.trim()) {
      const filtered = locations.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowLocationSuggestions(true);
    } else {
      setShowLocationSuggestions(false);
      setFilteredLocations([]);
    }
  };

  const handleExperienceChange = (value) => {
    updateFormData({ experience: value });
    if (errors.experience) {
      setErrors((prev) => ({ ...prev, experience: "" }));
    }
  };

  const selectJobTitle = (job) => {
    updateFormData({ job_title: job.name });
    setShowJobSuggestions(false);
    if (errors.job_title) {
      setErrors((prev) => ({ ...prev, job_title: "" }));
    }
  };

  const selectLocation = (location) => {
    updateFormData({ location: location });
    setShowLocationSuggestions(false);
    if (errors.location) {
      setErrors((prev) => ({ ...prev, location: "" }));
    }
  };

  const isFormValid = () => {
    return (
      formData?.job_title &&
      formData?.job_title.trim() !== "" &&
      formData?.experience &&
      formData?.experience !== "" &&
      formData?.location &&
      formData?.location.trim() !== "" &&
      formData?.resume_upload
    );
  };

  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold mb-4">
        Upload Your Resume To Get Started
      </h2>

      {/* Mandatory fields message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
        <p className="text-blue-800 text-sm">
          <span className="font-medium">Note:</span> All fields marked with{" "}
          <span className="text-red-500 font-bold">*</span> are mandatory and
          must be completed before proceeding.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="job_title"
            value={formData?.job_title || ""}
            onChange={(e) => handleJobTitleChange(e.target.value)}
            placeholder="Enter Job Title"
            className={`w-full border rounded-lg p-2 ${
              errors.job_title ? "border-red-500" : "border-gray-300"
            }`}
            onFocus={() => {
              if (formData?.job_title) {
                setFilteredJobTitles(jobTitles);
                setShowJobSuggestions(true);
              }
            }}
          />
          {errors.job_title && (
            <p className="text-red-500 text-xs mt-1 text-left">
              {errors.job_title}
            </p>
          )}
          {showJobSuggestions && filteredJobTitles.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {filteredJobTitles?.map((jt) => (
                <div
                  key={jt.id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-left"
                  onClick={() => selectJobTitle(jt)}
                >
                  {jt.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
            Experience <span className="text-red-500">*</span>
          </label>
          <select
            name="experience"
            value={formData?.experience || ""}
            onChange={(e) => handleExperienceChange(e.target.value)}
            className={`w-full border rounded-lg p-2 ${
              errors.experience ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Experience</option>
            <option value="1">0-1 Years</option>
            <option value="2-4">2-4 Years</option>
            <option value="5-6">5-6 Years</option>
            {/* <option value="7-8">7-8 Years</option>
            <option value="9-10">9-10 Years</option> */}
            <option value="10+">10+ Years</option>
          </select>
          {errors.experience && (
            <p className="text-red-500 text-xs mt-1 text-left">
              {errors.experience}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData?.location || ""}
            onChange={(e) => handleLocationChange(e.target.value)}
            placeholder="Enter Location"
            className={`w-full border rounded-lg p-2 ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
            onFocus={() => {
              if (formData?.location) {
                setFilteredLocations(locations);
                setShowLocationSuggestions(true);
              }
            }}
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1 text-left">
              {errors.location}
            </p>
          )}
          {showLocationSuggestions && filteredLocations?.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {filteredLocations?.map((loc, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-left"
                  onClick={() => selectLocation(loc)}
                >
                  {loc}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!isUploading ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Resume File <span className="text-red-500">*</span>
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 h-48 flex flex-col items-center justify-center cursor-pointer transition ${
              isDragActive ? "border-blue-600 bg-blue-50" : "border-gray-900"
            } ${errors.resume ? "border-red-500" : ""}`}
          >
            <input {...getInputProps()} />
            {formData?.resume_upload ? (
              <div className="text-center">
                <p className="text-green-600 font-medium mb-2">
                  ✓ Resume uploaded successfully!
                </p>
                <p className="text-sm text-gray-600">
                  {formData?.resume_upload.name}
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-medium mb-2">
                  Upload your resume to get started
                </h2>
                <button className="bg-blue-600 py-2 px-4 rounded text-white mb-2 hover:bg-blue-700 transition">
                  Upload Resume
                </button>
                <p className="text-sm text-gray-400">as.pdf or.docx file</p>
                {/* <p className="text-sm text-gray-400">
                  {isDragActive
                    ? "Drop your resume here..."
                    : "Drag & drop your resume, or click to browse"}
                </p> */}
              </>
            )}
          </div>
          {errors.resume && (
            <p className="text-red-500 text-xs mt-1 text-left">
              {errors.resume}
            </p>
          )}

          <div className="mt-6">
            <button
              onClick={handleUpload}
              disabled={!isFormValid()}
              className={`py-2 px-6 rounded-lg font-medium transition ${
                isFormValid()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto">
          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-600 h-4 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-gray-600">Uploading... {progress}%</p>
        </div>
      )}
    </div>
  );
}
