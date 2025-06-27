// "use client";

// import { useContext, useState, useEffect } from "react";
// import { CoverLetterContext } from "../../context/CoverLetterContext";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";
// import { Plus, X } from "lucide-react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const IntroductionAndBodyForm = () => {
//   const { coverLetterData, setCoverLetterData } =
//     useContext(CoverLetterContext);
//   const [loadingIndex, setLoadingIndex] = useState(null);
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [popupContent, setPopupContent] = useState("");
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

//   const CHAR_LIMIT = 500; // Set your desired character limit

//   // Add this helper function to strip HTML tags for character counting
//   const stripHtmlTags = (html) => {
//     const tmp = document.createElement("div");
//     tmp.innerHTML = html;
//     return tmp.textContent || tmp.innerText || "";
//   };
//   const truncateHtmlContent = (htmlContent, limit) => {
//     if (!htmlContent) return "";

//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = htmlContent;
//     const plainText = tempDiv.textContent || tempDiv.innerText || "";

//     if (plainText.length <= limit) return htmlContent;

//     // If content exceeds limit, truncate the plain text and return
//     const truncatedText = plainText.substring(0, limit);
//     return truncatedText;
//   };

//   const handleBodyChange = (index, value) => {
//     const plainText = stripHtmlTags(value);

//     if (plainText.length <= CHAR_LIMIT) {
//       setCoverLetterData((prevData) => {
//         const updatedBody = [...prevData.body];
//         updatedBody[index] = value;
//         return { ...prevData, body: updatedBody };
//       });
//     }
//     else{
//       const truncatedValue = truncateHtmlContent(value, CHAR_LIMIT);
//       setCoverLetterData((prevData) => {
//         const updatedBody = [...prevData.body];
//         updatedBody[index] = truncatedValue;
//         return { ...prevData, body: updatedBody };
//       });
//       toast.warn("Description cannot exceed 500 characters");
//     }
//   };

//   const handleAIAssist = async (index) => {
//     setLoadingIndex(index);
//     setActiveIndex(index);
//     setSelectedSuggestionIndex(0); // default to the first suggestion

//     const { personalDetails } = coverLetterData;
//     const { letterDetails } = coverLetterData;

//     let endpoint = "";
//     let payload = {};

//     if (index === 0) {
//       endpoint =
//         "https://api.sentryspot.co.uk/api/jobseeker/aisummery-section1-coverletter";
//       payload = {
//         name: personalDetails.name,
//         target_role: personalDetails.position,
//         company_name: letterDetails.companyName,
//         location: personalDetails.address,
//       };
//     } else if (index === 1) {
//       endpoint =
//         "https://api.sentryspot.co.uk/api/jobseeker/aisummery-section2-coverletter";
//       payload = {
//         target_role: personalDetails.position,
//       };
//     } else if (index === 2) {
//       endpoint =
//         "https://api.sentryspot.co.uk/api/jobseeker/aisummery-section3-coverletter";
//       payload = {
//         name: personalDetails.name,
//         target_role: personalDetails.position,
//         company_name: letterDetails.companyName,
//       };
//     }

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setPopupContent("Unauthorized: No token found.");
//         setPopupVisible(true);
//         setLoadingIndex(null);
//         return;
//       }

//       const response = await axios.post(endpoint, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//       });

//       const data = response.data.data;
//       setPopupContent(
//         data?.cover_letter_analysis?.professional_summaries?.join("\n\n") ||
//           "No content received."
//       );

//       setPopupVisible(true);
//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         "Something went wrong.";
//       setPopupContent(message);
//       setPopupVisible(true);
//       console.error(error);
//     } finally {
//       setLoadingIndex(null);
//     }
//   };

//   // const insertToParagraph = () => {
//   //   if (activeIndex !== null) {
//   //     handleBodyChange(activeIndex, popupContent);
//   //     setPopupVisible(false);
//   //   }
//   // };
//   const insertToParagraph = () => {
//     if (activeIndex !== null && Array.isArray(splitContent)) {
//       const selectedText = splitContent[selectedSuggestionIndex];
//       handleBodyChange(activeIndex, selectedText || "");
//       setPopupVisible(false);
//     }
//   };
//   const splitContent = popupContent
//     .split("\n\n")
//     .filter((s) => s.trim() !== "");

//   return (
//     <div className="p-4 md:p-8 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-white">
//         Cover Letter Sections
//       </h2>

//       {coverLetterData.body.map((paragraph, index) => (
//         <div key={index} className="mb-6">
//           <div className="flex justify-between items-center">
//             <label className="block text-white font-medium mb-2">
//               Paragraph {index + 1}
//             </label>
//             <button
//               onClick={() => handleAIAssist(index)}
//               type="button"
//               className="flex items-center gap-2 p-2 px-4 bg-black text-white rounded-lg text-sm mb-2 hover:bg-gray-800 transition-all duration-300"
//               disabled={loadingIndex === index}
//             >
//               <Plus className="w-5 h-5" />
//               <span>{loadingIndex === index ? "Loading..." : "AI Assist"}</span>
//             </button>
//           </div>

