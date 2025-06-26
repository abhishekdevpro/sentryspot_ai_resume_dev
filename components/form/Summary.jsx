// import React, { useContext, useState } from "react";
// import axios from "axios";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";
// import { ResumeContext } from "../context/ResumeContext";
// import { AlertCircle, Loader, Loader2, X } from "lucide-react";
// import { useRouter } from "next/router";
// import { toast } from "react-toastify";
// import ErrorPopup from "../utility/ErrorPopUp";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const Summary = () => {
//   const { resumeData, setResumeData, resumeStrength, setResumeStrength } =
//     useContext(ResumeContext);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [summaries, setSummaries] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedSummaryIndex, setSelectedSummaryIndex] = useState(null);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [isAutoFixLoading, setIsAutoFixLoading] = useState(false);
//   const [errorPopup, setErrorPopup] = useState({
//     show: false,
//     message: "",
//   });
//   const router = useRouter();
//   const { id, improve } = router.query;
//   // console.log(resumeStrength.personal_summery_strenght.summery, ">>>>");
//   const hasErrors = () => {
//     return (
//       resumeStrength?.personal_summery_strenght?.suggestions !== null ||
//       resumeStrength?.personal_summery_strenght?.summery !== null
//     );
//   };
//   // console.log(id,"dddd");
//   const getSuggestions = () => {
//     const suggestions = [];
//     if (resumeStrength?.personal_summery_strenght?.suggestions) {
//       suggestions.push(resumeStrength.personal_summery_strenght.suggestions);
//     }
//     if (resumeStrength?.personal_summery_strenght?.summery) {
//       suggestions.push(resumeStrength.personal_summery_strenght.summery);
//     }
//     return suggestions;
//   };

//   const handleAutoFix = async () => {
//     if (!resumeData.summary) return;

//     setIsAutoFixLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "https://api.sentryspot.co.uk/api/jobseeker/ai-summery",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `${token}`,
//           },
//           body: JSON.stringify({
//             key: "summary",
//             keyword: "auto improve",
//             content: resumeData.summary,
//             job_title: resumeData.position,
//           }),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();

//         if (data.data.resume_analysis) {
//           const updatedSummary = data.data.resume_analysis.professional_summary;

//           if (updatedSummary) {
//             setResumeData({
//               ...resumeData,
//               summary: updatedSummary,
//             });

