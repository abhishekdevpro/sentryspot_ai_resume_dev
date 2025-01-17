

import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { ResumeContext } from "../../components/context/ResumeContext";
import { Download, Edit, Trash, Plus } from "lucide-react";
import Link from "next/link";

const MyResume = () => {
  const { setResumeData } = useContext(ResumeContext);
  const [resumes, setResumes] = useState([]);
  const [deleteresumeid, setDeleteresumeid] = useState(null);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [newResumeTitle, setNewResumeTitle] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentResume, setCurrentResume] = useState(null);
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

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

  const handleEdit = (resumeId) => {
    setResumeId(resumeId);
    router.push(`/dashboard/aibuilder/${resumeId}`);
  };

  const handleDownload = async (resumeId) => {
    setResumeId(resumeId);
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

  const handleDeleteResume = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete(
          `https://api.sentryspot.co.uk/api/jobseeker/resume-list/${deleteresumeid}`,
          {
            headers: { Authorization: token },
          }
        );
        toast.success("Resume deleted successfully");
        setisDeleteModalOpen(false);
        setResumes(
          resumes.filter((resume) => resume.resume_id !== deleteresumeid)
        );
      } catch (error) {
        console.error("Error deleting resume:", error);
        toast.error("Failed to delete resume");
      }
    }
  };

  const handleOpenEditModal = (resume) => {
    setCurrentResume(resume);
    setNewResumeTitle(resume.resume_title || "");
    setIsEditModalOpen(true);
  };

  const handleUpdateResumeTitle = () => {
    const token = localStorage.getItem("token");
    if (token && currentResume) {
      axios
        .put(
          `https://api.sentryspot.co.uk/api/jobseeker/resume-details/${currentResume.resume_id}`,
          { resume_title: newResumeTitle },
          { headers: { Authorization: token } }
        )
        .then(() => {
          toast.success("Resume title updated successfully.");
          setIsEditModalOpen(false);
          setResumes((prevResumes) =>
            prevResumes.map((resume) =>
              resume.resume_id === currentResume.resume_id
                ? { ...resume, resume_title: newResumeTitle }
                : resume
            )
          );
        })
        .catch((error) => {
          console.error("Error updating resume title:", error);
          toast.error("Failed to update resume title.");
        });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* New Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Resumes</h1>
        <Link href={"/"}>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm">
            <Plus className="w-5 h-5 mr-2" />
            Create New Resume
          </button>
        </Link>
      </div>

      {/* <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Sr. no.
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  My Resume
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Modification
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Strength
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Abroadium ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {resumes.length > 0 ? (
                resumes.map((resume, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}.
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-900">
                          {resume.resume_title || "ABC"}
                        </span>
                        <button
                          onClick={() => handleOpenEditModal(resume)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          🖍
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(resume.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(resume.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        {resume.resume_strenght_details?.resume_strenght ? (
                          <span
                            className={`px-3 py-1 rounded-full text-lg font-semibold ${
                              resume.resume_strenght_details.resume_strenght >
                              60
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {resume.resume_strenght_details.resume_strenght}
                          </span>
                        ) : (
                          <span className="text-gray-500">_</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700">
                          Include your Abroadium Id
                        </span>
                        <button
                          role="switch"
                          aria-checked={isChecked}
                          onClick={handleToggle}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                            isChecked ? "bg-blue-600" : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                              isChecked ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEdit(resume.resume_id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setisDeleteModalOpen(true)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDownload(resume.resume_id)}
                          className="text-green-600 hover:text-green-800 transition-colors duration-200"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Please Upload Resume.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div> */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
  <div className="overflow-x-auto">
    <div className="max-h-96 overflow-y-scroll"> {/* Added container for vertical scrolling */}
      <table className="w-full min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Sr. no.
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              My Resume
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Modification
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Strength
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Abroadium ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {resumes.length > 0 ? (
            resumes.map((resume, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}.
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900">
                      {resume.resume_title || "ABC"}
                    </span>
                    <button
                      onClick={() => handleOpenEditModal(resume)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      🖍
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(resume.updated_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(resume.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    {resume.resume_strenght_details?.resume_strenght ? (
                      <span
                        className={`px-3 py-1 rounded-full text-lg font-semibold ${
                          resume.resume_strenght_details.resume_strenght > 60
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {resume.resume_strenght_details.resume_strenght}
                      </span>
                    ) : (
                      <span className="text-gray-500">_</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">
                      Include your Abroadium Id
                    </span>
                    <button
                      role="switch"
                      aria-checked={isChecked}
                      onClick={handleToggle}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        isChecked ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                          isChecked ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleEdit(resume.resume_id)}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setisDeleteModalOpen(true)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDownload(resume.resume_id)}
                      className="text-green-600 hover:text-green-800 transition-colors duration-200"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                Please Upload Resume.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>


      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Are you sure you want to delete this resume?
            </h2>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setisDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteResume}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Edit Resume Title
            </h2>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={newResumeTitle}
              onChange={(e) => setNewResumeTitle(e.target.value)}
              placeholder="Enter new resume title"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateResumeTitle}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyResume;
