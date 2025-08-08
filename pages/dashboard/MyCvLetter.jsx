"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Download, Edit, Trash, Plus } from "lucide-react";
import { useRouter } from "next/router";
import FullScreenLoader from "../../components/ResumeLoader/Loader";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/Button";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import { useModal } from "../../hooks/useModal";

// Helper to format "X days ago"
const formatDaysAgo = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const diffTime = Date.now() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
};

const MyCvLetter = () => {
  const [coverletters, setCoverLetters] = useState([]);
  const [deletecoverletterId, setDeletecoverletterId] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const deleteModal = useModal();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://api.sentryspot.co.uk/api/jobseeker/coverletter", {
          headers: { Authorization: token },
        })
        .then((response) => {
          const coverletters = response?.data?.data || [];
          if (coverletters.length === 0) {
            toast.info("No cover letters available.");
          }
          setCoverLetters(coverletters);
        })
        .catch((error) => {
          console.error("Error fetching cover letter list:", error);
          toast.error("Failed to fetch cover letters.");
        });
    }
  }, []);

  const handleEdit = (id) => {
    router.push(`/dashboard/cvaibuilder/${id}`);
  };

  const handleDownload = async (id) => {
    const apiUrl = `https://api.sentryspot.co.uk/api/jobseeker/download-coverletter/${id}`;
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
      link.download = `coverletter_${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download the file. Please try again later.");
    }
  };

  const handleDeleteCvLetter = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete(
          `https://api.sentryspot.co.uk/api/jobseeker/coverletter/${deletecoverletterId}`,
          { headers: { Authorization: token } }
        );
        toast.success("Cover letter deleted successfully");
        deleteModal.closeModal();
        setCoverLetters((prev) =>
          prev.filter((c) => c.id !== deletecoverletterId)
        );
      } catch (error) {
        console.error("Error deleting cover letter:", error);
        toast.error("Failed to delete cover letter");
      }
    }
  };

  const handleCreate = () => {
    setShowLoader(true);
    setTimeout(() => {
      router.push("/dashboard/cv-builder");
    }, 1500);
  };

  return (
    <div className="app-light-bg rounded-xl container mx-auto p-4 max-w-7xl overflow-y-hidden">
      {showLoader && <FullScreenLoader />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-h2 text-brand">My Cover Letters</h2>
        <Button onClick={handleCreate} icon={Plus}>
          Create New Cover Letter
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 min-w-[900px]">
        {/* Header Row */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="grid grid-cols-5 gap-4 px-6 py-4 text-p text-brand-light uppercase tracking-wide">
            <div className="text-center">Sr. No.</div>
            <div>Cover Letter Title</div>
            <div className="text-center">Modified</div>
            <div className="text-center">Created</div>
            <div className="text-center">Actions</div>
          </div>
        </div>

        {/* Body */}
        <div
          className="max-h-96 overflow-y-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 #f1f5f9" }}
        >
          {coverletters.length > 0 ? (
            coverletters.map((cv, index) => (
              <div
                key={cv.id}
                className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 items-center"
              >
                <div className="text-p text-brand-light text-center">
                  {index + 1}
                </div>

                <div className="text-p text-brand truncate">
                  {cv.cover_letter_title || "Untitled"}
                </div>

                <div className="text-p text-center">
                  {formatDaysAgo(cv.updated_at)}
                </div>

                <div className="text-p text-center">
                  {formatDaysAgo(cv.created_at)}
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(cv.id)}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setDeletecoverletterId(cv.id);
                      deleteModal.openModal();
                    }}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDownload(cv.id)}
                    className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-all"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-500">
              No cover letters found. Create your first one to get started.
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.closeModal}
        onConfirm={handleDeleteCvLetter}
        title="Delete Cover Letter"
        message="Are you sure you want to delete this cover letter? This action cannot be undone."
        confirmText="Delete"
        type="danger"
        icon={Trash}
      />
    </div>
  );
};

export default MyCvLetter;