//             // Clear errors
//             if (resumeStrength?.personal_summery_strenght) {
//               const updatedStrength = {
//                 ...resumeStrength,
//                 personal_summery_strenght: {
//                   suggestions: null,
//                   summery: null,
//                 },
//               };
//               setResumeStrength(updatedStrength);
//             }
//             setShowSuggestions(false);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error auto-fixing summary:", error);
//     } finally {
//       setIsAutoFixLoading(false);
//     }
//   };
//   const handleAIAssist = async () => {
//     setLoading(true);
//     setError(null);
//     setSelectedSummaryIndex(null);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `https://api.sentryspot.co.uk/api/jobseeker/ai-resume-summery-data/${id}`,
//         {
//           key: "resumesummery",
//           keyword: `professional summary in manner of description - ${Date.now()}`,
//           content: resumeData.position,
//           file_location: "",
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       if (
//         response.data.status === "success" &&
//         response.data.data?.resume_analysis?.professional_summaries
//       ) {
//         setSummaries(response.data.data.resume_analysis.professional_summaries);
//         setShowPopup(true);
//       } else {
//         setError("Unable to fetch summaries. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error getting AI summaries:", error);
//       setErrorPopup({
//         show: true,
//         message:
//           error.response?.data?.message ||
//           "Your API Limit is Exhausted. Please upgrade your plan.",
//       });
//       // toast.error(error.response?.data?.message || "Limit Exhausted");
//       setError(
//         error.response?.data?.message ||
//           "An error occurred while fetching summaries. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSummarySelect = (index) => {
//     setSelectedSummaryIndex(index);
//   };

//   const handleAddSummary = () => {
//     if (selectedSummaryIndex !== null) {
//       setResumeData({
//         ...resumeData,
//         summary: summaries[selectedSummaryIndex],
//       });
//       setShowPopup(false);
//     }
//   };
//   const checkCharacterCount = (event) => {
//     const unprivilegedEditor = reactQuillRef.current.unprivilegedEditor;
//     if (unprivilegedEditor.getLength() > 280 && event.key !== "Backspace")
//       event.preventDefault();
//   };
//   const handleQuillChange = (content) => {
//     setResumeData({
//       ...resumeData,
//       summary: content,
//     });
//   };

//   return (
//     <div className="flex-col gap-3 w-full md:mt-10 md:px-10">
//       <div className="flex flex-col gap-2">
//         <div className="flex justify-between mb-2 items-center">
//           <div className="flex items-center gap-2">
//             <h2 className="input-title text-white text-3xl">Summary</h2>
//             {improve && hasErrors() && (
//               <button
//                 type="button"
//                 className="text-red-500 hover:text-red-600 transition-colors"
//                 onClick={() => setShowSuggestions(!showSuggestions)}
//                 aria-label="Show suggestions"
//               >
//                 <AlertCircle className="w-6 h-6" />
//               </button>
//             )}
//           </div>
//           <button
//             type="button"
//             className={` bg-black text-white px-3 py-2 rounded-lg ${
//               loading
//                 ? "bg-gray-400 text-white cursor-not-allowed"
//                 : "bg-black text-white hover:bg-gray-800"
//             }`}
//             onClick={() => {
//               if (resumeData?.position) {
//                 handleAIAssist();
//               } else {
//                 toast.error("Job Title is required in Detail Information");
//               }
//             }}
//             disabled={loading}
//           >
//             {loading ? (
//               <span className="flex items-center gap-2">
//                 <Loader />
//                 Loading...
//               </span>
//             ) : (
//               "+ Smart Assist"
//             )}
//           </button>
//         </div>

//         {/* {error && <div className="text-red-500 text-sm mb-2">{error}</div>} */}

//         {/* Suggestions Tooltip */}
//         {showSuggestions && hasErrors() && (
//           <div className="absolute z-50 left-8 mt-10 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
//             <div className="p-4 border-b border-gray-700">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <AlertCircle className="w-5 h-5 text-red-400" />
//                   <span className="font-medium text-black">
//                     Summary Suggestions
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={handleAutoFix}
//                     disabled={isAutoFixLoading}
//                     className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isAutoFixLoading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       "Auto Fix"
//                     )}
//                   </button>
//                   <button
//                     onClick={() => setShowSuggestions(false)}
//                     className="text-black transition-colors"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="p-4">
//               {/* {getSuggestions().map((msg, i) => (
//                 <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
//                   <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
//                   <p className="text-black text-sm">{msg}</p>
//                 </div>
//               ))} */}
//               <ul className="space-y-3">
//                 {resumeStrength.personal_summery_strenght.summery.map(
//                   (msg, i) => (
//                     <li key={i} className="flex items-start space-x-3">
//                       <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></span>
//                       <p className="text-black text-sm">{msg}</p>
//                     </li>
//                   )
//                 )}
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ReactQuill Editor */}
//       <div className="grid-1 w-full">
//         <ReactQuill
//           onKeyDown={checkCharacterCount}
//           placeholder="Enter your professional summary or use Smart Assist to generate one"
//           value={resumeData.summary || ""}
//           onChange={handleQuillChange}
//           className="w-full other-input h-100 border-black border rounded"
//           theme="snow"
//           modules={{
//             toolbar: [["bold", "italic", "underline"], ["clean"]],
//           }}
//         />
//         <div className="text-sm text-gray-500 mt-1 text-right">
//           {/* {resumeData.summary?.length || 0}/500 */}
//         </div>
//       </div>