//           <ReactQuill
//             value={paragraph}
//             onChange={(value) => handleBodyChange(index, value)}
//             theme="snow"
//             placeholder={`Write paragraph ${index + 1}`}
//             className="bg-white"
//           />
//         </div>
//       ))}

//       {/* Popup Modal */}
//       {popupVisible && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
//           <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">
//             <button
//               onClick={() => setPopupVisible(false)}
//               className="absolute top-2 right-2 text-black hover:text-red-600"
//             >
//               <X className="w-5 h-5" />
//             </button>
//             <h3 className="text-lg font-semibold mb-4">AI Suggested Content</h3>
//             {splitContent.map((text, idx) => (
//               <label
//                 key={idx}
//                 className="flex items-start gap-2 cursor-pointer"
//               >
//                 <input
//                   type="radio"
//                   name="ai-suggestion"
//                   value={idx}
//                   checked={selectedSuggestionIndex === idx}
//                   onChange={() => setSelectedSuggestionIndex(idx)}
//                   className="mt-1"
//                 />
//                 <span className="whitespace-pre-line">{text}</span>
//               </label>
//             ))}
//             <div className="mt-4 flex justify-end">
//               <button
//                 onClick={insertToParagraph}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Insert to Paragraph {activeIndex + 1}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IntroductionAndBodyForm;


"use client";

