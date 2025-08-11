
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { ResumeContext } from "../../components/context/ResumeContext";
import { Edit, Trash, Plus } from "lucide-react";
import { Button } from "../../components/ui/Button";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import FormModal from "../../components/ui/FormModal";
import { useModal } from "../../hooks/useModal";
import { formatDaysAgo } from "../../components/utility/DateUtils";

const MyResume = () => {
  const { setResumeData } = useContext(ResumeContext);
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [newResumeTitle, setNewResumeTitle] = useState("");
  const [currentResume, setCurrentResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Using custom hook for modal states - This replaces multiple useState calls!
  const deleteModal = useModal();
  const editModal = useModal();

  // Fetch resumes on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://api.sentryspot.co.uk/api/jobseeker/resume-list", {
          headers: { Authorization: token },
        })
        .then((response) => {
          const resumes = response?.data?.data || [];
          if (resumes.length === 0) {
            toast.info("No resumes available.");
          }
          setResumes(resumes);
        })
        .catch((error) => {
          console.error("Error fetching resume list:", error);
          toast.error("Failed to fetch resumes.");
        });
    }
  }, []);

  // Navigate to edit resume page
  const handleEdit = (resumeId) => {
    router.push(`/dashboard/aibuilder/${resumeId}`);
  };

  // Download resume function (if needed later)
  const handleDownload = async (resumeId) => {
    const apiUrl = `https://api.sentryspot.co.uk/api/jobseeker/download-resume/${resumeId}`;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume_${resumeId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download the file. Please try again later.");
    }
  };

  // Delete resume function
  const handleDeleteResume = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await axios.delete(
          `https://api.sentryspot.co.uk/api/jobseeker/resume-list/${selectedResumeId}`,
          { headers: { Authorization: token } }
        );

        toast.success("Resume deleted successfully");
        deleteModal.closeModal(); // Using the hook method
        setResumes(
          resumes.filter((resume) => resume.resume_id !== selectedResumeId)
        );
      } catch (error) {
        console.error("Error deleting resume:", error);
        toast.error("Failed to delete resume");
      } finally {
        setIsLoading(false);
        setSelectedResumeId(null);
      }
    }
  };

  // Open edit modal with resume data
  const handleOpenEditModal = (resume) => {
    setCurrentResume(resume);
    setNewResumeTitle(resume.resume_title || "");
    editModal.openModal(); // Using the hook method
  };

  // Update resume title function
  const handleUpdateResumeTitle = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (token && currentResume) {
      try {
        await axios.put(
          `https://api.sentryspot.co.uk/api/jobseeker/resume-details/${currentResume.resume_id}`,
          { resume_title: newResumeTitle },
          { headers: { Authorization: token } }
        );

        toast.success("Resume title updated successfully.");
        editModal.closeModal(); // Using the hook method
        setResumes((prevResumes) =>
          prevResumes.map((resume) =>
            resume.resume_id === currentResume.resume_id
              ? { ...resume, resume_title: newResumeTitle }
              : resume
          )
        );
      } catch (error) {
        console.error("Error updating resume title:", error);
        toast.error("Failed to update resume title.");
      } finally {
        setIsLoading(false);
        setCurrentResume(null);
        setNewResumeTitle("");
      }
    }
  };

  // Open delete confirmation modal
  const handleDelete = (resumeId) => {
    setSelectedResumeId(resumeId);
    deleteModal.openModal(); // Using the hook method
  };

  return (

    <div
  className="app-light-bg rounded-xl container mx-auto p-4 max-w-7xl overflow-y-auto md:overflow-hidden mt-4"
  // style={{ maxHeight: "calc(100vh - 16rem)" }}
>
  {/* Header Section */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
    <h2 className="text-h2 text-brand">My Resumes</h2>
    <Button
      onClick={() => router.push("/dashboard/resume-builder")}
      icon={Plus}
      className="flex items-center gap-2"
    >
      Create New Resume
    </Button>
  </div>

  {/* Horizontal Scroll Wrapper */}
  <div className="overflow-x-auto">
    {/* Table Container */}
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 min-w-[900px]">
      {/* Fixed Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="grid grid-cols-6 gap-4 px-6 py-4 text-p text-brand-light uppercase tracking-wide">
          <div className="text-center">Sr. No.</div>
          <div>Resume Title</div>
          <div className="text-center">Modified</div>
          <div className="text-center">Created</div>
          <div className="text-center">Strength</div>
          <div className="text-center">Actions</div>
        </div>
      </div>

      {/* Scrollable Body */}
      <div
        className="h-100vh md:h-96 overflow-y-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 #f1f5f9" }}
      >
        {resumes.length > 0 ? (
          resumes.map((resume, index) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 items-center"
            >
              {/* Sr. No */}
              <div className="text-p text-brand-light text-center">
                {index + 1}
              </div>

              {/* Resume Title */}
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <p className="text-p text-brand truncate">
                    {resume.resume_title || "Untitled Resume"}
                  </p>
                </div>
                <button
                  onClick={() => handleOpenEditModal(resume)}
                  className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded hover:bg-blue-50"
                >
                  <Edit className="w-4 h-4" size={18} />
                </button>
              </div>

              {/* Modified Date */}
              <div className="text-p text-center">
                {` ${formatDaysAgo(resume.updated_at)}`}
              </div>

              {/* Created Date */}
              <div className="text-p text-center">
                {` ${formatDaysAgo(resume.created_at)}`}
              </div>

              {/* Strength */}
              <div className="text-center">
                {resume.resume_strenght_details?.resume_strenght ? (
                  <span
                    className={`inline-flex items-center justify-center w-12 h-8 rounded-full text-p font-bold ${
                      resume.resume_strenght_details.resume_strenght > 60
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : resume.resume_strenght_details.resume_strenght > 40
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {resume.resume_strenght_details.resume_strenght}%
                  </span>
                ) : (
                  <span className="text-gray-400 text-sm">—</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => handleEdit(resume.resume_id)}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  title="Edit resume"
                >
                  <Edit className="w-4 h-4" size={18} />
                </button>
                <button
                  onClick={() => handleDelete(resume.resume_id)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Delete resume"
                >
                  <Trash className="w-4 h-4" size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center">
            <div className="text-gray-400 mb-2">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No resumes found</p>
            <p className="text-gray-400 text-sm mt-1">
              Create your first resume to get started
            </p>
          </div>
        )}
      </div>
    </div>
    
      {/* Reusable Delete Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen} // Using hook state
        onClose={deleteModal.closeModal} // Using hook method
        onConfirm={handleDeleteResume}
        title="Delete Resume"
        message="Are you sure you want to delete this resume? This action cannot be undone."
        confirmText="Delete"
        type="danger"
        icon={Trash}
        isLoading={isLoading}
      />

      {/* Reusable Edit Modal */}
      <FormModal
        isOpen={editModal.isOpen} // Using hook state
        onClose={editModal.closeModal} // Using hook method
        onSubmit={handleUpdateResumeTitle}
        title="Edit Resume Title"
        submitText="Save Changes"
        isLoading={isLoading}
        canSubmit={newResumeTitle.trim().length > 0}
      >
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          value={newResumeTitle}
          onChange={(e) => setNewResumeTitle(e.target.value)}
          placeholder="Enter resume title"
          autoFocus
        />
      </FormModal>
    </div>
  </div>
  );
};

export default MyResume;
