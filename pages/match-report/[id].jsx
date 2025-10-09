import React, { useEffect, useState } from "react";

import axios from "axios";
import SidebarStrength from "./SidebarStrength";
import ResumeStrength from "./ResumeStrength";
import { useRouter } from "next/router";
import { Edit, Loader2, X } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "../../components/ui/Button";
import FullPageLoader from "../../components/ResumeLoader/Loader";
import Navbar from "../Navbar/Navbar";

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [resumeStrength, setResumeStrength] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [resumeId, setResumeId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedJobDescription, setEditedJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scaning, setScaning] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  //   console.log("called", id);
  const tabs = ["Resume", "Job Description"];

  const getResumeStrength = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/resume-list/${id}?lang=en`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.data.code === 200 || res.data.status === "success") {
        // console.log(res.data.data.job_description,"res.data.data.job_description")
        console.log("API Response Data:", res.data.data);
        console.log(
          "Resume Analysis Details:",
          res.data.data.resume_analysis_details
        );
        setResumeId(res.data.data.id);
        setResumeStrength(res.data.data); // Pass the entire data object
        setJobDescription(res.data.data.job_description);
      }
    } catch (error) {
      console.error("Error fetching resume strength:", error);
    }
  };

  useEffect(() => {
    if (!id) return; // wait until id is available
    getResumeStrength();
  }, [id]);

  const handleEditJobDescription = () => {
    setEditedJobDescription(jobDescription);
    setIsEditModalOpen(true);
  };

  const handleSaveJobDescription = async () => {
    if (!editedJobDescription.trim()) {
      toast.error("Job description cannot be empty");
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `https://api.sentryspot.co.uk/api/jobseeker/resume-jobdescription/${resumeId}`,
        {
          job_description: editedJobDescription,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        setJobDescription(editedJobDescription);
        setIsEditModalOpen(false);
        toast.success("Job description updated successfully");
      } else {
        toast.error(
          response.data.message || "Failed to update job description"
        );
      }
    } catch (error) {
      console.error("Error updating job description:", error);
      toast.error(
        error.response?.data?.message || "Error updating job description"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeMatchAnalysis = async () => {
    setScaning(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `https://api.sentryspot.co.uk/api/jobseeker/resumes/${id}/scan`,
        {
          job_description: editedJobDescription,
        },
        {
          headers: {
            Authorization: `${token}`, // ✅ safer if backend expects Bearer
          },
        }
      );

      if (res.data?.code === 200 || res.data?.status === "success") {
        setResumeId(res.data.data.id);
        setResumeStrength(res.data.data); // ✅ store the full object as a JSON object
        setJobDescription(res.data.data.job_description);
        console.log(
          res.data,
          res.data.data.resume_analysis_details,
          "✅ Resume Match analysis success"
        );
      } else {
        console.warn(res.data, "⚠️ Unexpected response format");
      }
    } catch (error) {
      console.error(error, "❌ Error while Resume Match analysis");
    } finally {
      setScaning(false);
      setIsEditModalOpen(false);
      setActiveTab(0);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditedJobDescription("");
  };
  console.log("resumeStrength")
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50">
      <Navbar />

      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-20 ">
              {resumeStrength ? (
                <SidebarStrength
                  resumeId={resumeId}
                  strengths={resumeStrength}
                />
              ) : (
                <div className="bg-white shadow-md rounded-xl p-6 text-center text-gray-500">
                  Loading strengths...
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b bg-gray-50">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 text-md font-semibold transition-colors duration-200 ${activeTab === index
                        ? "text-teal-600 border-b-2 border-teal-600 bg-white"
                        : "text-gray-500 hover:text-teal-600"
                      }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-6 md:p-8">
                {activeTab === 0 && (
                  <div>
                    {resumeStrength ? (
                      <ResumeStrength strengths={resumeStrength} />
                    ) : (
                      <p className="text-gray-500">Loading resume details...</p>
                    )}
                  </div>
                )}

                {activeTab === 1 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                        Job Description
                      </h2>
                      <Button
                      className="rounded-full"
                        onClick={handleEditJobDescription}
                      
                      // className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                         <Edit size={20}  />
                        Edit
                      </Button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {jobDescription || "No job description provided."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Job Description Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Edit Job Description
              </h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description
                </label>
                <textarea
                  value={editedJobDescription}
                  onChange={(e) => setEditedJobDescription(e.target.value)}
                  className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter job description..."
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={handleCancelEdit}
                disabled={isLoading}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              {/* <button
                onClick={handleSaveJobDescription}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button> */}
              <Button
                disabled={!editedJobDescription}
                onClick={() => handleResumeMatchAnalysis()}
                startIcon={scaning && <Loader2 />}
              >
                {scaning ? "Analyzing..." : "Resume Match Analysis"}
              </Button>
            </div>
          </div>
        </div>
      )}
      {scaning && <FullPageLoader isLoading={scaning} mode="scanner" />}
    </div>
  );
};

export default Index;