import { useContext, useState, useEffect } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Plus, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const IntroductionAndBodyForm = () => {
  const { coverLetterData, setCoverLetterData } = useContext(CoverLetterContext);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  const CHAR_LIMIT = 500;

  // Enhanced function to strip HTML tags for character counting
  const stripHtmlTags = (html) => {
    if (!html) return "";
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Fixed function to properly truncate HTML content while preserving formatting
  const truncateHtmlContent = (htmlContent, limit) => {
    if (!htmlContent) return "";

    const plainText = stripHtmlTags(htmlContent);
    
    if (plainText.length <= limit) {
      return htmlContent;
    }

    // Create a temporary div to work with the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    
    // Get the truncated plain text
    const truncatedPlainText = plainText.substring(0, limit);
    
    // Simple approach: return the truncated plain text as HTML
    // For more complex HTML preservation, you'd need a more sophisticated approach
    return truncatedPlainText;
  };

  // Enhanced handleBodyChange with better error handling
  const handleBodyChange = (index, value) => {
    try {
      // Validate inputs
      if (index < 0 || !Array.isArray(coverLetterData?.body)) {
        console.error("Invalid index or body array");
        return;
      }

      const plainText = stripHtmlTags(value);

      if (plainText.length <= CHAR_LIMIT) {
        setCoverLetterData((prevData) => {
          const updatedBody = [...prevData.body];
          updatedBody[index] = value;
          return { ...prevData, body: updatedBody };
        });
      } else {
        // Show warning before truncating
        toast.warn(`Content exceeds ${CHAR_LIMIT} characters. Content will be truncated.`);
        
        const truncatedValue = truncateHtmlContent(value, CHAR_LIMIT);
        setCoverLetterData((prevData) => {
          const updatedBody = [...prevData.body];
          updatedBody[index] = truncatedValue;
          return { ...prevData, body: updatedBody };
        });
      }
    } catch (error) {
      console.error("Error in handleBodyChange:", error);
      toast.error("An error occurred while updating content");
    }
  };

  // Enhanced AI Assist function with better error handling
  const handleAIAssist = async (index) => {
    try {
      // Validate context data
      if (!coverLetterData?.personalDetails || !coverLetterData?.letterDetails) {
        toast.error("Missing required data for AI assistance");
        return;
      }

      setLoadingIndex(index);
      setActiveIndex(index);
      setSelectedSuggestionIndex(0);

      const { personalDetails, letterDetails } = coverLetterData;

      let endpoint = "";
      let payload = {};

      // Enhanced endpoint and payload logic
      switch (index) {
        case 0:
          endpoint = "https://api.sentryspot.co.uk/api/jobseeker/aisummery-section1-coverletter";
          payload = {
            name: personalDetails.name || "",
            target_role: personalDetails.position || "",
            company_name: letterDetails.companyName || "",
            location: personalDetails.address || "",
          };
          break;
        case 1:
          endpoint = "https://api.sentryspot.co.uk/api/jobseeker/aisummery-section2-coverletter";
          payload = {
            target_role: personalDetails.position || "",
          };
          break;
        case 2:
          endpoint = "https://api.sentryspot.co.uk/api/jobseeker/aisummery-section3-coverletter";
          payload = {
            name: personalDetails.name || "",
            target_role: personalDetails.position || "",
            company_name: letterDetails.companyName || "",
          };
          break;
        default:
          throw new Error("Invalid paragraph index");
      }

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required. Please log in.");
        return;
      }

      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        timeout: 30000, // 30 second timeout
      });

      if (response.data?.data?.cover_letter_analysis?.professional_summaries) {
        const content = response.data.data.cover_letter_analysis.professional_summaries.join("\n\n");
        setPopupContent(content);
        setPopupVisible(true);
      } else {
        setPopupContent("No content received from AI assistant.");
        setPopupVisible(true);
      }
    } catch (error) {
      console.error("AI Assist error:", error);
      
      let errorMessage = "Something went wrong with AI assistance.";
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = "Request timed out. Please try again.";
      } else if (error.response?.status === 401) {
        errorMessage = "Authentication failed. Please log in again.";
      } else if (error.response?.status === 429) {
        errorMessage = "Too many requests. Please wait a moment.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoadingIndex(null);
    }
  };

  // Enhanced insert function with validation
  const insertToParagraph = () => {
    try {
      if (activeIndex === null) {
        toast.error("No active paragraph selected");
        return;
      }

      const splitContent = popupContent
        .split("\n\n")
        .filter((s) => s.trim() !== "");

      if (!Array.isArray(splitContent) || splitContent.length === 0) {
        toast.error("No content available to insert");
        return;
      }

      if (selectedSuggestionIndex < 0 || selectedSuggestionIndex >= splitContent.length) {
        toast.error("Invalid suggestion selected");
        return;
      }

      const selectedText = splitContent[selectedSuggestionIndex];
      handleBodyChange(activeIndex, selectedText || "");
      setPopupVisible(false);
      toast.success("Content inserted successfully!");
    } catch (error) {
      console.error("Error inserting content:", error);
      toast.error("Failed to insert content");
    }
  };

  // Enhanced popup close function
  const closePopup = () => {
    setPopupVisible(false);
    setActiveIndex(null);
    setSelectedSuggestionIndex(0);
    setPopupContent("");
  };

  // Validate context data
  if (!coverLetterData || !Array.isArray(coverLetterData.body)) {
    return (
      <div className="p-4 md:p-8 rounded-lg shadow-md">
        <div className="text-red-500">Error: Invalid cover letter data</div>
      </div>
    );
  }

  const splitContent = popupContent
    .split("\n\n")
    .filter((s) => s.trim() !== "");

  return (
    <div className="p-4 md:p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Cover Letter Sections
      </h2>

      {coverLetterData.body.map((paragraph, index) => {
        const currentLength = stripHtmlTags(paragraph || "").length;
        const isNearLimit = currentLength > CHAR_LIMIT * 0.8;
        const isOverLimit = currentLength > CHAR_LIMIT;

        return (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-center">
              <label className="block text-white font-medium mb-2">
                Paragraph {index + 1}
              </label>
              <button
                onClick={() => handleAIAssist(index)}
                type="button"
                className="flex items-center gap-2 p-2 px-4 bg-black text-white rounded-lg text-sm mb-2 hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loadingIndex === index}
              >
                <Plus className="w-5 h-5" />
                <span>{loadingIndex === index ? "Loading..." : "AI Assist"}</span>
              </button>
            </div>

            <ReactQuill
              value={paragraph || ""}
              onChange={(value) => handleBodyChange(index, value)}
              theme="snow"
              placeholder={`Write paragraph ${index + 1}`}
              className="bg-white"
            />
            
            {/* Character count indicator */}
            <div className="mt-1 text-right">
              <span className={`text-sm ${
                isOverLimit ? 'text-red-500' : isNearLimit ? 'text-yellow-500' : 'text-gray-400'
              }`}>
                {currentLength}/{CHAR_LIMIT} characters
              </span>
            </div>
          </div>
        );
      })}

      {/* Enhanced Popup Modal */}
      {popupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg p-6 relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-black hover:text-red-600 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-lg font-semibold mb-4">AI Suggested Content</h3>
            
            {splitContent.length > 0 ? (
              <div className="space-y-3 mb-4">
                {splitContent.map((text, idx) => (
                  <label
                    key={idx}
                    className="flex items-start gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="ai-suggestion"
                      value={idx}
                      checked={selectedSuggestionIndex === idx}
                      onChange={() => setSelectedSuggestionIndex(idx)}
                      className="mt-1 flex-shrink-0"
                    />
                    <span className="whitespace-pre-line text-sm">{text}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 mb-4">No suggestions available</div>
            )}
            
            <div className="flex justify-end gap-2">
              <button
                onClick={closePopup}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={insertToParagraph}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={splitContent.length === 0}
              >
                Insert to Paragraph {activeIndex !== null ? activeIndex + 1 : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroductionAndBodyForm;