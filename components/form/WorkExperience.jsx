import React, { useContext, useState, useEffect, useRef } from "react";
import { ResumeContext } from "../context/ResumeContext";
import FormButton from "./FormButton";
import { AlertCircle, X, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WorkExperience = () => {
  const { resumeData, setResumeData, resumeStrength, setResumeStrength } =
    useContext(ResumeContext);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
  const [error, setError] = useState("");
  const [summaries, setSummaries] = useState([]);
  const [selectedSummaries, setSelectedSummaries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [expandedExperiences, setExpandedExperiences] = useState([]);
  const [popupType, setPopupType] = useState(""); // Track popup type
  const [descriptions, setDescriptions] = useState([]); // Stores descriptions
  const [keyAchievements, setKeyAchievements] = useState([]); // Stores key achievements

  const [selectedDescriptions, setSelectedDescriptions] = useState([]); // Stores selected descriptions
  const [selectedKeyAchievements, setSelectedKeyAchievements] = useState([]); // Stores selected key achievements

  const token = localStorage.getItem("token");
  const router = useRouter();
  const { improve } = router.query;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );
  const handleMonthChange = (e, index, field) => {
    const newWorkExperience = [...resumeData.workExperience];
    const currentDate = newWorkExperience[index][field] || "Jan,2024";
    const [_, year] = currentDate.split(",");
    newWorkExperience[index][field] = `${e.target.value},${year || ""}`;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const handleYearChange = (e, index, field) => {
    const newWorkExperience = [...resumeData.workExperience];
    const currentDate = newWorkExperience[index][field] || "Jan,2024";
    const [month, _] = currentDate.split(",");
    newWorkExperience[index][field] = `${month || ""},${e.target.value}`;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const handlePresentToggle = (index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index].endYear = newWorkExperience[index].endYear === "Present" ? "" : "Present";
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const handleWorkExperience = (e, index) => {
    const { name, value } = e.target;
    const newWorkExperience = [...resumeData.workExperience];
    if (name === "KeyAchievements") {
      newWorkExperience[index][name] = value
        .split("\n")
        .filter((item) => item.trim() !== "");
    } else {
      newWorkExperience[index][name] = value;
    }
    setResumeData({ ...resumeData, workExperience: newWorkExperience });

    if (name === "position") {
      fetchJobTitles(value);
    } else if (name === "company") {
      fetchCompanies(value);
    } else if (name === "location") {
      fetchLocations(value);
    }
  };

  const fetchLocations = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setLocationSuggestions([]);
      return;
    }

    setIsLoading((prev) => ({ ...prev, location: true }));
    try {
      const response = await fetch(
        `https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${encodeURIComponent(
          keyword
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        const locations = data.data.location_names.map((item) => item);
        setLocationSuggestions(locations);
        setShowLocationDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
    setIsLoading((prev) => ({ ...prev, location: false }));
  };

  const fetchJobTitles = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setJobTitleSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/user/job-title?job_title_keyword=${encodeURIComponent(
          keyword
        )}`
      );
      if (response.data && response.data.data) {
        setJobTitleSuggestions(response.data.data);
        setShowJobTitleDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching job titles:", error);
    }
  };

  const fetchCompanies = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setCompanySuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/compnay-list?company_keyword=${encodeURIComponent(
          keyword
        )}`
      );
      if (response.data && response.data.data) {
        setCompanySuggestions(response.data.data);
        setShowCompanyDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleLocationSelect = (location, index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index].location = location;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
    setLocationSuggestions([]);
    setShowLocationDropdown(false);
  };

  const handleJobTitleSelect = (jobTitle, index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index].position = jobTitle;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
    setJobTitleSuggestions([]);
    setShowJobTitleDropdown(false);
  };

  const handleCompanySelect = (company, index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index].company = company;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
    setCompanySuggestions([]);
    setShowCompanyDropdown(false);
  };

  const handleDescriptionChange = (value, index) => {
    handleWorkExperience({ target: { name: "description", value } }, index);
  };

  const handleAIAssistDescription = async (index) => {
    // setLoadingStates((prev) => ({ ...prev, [index]: true }));
    setLoadingStates((prev) => ({
      ...prev,
      [`description_${index}`]: true, // ✅ Separate loading state for description
    }));
    setError("");

    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-profexp-summery-data",
        {
          key: "professional_experience",
          keyword:
            "Generate multiple professional summaries and descriptions for professional experience",
          content: resumeData.workExperience[index].position,
          company_name: resumeData.workExperience[index].company,
          job_title: resumeData.workExperience[index].position,
          location: resumeData.workExperience[index].location,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setDescriptions(
        response.data.data.resume_analysis.professional_summaries
      ); // ✅ Store in descriptions state
      setPopupIndex(index);
      setPopupType("description");
      setShowPopup(true);
    } catch (err) {
      setError(err.message);
    } finally {
      // setLoadingStates((prev) => ({ ...prev, [index]: false }));
      setLoadingStates((prev) => ({
        ...prev,
        [`description_${index}`]: false, // ✅ Reset only description button
      }));
    }
  };

  const handleAIAssistKey = async (index) => {
    setLoadingStates((prev) => ({
      ...prev,
      [`key_${index}`]: true, // ✅ Separate loading state for key achievements
    }));
    setError("");

    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-profexp-key-data",
        {
          key: "professional_experience",
          keyword:
            "Generate professional summary and Checklist of professional experience in manner of content and information",
          content: resumeData.workExperience[index].position,
          company_name: resumeData.workExperience[index].company,
          job_title: resumeData.workExperience[index].position,
          location: resumeData.workExperience[index].location,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setKeyAchievements(response.data.data.resume_analysis.responsibilities); // ✅ Store in keyAchievements state
      setPopupIndex(index);
      setPopupType("keyAchievements");
      setShowPopup(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`key_${index}`]: false, // ✅ Reset only key achievements button
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
    const newWorkExperience = [...resumeData.workExperience];

    if (popupType === "description") {
      newWorkExperience[index].description = selectedDescriptions.join(" ");
    } else {
      newWorkExperience[index].KeyAchievements = selectedKeyAchievements;
    }

    setResumeData({
      ...resumeData,
      workExperience: newWorkExperience,
    });

    setShowPopup(false);
  };

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      workExperience: [
        ...resumeData.workExperience,
        {
          company: "",
          position: "",
          startYear: "",
          endYear: "",
          location: "",
          description: "",
          KeyAchievements: [],
        },
      ],
    });
    setExpandedExperiences([...expandedExperiences, true]);
  };

  const removeWorkExperience = (index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience.splice(index, 1);
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
    const newExpandedExperiences = [...expandedExperiences];
    newExpandedExperiences.splice(index, 1);
    setExpandedExperiences(newExpandedExperiences);
  };

  const hasErrors = (index, field) => {
    const workStrength = resumeStrength?.work_experience_strenght?.[index];
    return (
      workStrength &&
      Array.isArray(workStrength[field]) &&
      workStrength[field].length > 0
    );
  };

  const getErrorMessages = (index, field) => {
    const workStrength = resumeStrength?.work_experience_strenght?.[index];
    return workStrength && Array.isArray(workStrength[field])
      ? workStrength[field]
      : [];
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (e.key === "Enter" && value.length > 2) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-profexp-data",
          {
            key: "professional_experience",
            keyword: value,
            content: value,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setSearchResults(
          response.data.data.resume_analysis.responsibilities || []
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSearchResultSelect = (result, index) => {
    const currentDescription =
      resumeData.workExperience[index].description || "";
    const newDescription = currentDescription
      ? `${currentDescription}\n${result}`
      : result;
    handleDescriptionChange(newDescription, index);
    setSearchValue("");
    setSearchResults([]);
  };

  const toggleExperience = (index) => {
    setExpandedExperiences((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const handleAutoFixDescription = async (e, index, content) => {
    e.preventDefault(); // Stops form submission (only needed if inside a form)
    e.stopPropagation(); // Stops event bubbling

    setLoadingStates((prev) => ({
      ...prev,
      [`description_${index}`]: true,
    }));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token is missing");
        return;
      }

      const response = await fetch(
        "https://api.sentryspot.co.uk/api/jobseeker/ai-expsummery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            key: "experience description",
            keyword: "auto improve",
            content: content.description || "",
            company_name: content.company || "",
            job_title: content.position,
            location: content.location || "",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const updatedDescription =
        data?.data?.resume_analysis?.professional_summary;

      if (updatedDescription) {
        // Update work experience description
        setResumeData((prev) => ({
          ...prev,
          workExperience: prev.workExperience.map((exp, i) =>
            i === index ? { ...exp, description: updatedDescription } : exp
          ),
        }));

        // Clear any errors in resumeStrength
        setResumeStrength((prev) => ({
          ...prev,
          work_experience_strenght: prev.work_experience_strenght.map(
            (strength, i) =>
              i === index ? { ...strength, descriptionDetails: [] } : strength
          ),
        }));

        // Close the tooltip
        setActiveTooltip(null);

        toast.success("Description updated successfully");
      } else {
        toast.error("Failed to auto-fix description");
      }
    } catch (error) {
      console.error(
        `Error auto-fixing experience description at index ${index}:`,
        error
      );
      toast.error("An error occurred while processing your request");
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`description_${index}`]: false,
      }));
    }
  };

  const handleToggleFresher = (e) => {
    e.preventDefault();
    setResumeData((prevData) => ({
      ...prevData,
      is_fresher: !prevData.is_fresher,
      workExperience: prevData.workExperience,
    }));
  };

  const removeWork = (index) => {
    const newworkExperience = [...(resumeData.workExperience || [])];
    newworkExperience.splice(index, 1);
    setResumeData({ ...resumeData, workExperience: newworkExperience });
    setExpandedExperiences(
      expandedExperiences
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i))
    );
  };

  return (
    <div className="flex-col gap-3 w-full mt-10 px-10">
      <h2 className="input-title text-white text-3xl mb-6">Work Experience</h2>
      <div className="flex items-center space-x-2 mb-4">
        <label className="text-lg text-white font-medium">
          Are you a Fresher?
        </label>
        <button
          className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
            resumeData.is_fresher ? "bg-green-500" : "bg-gray-400"
          }`}
          onClick={handleToggleFresher}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${
              resumeData.is_fresher ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {!resumeData.is_fresher &&
        resumeData.workExperience.map((experience, index) => (
          <div key={index} className="mb-6 rounded-lg overflow-hidden">
            <div
              className="flex justify-between items-center p-4 cursor-pointer bg-white"
              onClick={() => toggleExperience(index)}
            >
              <h3 className="text-black text-xl font-semibold">
                {experience.position ||
                  experience.company ||
                  `Work Experience ${index + 1}`}
              </h3>
              <div className="flex items-center">
                {/* <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeWorkExperience(index)
                }}
                className="mr-4 text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button> */}
                {expandedExperiences[index] ? (
                  <ChevronUp className="w-6 h-6 text-black" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-black" />
                )}
              </div>
            </div>

            {expandedExperiences[index] && (
              <div className="p-4 bg-white">
                <div className="relative mb-4">
                  <label className="text-black">Company Name</label>
                  <input
                    type="text"
                    placeholder="Company"
                    name="company"
                    className={`w-full other-input border ${
                      improve && hasErrors(index, "company")
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    value={experience.company}
                    onChange={(e) => handleWorkExperience(e, index)}
                  />
                  {showCompanyDropdown && companySuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {companySuggestions.map((company, i) => (
                        <div
                          key={i}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleCompanySelect(company.name, index)
                          }
                        >
                          {company.name}
                        </div>
                      ))}
                    </div>
                  )}
                  {improve && hasErrors(index, "company") && (
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `company-${index}`
                            ? null
                            : `company-${index}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </button>
                  )}
                  {activeTooltip === `company-${index}` && (
                    <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-black">
                              Company Suggestions
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
                        {getErrorMessages(index, "company").map((msg, i) => (
                          <div
                            key={i}
                            className="flex items-start space-x-3 mb-3 last:mb-0"
                          >
                            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                            <p className="text-black text-sm">{msg}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative mb-4">
                  <label className="text-black">Job Title</label>
                  <input
                    type="text"
                    placeholder="Position"
                    name="position"
                    className={`w-full other-input border ${
                      improve && hasErrors(index, "position")
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    value={experience.position}
                    onChange={(e) => handleWorkExperience(e, index)}
                  />
                  {showJobTitleDropdown && jobTitleSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {jobTitleSuggestions.map((jobTitle, i) => (
                        <div
                          key={i}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleJobTitleSelect(jobTitle.name, index)
                          }
                        >
                          {jobTitle.name}
                        </div>
                      ))}
                    </div>
                  )}
                  {improve && hasErrors(index, "position") && (
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `position-${index}`
                            ? null
                            : `position-${index}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </button>
                  )}
                  {activeTooltip === `position-${index}` && (
                    <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-black">
                              Position Suggestions
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
                        {getErrorMessages(index, "position").map((msg, i) => (
                          <div
                            key={i}
                            className="flex items-start space-x-3 mb-3 last:mb-0"
                          >
                            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                            <p className="text-black text-sm">{msg}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="">
                  <label className="text-black">Start Date</label>
                  <div className="flex-wrap-gap-2">
                    <select
                      className={`other-input border flex-1 ${
                        improve && hasErrors(index, "startYear")
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      value={(experience.startYear || "Jan,2024").split(",")[0]}
                      onChange={(e) => handleMonthChange(e, index, "startYear")}
                    >
                      {months.map((month, idx) => (
                        <option key={idx} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      className={`other-input border flex-1 ${
                        improve && hasErrors(index, "startYear")
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      value={(experience.startYear || "Jan,2024").split(",")[1]}
                      onChange={(e) => handleYearChange(e, index, "startYear")}
                    >
                      {years.map((year, idx) => (
                        <option key={idx} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                   <label className="text-black">End Date</label>
                  <div className="flex-wrap-gap-2 flex items-center gap-2 ">
                    <select
                      className={`other-input border flex-1 ${
                        improve && hasErrors(index, "endYear")
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      value={
                        experience.endYear === "Present"
                          ? ""
                          : (experience.endYear || "Dec,2024").split(",")[0]
                      }
                      onChange={(e) => handleMonthChange(e, index, "endYear")}
                      disabled={experience.endYear === "Present"}
                    >
                      {months.map((month, idx) => (
                        <option key={idx} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      className={`other-input border flex-1 ${
                        improve && hasErrors(index, "endYear")
                          ? "border-red-500"
                          : "border-black"
                      }`}
                      value={
                        experience.endYear === "Present"
                          ? ""
                          : (experience.endYear || "Dec,2024").split(",")[1]
                      }
                      onChange={(e) => handleYearChange(e, index, "endYear")}
                      disabled={experience.endYear === "Present"}
                    >
                      {years.map((year, idx) => (
                        <option key={idx} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <label className="flex flex-1 items-center gap-1 other-input text-xl">
                      <input
                        type="checkbox"
                        checked={experience.endYear === "Present"}
                        onChange={() => handlePresentToggle(index)}
                        className="w-6 h-6"
                      />
                      Present
                    </label>
                  </div>
                </div>
                <div className="relative mb-4">
                  <label className="mt-2 text-black">Location</label>
                  <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    className={`w-full other-input border ${
                      improve && hasErrors(index, "location")
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    value={experience.location}
                    onChange={(e) => handleWorkExperience(e, index)}
                  />
                  {isLoading.location && (
                    <div className="absolute right-3 top-1/2 transform translate-y-1">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                    </div>
                  )}
                  {showLocationDropdown && locationSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {locationSuggestions.map((location, i) => (
                        <div
                          key={i}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleLocationSelect(location, index)}
                        >
                          {location}
                        </div>
                      ))}
                    </div>
                  )}
                  {improve && hasErrors(index, "location") && (
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 translate-y-1 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `location-${index}`
                            ? null
                            : `location-${index}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </button>
                  )}
                  {activeTooltip === `location-${index}` && (
                    <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-black">
                              Location Suggestions
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
                        {getErrorMessages(index, "location").map((msg, i) => (
                          <div
                            key={i}
                            className="flex items-start space-x-3 mb-3 last:mb-0"
                          >
                            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                            <p className="text-black text-sm">{msg}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative mb-4">
                  <div className="flex justify-between mb-2">
                    <label className="text-black">Description</label>

                    <button
                      type="button"
                      className="border bg-black text-white px-3 rounded-3xl"
                      onClick={() => {
                        if (experience?.position) {
                          handleAIAssistDescription(index, experience);
                        } else {
                          toast.error("Job Title is required");
                        }
                      }}
                      disabled={loadingStates[`description_${index}`]} // Check loading state per button
                    >
                      {loadingStates[`description_${index}`]
                        ? "Loading..."
                        : "+ Smart Assist"}
                    </button>
                  </div>
                  <ReactQuill
                    placeholder="Description"
                    value={experience.description}
                    onChange={(value) => handleDescriptionChange(value, index)}
                    className={`bg-white rounded-md ${
                      improve && hasErrors(index, "descriptionDetails")
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    theme="snow"
                    modules={{
                      toolbar: [["bold", "italic", "underline"], ["clean"]],
                    }}
                  />
                  {improve && hasErrors(index, "descriptionDetails") && (
                    <button
                      type="button"
                      className="absolute right-2 top-12 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `description-${index}`
                            ? null
                            : `description-${index}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </button>
                  )}
                  {activeTooltip === `description-${index}` && (
                    <div className="absolute z-50 right-0 top-[50px] w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-black">
                              Description Suggestions
                            </span>
                          </div>

                          {/* <button
                            onClick={() =>
                              handleAutoFixDescription(index, experience)
                            }
                            onMouseDown={() => {
                              if (!experience?.position) {
                                toast.error("Job Title is required");
                              }
                            }}
                            className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={
                              loadingStates[`description_${index}`] ||
                              !experience?.position
                            }
                          >
                            {loadingStates[`description_${index}`]
                              ? "Fixing..."
                              : "Auto Fix"}
                          </button> */}
                          <button
                            type="button" // Ensure it's NOT a submit button
                            onClick={(e) =>
                              handleAutoFixDescription(e, index, experience)
                            }
                            onMouseDown={() => {
                              if (!experience?.position) {
                                toast.error("Job Title is required");
                              }
                            }}
                            className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={
                              loadingStates[`description_${index}`] ||
                              !experience?.position
                            }
                          >
                            {loadingStates[`description_${index}`]
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
                        {getErrorMessages(index, "descriptionDetails").map(
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

                <div className="relative mb-4">
                  <div className="flex justify-between mb-2">
                    <label className="text-black">Key Achievements</label>
                    <button
                      type="button"
                      className="border bg-black text-white px-3 rounded-3xl"
                      // onClick={() => handleAIAssistKey(index)}
                      onClick={() => {
                        if (experience?.position) {
                          handleAIAssistKey(index, experience);
                        } else {
                          toast.error("Job Title is required");
                        }
                      }}
                      disabled={loadingStates[`key_${index}`]} // Check loading state per button
                    >
                      {loadingStates[`key_${index}`]
                        ? "Loading..."
                        : "+ Key Assist"}
                    </button>
                  </div>
                  <textarea
                    placeholder="Key Achievements (one per line)"
                    name="KeyAchievements"
                    className={`w-full other-input border ${
                      improve && hasErrors(index, "KeyAchievements")
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    value={experience.KeyAchievements.join("\n")}
                    onChange={(e) => handleWorkExperience(e, index)}
                    rows={4}
                  />
                  {improve && hasErrors(index, "KeyAchievements") && (
                    <button
                      type="button"
                      className="absolute right-2 top-8 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === `achievements-${index}`
                            ? null
                            : `achievements-${index}`
                        )
                      }
                    >
                      <AlertCircle className="w-5 h-5" />
                    </button>
                  )}
                  {activeTooltip === `achievements-${index}` && (
                    <div className="absolute z-50 top-30px right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-black">
                              Achievement Suggestions
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
                        {getErrorMessages(index, "KeyAchievements").map(
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

               
                <button
                  onClick={() => removeWork(index)}
                  className="bg-red-500 w-full text-white px-4 py-2 rounded mt-4"
                  type="button"
                >
                  Remove Work Experience
                </button>
              </div>
            )}
          </div>
        ))}

      <FormButton
        size={resumeData.workExperience.length}
        add={addWorkExperience}
        remove={removeWorkExperience}
      />

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

      {searchResults.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 bg-white rounded-lg shadow-xl mt-2">
          {searchResults.map((result, idx) => (
            <div
              key={idx}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSearchResultSelect(result, popupIndex)}
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkExperience;
