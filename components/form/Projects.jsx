"use client";

import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { ResumeContext } from "../context/ResumeContext";
import { ChevronDown, ChevronUp, AlertCircle, X } from "lucide-react";
import axios from "axios";
import FormButton from "./FormButton";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Projects = () => {
  const { resumeData, setResumeData, resumeStrength, setResumeStrength } =
    useContext(ResumeContext);
  const [loadingStates, setLoadingStates] = useState({});
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);
  const [expandedProjects, setExpandedProjects] = useState([]);
  const [popupType, setPopupType] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const [keyAchievements, setKeyAchievements] = useState([]);
  const [selectedDescriptions, setSelectedDescriptions] = useState([]);
  const [selectedKeyAchievements, setSelectedKeyAchievements] = useState([]);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const token = localStorage.getItem("token");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from({ length: 40 }, (_, index) => 2000 + index);
  const router = useRouter();
  const { improve } = router.query;

  const handleProjects = (e, index) => {
    const newProjects = [...resumeData.projects];
    newProjects[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, projects: newProjects });
  };
  const handlePresentToggle = (index) => {
    const newProjects = [...resumeData.projects];
    const isPresent = newProjects[index].endYear === "Present";
  
    newProjects[index].endMonth = isPresent ? "" : newProjects[index].endMonth;
    newProjects[index].endYear = isPresent ? "" : "Present";
  
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const handleKeyAchievement = (e, projectIndex) => {
    // const newProjects = [...resumeData.projects]
    // newProjects[projectIndex].keyAchievements = e.target.value
    // setResumeData({ ...resumeData, projects: newProjects })
    const newProjects = [...resumeData.projects];
    const achievements = e.target.value
      .split("\n")
      .filter((item) => item.trim());
    newProjects[projectIndex].keyAchievements = achievements;
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const addProjects = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...(resumeData.projects || []),
        {
          title: "",
          link: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          startMonth: "",
          endYear: "",
          endMonth: "",
          name: "",
        },
      ],
    });
    setExpandedProjects([...expandedProjects, resumeData.projects.length]);
  };

  const removeProjects = (index) => {
    const newProjects = [...(resumeData.projects || [])];
    newProjects.splice(index, 1);
    setResumeData({ ...resumeData, projects: newProjects });
    setExpandedProjects(
      expandedProjects
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i))
    );
  };

  const toggleProjectExpansion = (index, e) => {
    e.preventDefault(); // Prevent the default button behavior
    setExpandedProjects((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleAIAssistKey = async (index) => {
    setLoadingStates((prev) => ({
      ...prev,
      [`key_${index}`]: true,
    }));
    setError("");

    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-project-key-data",
        {
          key: "professional_experience",
          keyword:
            "Generate professional summary and Checklist of professional experience in manner of content and information",
          content:
            resumeData.projects[index].description || "Project description",
          company_name: resumeData.projects[index].name || "N/A",
          job_title: resumeData.projects[index].po || "Project",
          link: resumeData.projects[index].link || "N/A",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setKeyAchievements(response.data.data.resume_analysis.responsibilities);
      setPopupIndex(index);
      setPopupType("keyAchievements");
      setShowPopup(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`key_${index}`]: false,
      }));
    }
  };

  const handleSummarySelect = (item) => {
    if (popupType === "description") {
      setSelectedDescriptions((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    } else {
      setSelectedKeyAchievements((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    }
  };

  const handleSaveSelectedSummary = (index, e) => {
    e.preventDefault();
    const newProjects = [...resumeData.projects];

    if (popupType === "description") {
      newProjects[index].description = selectedDescriptions.join(" ");
    } else {
      newProjects[index].keyAchievements = selectedKeyAchievements;
    }

    setResumeData({
      ...resumeData,
      projects: newProjects,
    });

    setShowPopup(false);
  };
  const hasErrors = (index, field) => {
    const workStrength = resumeStrength?.project_strenght?.[index];
    return (
      workStrength &&
      Array.isArray(workStrength[field]) &&
      workStrength[field].length > 0
    );
  };
  const handleAutoFixDescription = async (e, projectIndex, content) => {
    if (e) {
      e.preventDefault(); // Stops the form submission (only needed if inside a form)
      e.stopPropagation(); // Prevents event bubbling
    }

    setLoadingStates((prev) => ({
      ...prev,
      [`description_${projectIndex}`]: true,
    }));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token is missing");
        return;
      }

      const response = await fetch(
        "https://api.sentryspot.co.uk/api/jobseeker/ai-prosummery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            key: "project description",
            keyword: "auto improve",
            content: resumeData.position || "",
            company_name: content.name || "",
            job_title: resumeData.position || "",
            link: content.link || "",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const updatedDescription = data?.data?.resume_analysis?.project_summary;

      if (updatedDescription) {
        setResumeData((prev) => ({
          ...prev,
          projects: prev.projects.map((proj, i) =>
            i === projectIndex
              ? { ...proj, description: updatedDescription }
              : proj
          ),
        }));

        setResumeStrength((prev) => ({
          ...prev,
          project_strenght: prev.project_strenght.map((strength, i) =>
            i === projectIndex ? { ...strength, description: [] } : strength
          ),
        }));

        setActiveTooltip(null);
        toast.success("Description updated successfully");
      } else {
        toast.error("Failed to auto-fix description");
      }
    } catch (error) {
      console.error(
        `Error auto-fixing project description at index ${projectIndex}:`,
        error
      );
      console.log(resumeData.position, ">>>>>position");
      toast.error("An error occurred while processing your request");
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`description_${projectIndex}`]: false,
      }));
    }
  };

  const getErrorMessages = (index, field) => {
    const workStrength = resumeStrength?.project_strenght?.[index];
    return workStrength && Array.isArray(workStrength[field])
      ? workStrength[field]
      : [];
  };
  const handleAIAssistDescription = async (projectIndex) => {
    setLoadingStates((prev) => ({
      ...prev,
      [`description_${projectIndex}`]: true,
    }));
    setError("");

    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-project-summery-data",
        {
          key: "professional_experience",
          keyword:
            "Generate multiple professional summaries and descriptions for professional experience",
          content: resumeData?.position || "Project description",
          company_name: resumeData.projects[projectIndex].name || "N/A",
          job_title: resumeData?.position || "Project",
          link: resumeData.projects[projectIndex].link || "N/A",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setDescriptions(response.data.data.resume_analysis.project_summaries);
      setPopupIndex(projectIndex);
      setPopupType("description");
      setShowPopup(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`description_${projectIndex}`]: false,
      }));
    }
  };
  return (
    <div className="flex-col-gap-3 w-full mt-10 px-10">
      <h2 className="input-title text-white text-3xl">Projects</h2>
      {resumeData.projects && resumeData.projects.length > 0 ? (
        resumeData.projects.map((project, projectIndex) => (
          <div
            key={projectIndex}
            className="f-col mt-4 mb-4 border border-gray-300 bg-white rounded-lg p-4"
          >
            <div className="flex  justify-between items-center mb-2">
              <h3 className="text-black text-xl font-semibold">
                {project.name || `Project ${projectIndex + 1}`}
              </h3>
              <button
                onClick={(e) => toggleProjectExpansion(projectIndex, e)}
                className="text-black"
                type="button" // Explicitly set the button type
              >
                {expandedProjects.includes(projectIndex) ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </button>
            </div>
            {expandedProjects.includes(projectIndex) && (
              <>
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder="Project Name"
                    name="name"
                    className={`w-full other-input border  ${
                      improve && hasErrors(projectIndex, "name")
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    value={project.name}
                    onChange={(e) => handleProjects(e, projectIndex)}
                  />

                  {improve && hasErrors(projectIndex, "name") && (
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `name-${projectIndex}`
                            ? null
                            : `name-${projectIndex}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </button>
                  )}
                  {activeTooltip === `name-${projectIndex}` && (
                    <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-black">
                              Project Name Suggestion
                            </span>
                          </div>
                          <button
                            onClick={() => setActiveTooltip(null)}
                            className="text-black transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        {getErrorMessages(projectIndex, "name").map(
                          (msg, i) => (
                            <div
                              key={i}
                              className="flex items-start space-x-3 mb-3 last:mb-0"
                            >
                              <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                              <p className="text-black text-sm">{msg}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-between mb-2">
                  <div className="relative ">
                    <label className="text-black">Link </label>
                    <input
                      type="text"
                      placeholder="Link"
                      name="link"
                      className={`w-full other-input border  ${
                        improve && hasErrors(projectIndex, "link")
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      value={project.link}
                      onChange={(e) => handleProjects(e, projectIndex)}
                    />
                    {improve && hasErrors(projectIndex, "link") && (
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                        onClick={() =>
                          setActiveTooltip(
                            activeTooltip === `link-${projectIndex}`
                              ? null
                              : `link-${projectIndex}`
                          )
                        }
                      >
                        <AlertCircle className="w-5 h-5" />
                      </button>
                    )}
                    {activeTooltip === `link-${projectIndex}` && (
                      <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                        <div className="p-4 border-b border-gray-700">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <AlertCircle className="w-5 h-5 text-red-400" />
                              <span className="font-medium text-black">
                                Project Link
                              </span>
                            </div>
                            <button
                              onClick={() => setActiveTooltip(null)}
                              className="text-black transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="p-4">
                          {getErrorMessages(projectIndex, "link").map(
                            (msg, i) => (
                              <div
                                key={i}
                                className="flex items-start space-x-3 mb-3 last:mb-0"
                              >
                                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                                <p className="text-black text-sm">{msg}</p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative mb-4">
                  <div className="flex justify-between mb-2">
                    <label className="text-black">Description</label>
                    <button
                      type="button"
                      className="border bg-black text-white px-3 rounded-3xl"
                      onClick={() => handleAIAssistDescription(projectIndex)}
                      disabled={loadingStates[`description_${projectIndex}`]}
                    >
                      {loadingStates[`description_${projectIndex}`]
                        ? "Loading..."
                        : "+ Smart Assist"}
                    </button>
                  </div>

                  <ReactQuill
                    placeholder="Description"
                    value={project.description}
                    onChange={(value) =>
                      handleProjects(
                        {
                          target: {
                            name: "description",
                            value: value,
                          },
                        },
                        projectIndex
                      )
                    }
                    className={`bg-white rounded-md ${
                      improve && hasErrors(projectIndex, "description")
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    theme="snow"
                    modules={{
                      toolbar: [["bold", "italic", "underline"], ["clean"]],
                    }}
                  />

                  {improve && hasErrors(projectIndex, "description") && (
                    <button
                      type="button"
                      className="absolute right-2 top-12 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `description-${projectIndex}`
                            ? null
                            : `description-${projectIndex}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </button>
                  )}
                  {activeTooltip === `description-${projectIndex}` && (
                    <div className="absolute z-50 right-0 top-[50px] w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-black">
                              Description Suggestions
                            </span>
                          </div>

                          <button
                            type="button" // Prevent form submission if inside a form
                            onClick={(e) =>
                              handleAutoFixDescription(e, projectIndex, project)
                            }
                            onMouseDown={() => {
                              if (!project?.name) {
                                toast.error("Title is required");
                              }
                            }}
                            className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={
                              loadingStates[`description_${projectIndex}`] ||
                              !project?.name
                            }
                          >
                            {loadingStates[`description_${projectIndex}`]
                              ? "Fixing..."
                              : "Auto Fix"}
                          </button>

                          <button
                            onClick={() => setActiveTooltip(null)}
                            className="text-black transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        {getErrorMessages(projectIndex, "description").map(
                          (msg, i) => (
                            <div
                              key={i}
                              className="flex items-start space-x-3 mb-3 last:mb-0"
                            >
                              <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                              <p className="text-black text-sm">{msg}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <div className="flex justify-between mb-2">
                    <label className="text-black">Key Achievements</label>
                    <button
                      type="button"
                      className="border bg-black text-white px-3 rounded-3xl"
                      onClick={() => handleAIAssistKey(projectIndex)}
                      disabled={loadingStates[`key_${projectIndex}`]}
                    >
                      {loadingStates[`key_${projectIndex}`]
                        ? "Loading..."
                        : "+ Smart Assist"}
                    </button>
                  </div>
                  <textarea
                    placeholder="Enter key achievements (one per line)"
                    className="w-full other-input border-black border h-24 max-w-[33rem] p-2 mb-2"
                    value={project.keyAchievements}
                    onChange={(e) => handleKeyAchievement(e, projectIndex)}
                  />
                </div>
                <div className="">
                  <label className="mt-2 text-black">Start Date</label>
                  <div className="flex-wrap-gap-2">
                    <select
                      name="startMonth"
                      className="other-input border-black border flex-1"
                      value={project.startMonth}
                      onChange={(e) => handleProjects(e, projectIndex)}
                    >
                      <option value="">Select Month</option>
                      {months.map((month, idx) => (
                        <option key={idx} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      name="startYear"
                      className="other-input border-black border flex-1"
                      value={project.startYear}
                      onChange={(e) => handleProjects(e, projectIndex)}
                    >
                      <option value="">Select Year</option>
                      {years.map((year, idx) => (
                        <option key={idx} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="mt-2 text-black">End Date</label>
                  <div className="flex-wrap-gap-2">
                    <select
                      name="endMonth"
                      className="other-input border-black border flex-1"
                      value={project.endMonth}
                      onChange={(e) => handleProjects(e, projectIndex)}
                      disabled={project.endYear === "Present"}
                    >
                      <option value="">Select Month</option>
                      {months.map((month, idx) => (
                        <option key={idx} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      name="endYear"
                      className="other-input border-black border flex-1"
                      value={project.endYear}
                      onChange={(e) => handleProjects(e, projectIndex)}
                      disabled={project.endYear === "Present"}
                    >
                      <option value="">Select Year</option>
                      {years.map((year, idx) => (
                        <option key={idx} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <label className="flex flex-1 items-center gap-1 other-input text-xl">
                      <input
                        type="checkbox"
                        checked={project.endYear === "Present"}
                        onChange={() => handlePresentToggle(projectIndex)}
                        className="w-6 h-6"
                      />
                      Present
                    </label>
                  </div>
                </div>
                <button
                  onClick={() => removeProjects(projectIndex)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                  type="button"
                >
                  Remove Project
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-white">
          No projects available. Add a new project to get started.
        </p>
      )}
      {/* <button onClick={addProjects} className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="button">
        Add Project
      </button> */}
      <FormButton
        size={resumeData.projects ? resumeData.projects.length : 0}
        add={addProjects}
        remove={removeProjects}
      />
      {/* {showPopup && (
      
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
            <h3 className="text-xl font-bold mb-4">
              {popupType === "description"
                ? "Select Description"
                : "Select Key Achievements"}
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {(popupType === "description"
                ? descriptions
                : keyAchievements
              ).map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                    {popupType === "description" ? (
                    <input
                      type="radio"
                      name="description" // Ensures only one can be selected
                      checked={selectedDescriptions.includes(item)}
                      onChange={() => setSelectedDescriptions([item])} // Only one selection
                      className="mt-1"
                    />
                  ) : (
                    // Checkbox for key achievements (Multi Select)
                    <input
                      type="checkbox"
                      checked={selectedKeyAchievements.includes(item)}
                      onChange={() => handleSummarySelect(item)}
                      className="mt-1"
                    />
                  )}
                  <input
                    type="checkbox"
                    checked={
                      popupType === "description"
                        ? selectedDescriptions.includes(item)
                        : selectedKeyAchievements.includes(item)
                    }
                    onChange={() => handleSummarySelect(item)}
                    className="mt-1"
                  />
                  <p className="text-gray-800">{item}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={(e) => handleSaveSelectedSummary(popupIndex, e)}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Save Selection
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
            <h3 className="text-xl font-bold mb-4">
              {popupType === "description"
                ? "Select Description"
                : "Select Key Achievements"}
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {(popupType === "description"
                ? descriptions
                : keyAchievements
              ).map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  {/* Radio for description (Single Select) */}
                  {popupType === "description" ? (
                    <input
                      type="radio"
                      name="description" // Ensures only one can be selected
                      checked={selectedDescriptions.includes(item)}
                      onChange={() => setSelectedDescriptions([item])} // Only one selection
                      className="mt-1"
                    />
                  ) : (
                    // Checkbox for key achievements (Multi Select)
                    <input
                      type="checkbox"
                      checked={selectedKeyAchievements.includes(item)}
                      onChange={() => handleSummarySelect(item)}
                      className="mt-1"
                    />
                  )}
                  <p className="text-gray-800">{item}</p>
                </div>
              ))}
            </div>
            <button
              onClick={(e) => handleSaveSelectedSummary(popupIndex, e)}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Save Selection
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-2 ml-2 bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