//       {/* Popup/Modal for AI Summaries */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-[90%] max-w-4xl">
//             <h3 className="text-xl font-bold mb-4">Select a Summary</h3>
//             <div className="space-y-3 max-h-96 overflow-y-auto">
//               {summaries.map((summary, index) => (
//                 <div key={index} className="flex items-start gap-3">
//                   <input
//                     type="radio"
//                     name="summary"
//                     checked={selectedSummaryIndex === index}
//                     onChange={() => handleSummarySelect(index)}
//                     className="mt-1"
//                   />
//                   <p className="text-gray-800">{summary}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 flex justify-end gap-4">
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={handleAddSummary}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
//                 disabled={selectedSummaryIndex === null}
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {errorPopup.show && (
//         <ErrorPopup
//           message={errorPopup.message}
//           onClose={() => setErrorPopup({ show: false, message: "" })}
//         />
//       )}
//     </div>
//   );
// };

// export default Summary;

import React, { useContext, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { ResumeContext } from "../context/ResumeContext";
import { AlertCircle, Loader, Loader2, X } from "lucide-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ErrorPopup from "../utility/ErrorPopUp";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Summary = () => {
  const { resumeData, setResumeData, resumeStrength, setResumeStrength } =
    useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSummaryIndex, setSelectedSummaryIndex] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAutoFixLoading, setIsAutoFixLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState({
    show: false,
    message: "",
  });
  const router = useRouter();
  const { id, improve } = router.query;

  const CHARACTER_LIMIT = 500;

  // Function to get plain text from HTML content
  const getPlainTextLength = (htmlContent) => {
    if (!htmlContent) return 0;
    // Create a temporary div to strip HTML tags
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent.length || tempDiv.innerText.length || 0;
  };

  // Function to truncate HTML content to character limit
  const truncateHtmlContent = (htmlContent, limit) => {
    if (!htmlContent) return "";
    
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    
    if (plainText.length <= limit) return htmlContent;
    
    // If content exceeds limit, truncate the plain text and return
    const truncatedText = plainText.substring(0, limit);
    return truncatedText;
  };

  const hasErrors = () => {
    return (
      resumeStrength?.personal_summery_strenght?.suggestions !== null ||
      resumeStrength?.personal_summery_strenght?.summery !== null
    );
  };

  const getSuggestions = () => {
    const suggestions = [];
    if (resumeStrength?.personal_summery_strenght?.suggestions) {
      suggestions.push(resumeStrength.personal_summery_strenght.suggestions);
    }
    if (resumeStrength?.personal_summery_strenght?.summery) {
      suggestions.push(resumeStrength.personal_summery_strenght.summery);
    }
    return suggestions;
  };

  const handleAutoFix = async () => {
    if (!resumeData.summary) return;

    setIsAutoFixLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://api.sentryspot.co.uk/api/jobseeker/ai-summery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            key: "summary",
            keyword: "auto improve",
            content: resumeData.summary,
            job_title: resumeData.position,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.data.resume_analysis) {
          const updatedSummary = data.data.resume_analysis.professional_summary;

          if (updatedSummary) {
            // Check if the updated summary exceeds character limit
            const plainTextLength = getPlainTextLength(updatedSummary);
            if (plainTextLength > CHARACTER_LIMIT) {
              const truncatedSummary = truncateHtmlContent(updatedSummary, CHARACTER_LIMIT);
              setResumeData({
                ...resumeData,
                summary: truncatedSummary,
              });
            } else {
              setResumeData({
                ...resumeData,
                summary: updatedSummary,
              });
            }

            // Clear errors
            if (resumeStrength?.personal_summery_strenght) {
              const updatedStrength = {
                ...resumeStrength,
                personal_summery_strenght: {
                  suggestions: null,
                  summery: null,
                },
              };
              setResumeStrength(updatedStrength);
            }
            setShowSuggestions(false);
          }
        }
      }
    } catch (error) {
      console.error("Error auto-fixing summary:", error);
    } finally {
      setIsAutoFixLoading(false);
    }
  };

  const handleAIAssist = async () => {
    setLoading(true);
    setError(null);
    setSelectedSummaryIndex(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://api.sentryspot.co.uk/api/jobseeker/ai-resume-summery-data/${id}`,
        {
          key: "resumesummery",
          keyword: `professional summary in manner of description - ${Date.now()}`,
          content: resumeData.position,
          file_location: "",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (
        response.data.status === "success" &&
        response.data.data?.resume_analysis?.professional_summaries
      ) {
        setSummaries(response.data.data.resume_analysis.professional_summaries);
        setShowPopup(true);
      } else {
        setError("Unable to fetch summaries. Please try again.");
      }
    } catch (error) {
      console.error("Error getting AI summaries:", error);
      setErrorPopup({
        show: true,
        message:
          error.response?.data?.message ||
          "Your API Limit is Exhausted. Please upgrade your plan.",
      });
      setError(error.response?.data?.message || "An error occurred while fetching summaries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSummarySelect = (index) => {
    setSelectedSummaryIndex(index);
  };

  const handleAddSummary = () => {
    if (selectedSummaryIndex !== null) {
      const selectedSummary = summaries[selectedSummaryIndex];
      const plainTextLength = getPlainTextLength(selectedSummary);
      
      if (plainTextLength > CHARACTER_LIMIT) {
        const truncatedSummary = truncateHtmlContent(selectedSummary, CHARACTER_LIMIT);
        setResumeData({
          ...resumeData,
          summary: truncatedSummary,
        });
        toast.warning(`Summary was truncated to ${CHARACTER_LIMIT} characters.`);
      } else {
        setResumeData({
          ...resumeData,
          summary: selectedSummary,
        });
      }
      setShowPopup(false);
    }
  };

  const handleQuillChange = (content) => {
    const plainTextLength = getPlainTextLength(content);
    
    if (plainTextLength <= CHARACTER_LIMIT) {
      setResumeData({
        ...resumeData,
        summary: content,
      });
    } else {
      // If content exceeds limit, truncate it
      const truncatedContent = truncateHtmlContent(content, CHARACTER_LIMIT);
      setResumeData({
        ...resumeData,
        summary: truncatedContent,
      });
      toast.warning(`Maximum ${CHARACTER_LIMIT} characters allowed.`);
    }
  };

  const currentCharCount = getPlainTextLength(resumeData.summary);
  const isOverLimit = currentCharCount > CHARACTER_LIMIT;

  return (
    <div className="flex-col gap-3 w-full md:mt-10 md:px-10">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between mb-2 items-center">
          <div className="flex items-center gap-2">
            <h2 className="input-title text-white text-3xl">Summary</h2>
            {improve && hasErrors() && (
              <button
                type="button"
                className="text-red-500 hover:text-red-600 transition-colors"
                onClick={() => setShowSuggestions(!showSuggestions)}
                aria-label="Show suggestions"
              >
                <AlertCircle className="w-6 h-6" />
              </button>
            )}
          </div>
          <button
            type="button"
            className={` bg-black text-white px-3 py-2 rounded-lg ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            onClick={() => {
              if (resumeData?.position) {
                handleAIAssist();
              } else {
                toast.error("Job Title is required in Detail Information");
              }
            }}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader />
                Loading...
              </span>
            ) : (
              "+ Smart Assist"
            )}
          </button>
        </div>

        {/* Suggestions Tooltip */}
        {showSuggestions && hasErrors() && (
          <div className="absolute z-50 left-8 mt-10 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="font-medium text-black">
                    Summary Suggestions
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleAutoFix}
                    disabled={isAutoFixLoading}
                    className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAutoFixLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Auto Fix"
                    )}
                  </button>
                  <button
                    onClick={() => setShowSuggestions(false)}
                    className="text-black transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                {resumeStrength.personal_summery_strenght.summery.map(
                  (msg, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></span>
                      <p className="text-black text-sm">{msg}</p>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ReactQuill Editor */}
      <div className="grid-1 w-full">
        <ReactQuill
          placeholder="Enter your professional summary or use Smart Assist to generate one"
          value={resumeData.summary || ""}
          onChange={handleQuillChange}
          className="w-full other-input h-100 border-black border rounded"
          theme="snow"
          modules={{
            toolbar: [["bold", "italic", "underline"], ["clean"]],
          }}
        />
        <div className={`text-sm mt-1 text-right ${
          isOverLimit ? 'text-red-500' : 'text-gray-500'
        }`}>
          {currentCharCount}/{CHARACTER_LIMIT} characters
          {isOverLimit && (
            <span className="block text-red-500 text-xs">
              Character limit exceeded
            </span>
          )}
        </div>
      </div>

      {/* Popup/Modal for AI Summaries */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-4xl">
            <h3 className="text-xl font-bold mb-4">Select a Summary</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {summaries.map((summary, index) => {
                
                return (
                  <div key={index} className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="summary"
                      checked={selectedSummaryIndex === index}
                      onChange={() => handleSummarySelect(index)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className="text-gray-800">{summary}</p>
                      
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button
                onClick={handleAddSummary}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                disabled={selectedSummaryIndex === null}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {errorPopup.show && (
        <ErrorPopup
          message={errorPopup.message}
          onClose={() => setErrorPopup({ show: false, message: "" })}
        />
      )}
    </div>
  );
};

export default Summary;