// // import React, { useContext, useState, useEffect } from "react";
// // import { ResumeContext } from "../context/ResumeContext";
// // import { AlertCircle, X, Loader2 } from "lucide-react";
// // import { useRouter } from "next/router";

// // const PersonalInformation = () => {
// //   const {
// //     resumeData,
// //     setResumeData,
// //     handleProfilePicture,
// //     handleChange,
// //     resumeStrength,
// //   } = useContext(ResumeContext);
// //   const router = useRouter();
// //   const { improve } = router.query;

// //   const [activeTooltip, setActiveTooltip] = useState(null);
// //   const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
// //   const [locationSuggestions, setLocationSuggestions] = useState([]);
// //   const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false);
// //   const [showLocationDropdown, setShowLocationDropdown] = useState(false);
// //   const [isLoading, setIsLoading] = useState({
// //     jobTitle: false,
// //     location: false,
// //   });

// //   const dummyImage =
// //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s";

//   // const fetchJobTitles = async (keyword) => {
//   //   if (!keyword || keyword.length < 1) {
//   //     setJobTitleSuggestions([]);
//   //     return;
//   //   }

//   //   setIsLoading((prev) => ({ ...prev, jobTitle: true }));
//   //   try {
//   //     const response = await fetch(
//   //       `https://api.sentryspot.co.uk/api/jobseeker/job-title?job_title_keyword=${encodeURIComponent(
//   //         keyword
//   //       )}`
//   //     );
//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       const jobTitles = data.data.map((item) => item.name);
//   //       setJobTitleSuggestions(jobTitles);
//   //       setShowJobTitleDropdown(true);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching job titles:", error);
//   //   }
//   //   setIsLoading((prev) => ({ ...prev, jobTitle: false }));
//   // };

//   // const fetchLocations = async (keyword) => {
//   //   if (!keyword || keyword.length < 1) {
//   //     setLocationSuggestions([]);
//   //     return;
//   //   }

//   //   setIsLoading((prev) => ({ ...prev, location: true }));
//   //   try {
//   //     const response = await fetch(
//   //       `https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${encodeURIComponent(
//   //         keyword
//   //       )}`
//   //     );
//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       const locations = data.data.location_names.map((item) => item);
//   //       setLocationSuggestions(locations);
//   //       setShowLocationDropdown(true);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching locations:", error);
//   //   }
//   //   setIsLoading((prev) => ({ ...prev, location: false }));
//   // };

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   handleChange(e);

//   //   if (name === "position") {
//   //     fetchJobTitles(value);
//   //   } else if (name === "address") {
//   //     fetchLocations(value);
//   //   }
//   // };

// //   const selectSuggestion = (field, value) => {
// //     const event = {
// //       target: { name: field, value },
// //     };
// //     handleChange(event);
// //     if (field === "position") {
// //       setShowJobTitleDropdown(false);
// //     } else {
// //       setShowLocationDropdown(false);
// //     }
// //   };

// //   const hasErrors = (field) => {
// //     const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
// //     return Array.isArray(strengthInfo) && strengthInfo.length > 0;
// //   };

// //   const getSuggestions = (field) => {
// //     return resumeStrength?.personal_info_strenght?.[field] || [];
// //   };

// //   // Close dropdowns when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = () => {
// //       setShowJobTitleDropdown(false);
// //       setShowLocationDropdown(false);
// //     };

// //     document.addEventListener("click", handleClickOutside);
// //     return () => document.removeEventListener("click", handleClickOutside);
// //   }, []);

// //   const formFields = [
// //     { field: "name", placeholder: "Full Name", type: "text" },
// //     {
// //       field: "position",
// //       placeholder: "Job Title",
// //       type: "text",
// //       hasSuggestions: true,
// //     },
// //     {
// //       field: "contactInformation",
// //       placeholder: "Contact Information",
// //       type: "text",
// //     },
// //     { field: "email", placeholder: "Email", type: "email" },
// //     {
// //       field: "address",
// //       placeholder: "Address",
// //       type: "text",
// //       hasSuggestions: true,
// //     },
// //   ];

// //   const handleAutoFix = async (field, content, onAutoFix) => {
// //     e.preventDefault()
// //     if (!content) return;

// //     setIsLoading((prev) => ({ ...prev, [field]: true })); // Set loading state
// //     try {
// //       const endpoint = field === "name" ? "/ai-username" : "/ai-jobtitle";
// //       const response = await fetch(
// //         `https://api.sentryspot.co.uk/api/jobseeker${endpoint}`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({
// //             key: field === "name" ? "user name" : "job title",
// //             keyword: "auto improve",
// //             content: content,
// //           }),
// //         }
// //       );

// //       if (response.ok) {
// //         const data = await response.json();
// //         if (data.autoFixedContent) {
// //           onAutoFix(data.autoFixedContent); // Update the content
// //         }
// //       }
// //     } catch (error) {
// //       console.error(`Error auto-fixing ${field}:`, error);
// //     }

// //     setIsLoading((prev) => ({ ...prev, [field]: false })); // Reset loading state
// //   };

// //   return (
// //     <div className="flex flex-col gap-3 w-full items-center md:mt-10 p-4 md:px-10">
// //       <h2 className="text-2xl md:text-3xl font-semibold text-white">
// //         Detail Information
// //       </h2>

// //       <div className="flex flex-col items-center gap-6 w-full">
// //         {/* Profile Picture Section */}
// //         <div className="flex flex-col items-center gap-4">
// //           <img
// //             src={resumeData.profilePicture || dummyImage}
// //             alt="Profile"
// //             className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover"
// //           />
// //           <input
// //             type="file"
// //             name="profileImage"
// //             accept="image/*"
// //             className="bg-gray-300 text-sm text-black py-2 px-4 rounded-md cursor-pointer hover:bg-gray-400 transition-colors"
// //             onChange={handleProfilePicture}
// //           />
// //         </div>

// //         {/* Form Fields */}
// //         <div className="flex flex-col gap-4 w-full max-w-xl">
// //           {formFields.map(({ field, placeholder, type, hasSuggestions }) => (
// //             <div
// //               key={field}
// //               className="relative group"
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               <div className="flex items-center relative">
// //                 <input
// //                   type={type}
// //                   placeholder={placeholder}
// //                   name={field}
// //                   className={`w-full p-2 border rounded-md outline-none transition-colors
// //                     ${
// //                       improve && hasErrors(field)
// //                         ? "border-red-500 focus:border-red-600"
// //                         : "border-gray-300 focus:border-blue-500"
// //                     }`}
// //                   value={resumeData[field] || ""}
// //                   onChange={handleInputChange}
// //                   onFocus={() => {
// //                     if (field === "position") setShowJobTitleDropdown(true);
// //                     if (field === "address") setShowLocationDropdown(true);
// //                   }}
// //                 />
// //                 {improve && hasErrors(field) && (
// //                   <button
// //                     type="button"
// //                     className="absolute right-2 text-red-500 hover:text-red-600 transition-colors"
// //                     onClick={() =>
// //                       setActiveTooltip(activeTooltip === field ? null : field)
// //                     }
// //                     aria-label="Show suggestions"
// //                   >
// //                     <AlertCircle className="w-5 h-5" />
// //                   </button>
// //                 )}
// //                 {hasSuggestions &&
// //                   isLoading[field === "position" ? "jobTitle" : "location"] && (
// //                     <div className="absolute right-2">
// //                       <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
// //                     </div>
// //                   )}
// //               </div>

// //               {/* Suggestions Dropdown */}
// //               {hasSuggestions &&
// //                 (field === "position"
// //                   ? showJobTitleDropdown && jobTitleSuggestions.length > 0
// //                   : showLocationDropdown && locationSuggestions.length > 0) && (
// //                   <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
// //                     {(field === "position"
// //                       ? jobTitleSuggestions
// //                       : locationSuggestions
// //                     ).map((suggestion, index) => (
// //                       <div
// //                         key={index}
// //                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
// //                         onClick={() => selectSuggestion(field, suggestion)}
// //                       >
// //                         {suggestion}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}

// //               {/* Error Tooltip */}
// //               {activeTooltip === field && hasErrors(field) && (
// //                 <div className="absolute z-50 left-8 mt-10 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
// //                   <div className="p-4 border-b border-gray-700">
// //                     <div className="flex items-center justify-between">
// //                       <div className="flex items-center space-x-2">
// //                         <AlertCircle className="w-5 h-5 text-red-400" />
// //                         <span className="font-medium text-black">
// //                           Suggestions
// //                         </span>
// //                       </div>
// //                       {(field === "name" || field === "position") && (
// //                         <button
// //                         onClick={() => handleAutoFix(e,field, resumeData[field], (updatedValue) => {
// //                           handleChange({ target: { name: field, value: updatedValue } });
// //                         })}
// //                         className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all"
// //                       >
// //                         Auto Fix
// //                       </button>

// //                       )}

// //                       <button
// //                         onClick={() => setActiveTooltip(null)}
// //                         className="text-black transition-colors"
// //                       >
// //                         <X className="w-5 h-5" />
// //                       </button>
// //                     </div>
// //                   </div>
// //                   <div className="p-4">
// //                     {getSuggestions(field).map((msg, i) => (
// //                       <div
// //                         key={i}
// //                         className="flex items-start space-x-3 mb-3 last:mb-0"
// //                       >
// //                         <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
// //                         <p className="text-black text-sm">{msg}</p>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PersonalInformation;

// // import React, { useContext, useState, useEffect } from "react";
// // import { ResumeContext } from "../context/ResumeContext";
// // import { AlertCircle, X, Loader2 } from "lucide-react";
// // import { useRouter } from "next/router";

// // const PersonalInformation = () => {
// //   const {
// //     resumeData,
// //     setResumeData,
// //     handleProfilePicture,
// //     handleChange,
// //     resumeStrength,
// //   } = useContext(ResumeContext);
// //   const router = useRouter();
// //   const { improve } = router.query;

// //   const [activeTooltip, setActiveTooltip] = useState(null);
// //   const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
// //   const [locationSuggestions, setLocationSuggestions] = useState([]);
// //   const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false);
// //   const [showLocationDropdown, setShowLocationDropdown] = useState(false);
// //   const [isLoading, setIsLoading] = useState({
// //     jobTitle: false,
// //     location: false,
// //     autoFix: false
// //   });

// //   const dummyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s";

// //   // ... (keep existing fetchJobTitles and fetchLocations functions)

// //   const fetchJobTitles = async (keyword) => {
// //     if (!keyword || keyword.length < 1) {
// //       setJobTitleSuggestions([]);
// //       return;
// //     }

// //     setIsLoading((prev) => ({ ...prev, jobTitle: true }));
// //     try {
// //       const response = await fetch(
// //         `https://api.sentryspot.co.uk/api/jobseeker/job-title?job_title_keyword=${encodeURIComponent(
// //           keyword
// //         )}`
// //       );
// //       if (response.ok) {
// //         const data = await response.json();
// //         const jobTitles = data.data.map((item) => item.name);
// //         setJobTitleSuggestions(jobTitles);
// //         setShowJobTitleDropdown(true);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching job titles:", error);
// //     }
// //     setIsLoading((prev) => ({ ...prev, jobTitle: false }));
// //   };

// //   const fetchLocations = async (keyword) => {
// //     if (!keyword || keyword.length < 1) {
// //       setLocationSuggestions([]);
// //       return;
// //     }

// //     setIsLoading((prev) => ({ ...prev, location: true }));
// //     try {
// //       const response = await fetch(
// //         `https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${encodeURIComponent(
// //           keyword
// //         )}`
// //       );
// //       if (response.ok) {
// //         const data = await response.json();
// //         const locations = data.data.location_names.map((item) => item);
// //         setLocationSuggestions(locations);
// //         setShowLocationDropdown(true);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching locations:", error);
// //     }
// //     setIsLoading((prev) => ({ ...prev, location: false }));
// //   };

// //   // const handleAutoFix = async (field, content) => {
// //   //   if (!content) return;

// //   //   setIsLoading(prev => ({ ...prev, autoFix: true }));

// //   //   try {
// //   //     const endpoint = field === "name" ? "/ai-username" : "/ai-jobtitle";
// //   //     const response = await fetch(
// //   //       `https://api.sentryspot.co.uk/api/jobseeker${endpoint}`,
// //   //       {
// //   //         method: "POST",
// //   //         headers: {
// //   //           "Content-Type": "application/json",
// //   //         },
// //   //         body: JSON.stringify({
// //   //           key: field === "name" ? "user name" : "job title",
// //   //           keyword: "auto improve",
// //   //           content: content,
// //   //         }),
// //   //       }
// //   //     );

// //   //     if (response.ok) {
// //   //       const data = await response.json();
// //   //       if (data.autoFixedContent) {
// //   //         // Update the resume data with the auto-fixed content
// //   //         const event = {
// //   //           target: {
// //   //             name: field,
// //   //             value: data.autoFixedContent
// //   //           }
// //   //         };
// //   //         handleChange(event);
// //   //         setActiveTooltip(null); // Close the tooltip after successful auto-fix
// //   //       }
// //   //     }
// //   //   } catch (error) {
// //   //     console.error(`Error auto-fixing ${field}:`, error);
// //   //   } finally {
// //   //     setIsLoading(prev => ({ ...prev, autoFix: false }));
// //   //   }
// //   // };
// //   // const handleAutoFix = async (field, content) => {
// //   //   if (!content) return;

// //   //   setIsLoading(prev => ({ ...prev, autoFix: true }));

// //   //   try {
// //   //     const endpoint = field === "name" ? "/ai-username" : "/ai-jobtitle";
// //   //     const token = localStorage.getItem("token"); // Retrieve the token from localStorage or wherever it's stored

// //   //     const response = await fetch(
// //   //       `https://api.sentryspot.co.uk/api/jobseeker${endpoint}`,
// //   //       {
// //   //         method: "POST",
// //   //         headers: {
// //   //           "Content-Type": "application/json",
// //   //           Authorization: `${token}`, // Include the token here
// //   //         },
// //   //         body: JSON.stringify({
// //   //           key: field === "name" ? "user name" : "job title",
// //   //           keyword: "auto improve",
// //   //           content: content,
// //   //         }),
// //   //       }
// //   //     );

// //   //     if (response.ok) {
// //   //       const data = await response.json();
// //   //       if (data.autoFixedContent) {
// //   //         // Update the resume data with the auto-fixed content
// //   //         const event = {
// //   //           target: {
// //   //             name: field,
// //   //             value: data.autoFixedContent
// //   //           }
// //   //         };
// //   //         handleChange(event);
// //   //         setActiveTooltip(null); // Close the tooltip after successful auto-fix
// //   //       }
// //   //     }
// //   //   } catch (error) {
// //   //     console.error(`Error auto-fixing ${field}:`, error);
// //   //   } finally {
// //   //     setIsLoading(prev => ({ ...prev, autoFix: false }));
// //   //   }
// //   // };

// //   const handleAutoFix = async (field, content) => {
// //     if (!content) return;

// //     setIsLoading(prev => ({ ...prev, autoFix: true }));

// //     try {
// //       const endpoint = field === "name" ? "/ai-username" : "/ai-jobtitle";
// //       const token = localStorage.getItem("token"); // Retrieve the token

// //       const response = await fetch(
// //         `https://api.sentryspot.co.uk/api/jobseeker${endpoint}`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `${token}`,
// //           },
// //           body: JSON.stringify({
// //             key: field === "name" ? "user name" : "job title",
// //             keyword: "auto improve",
// //             content: content,
// //           }),
// //         }
// //       );

// //       if (response.ok) {
// //         const data = await response.json();
// //         console.log(data.data.resume_analysis,"<<");

// //         if (data.data.resume_analysis) {
// //           const updatedValue = field == "name" ? data.data.resume_analysis.user_name : data.data.resume_analysis.job_title;

// //           if (updatedValue) {
// //             // Update the resume data with the auto-fixed content
// //             const event = {
// //               target: {
// //                 name: field,
// //                 value: updatedValue
// //               }
// //             };
// //             handleChange(event);
// //             setActiveTooltip(null); // Close the tooltip after successful auto-fix
// //           }
// //         }
// //       }
// //     } catch (error) {
// //       console.error(`Error auto-fixing ${field}:`, error);
// //     } finally {
// //       setIsLoading(prev => ({ ...prev, autoFix: false }));
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     handleChange(e);

// //     if (name === "position") {
// //       fetchJobTitles(value);
// //     } else if (name === "address") {
// //       fetchLocations(value);
// //     }
// //   };

// //   const selectSuggestion = (field, value) => {
// //     const event = {
// //       target: { name: field, value },
// //     };
// //     handleChange(event);
// //     if (field === "position") {
// //       setShowJobTitleDropdown(false);
// //     } else {
// //       setShowLocationDropdown(false);
// //     }
// //   };

// //   const hasErrors = (field) => {
// //     const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
// //     return Array.isArray(strengthInfo) && strengthInfo.length > 0;
// //   };

// //   const getSuggestions = (field) => {
// //     return resumeStrength?.personal_info_strenght?.[field] || [];
// //   };

// //   useEffect(() => {
// //     const handleClickOutside = () => {
// //       setShowJobTitleDropdown(false);
// //       setShowLocationDropdown(false);
// //     };

// //     document.addEventListener("click", handleClickOutside);
// //     return () => document.removeEventListener("click", handleClickOutside);
// //   }, []);

// //   const formFields = [
// //     { field: "name", placeholder: "Full Name", type: "text" },
// //     { field: "position", placeholder: "Job Title", type: "text", hasSuggestions: true },
// //     { field: "contactInformation", placeholder: "Contact Information", type: "text" },
// //     { field: "email", placeholder: "Email", type: "email" },
// //     { field: "address", placeholder: "Address", type: "text", hasSuggestions: true },
// //   ];

// //   return (
// //     <div className="flex flex-col gap-3 w-full items-center md:mt-10 p-4 md:px-10">
// //       <h2 className="text-2xl md:text-3xl font-semibold text-white">
// //         Detail Information
// //       </h2>

// //       <div className="flex flex-col items-center gap-6 w-full">
// //         {/* Profile Picture Section */}
// //         <div className="flex flex-col items-center gap-4">
// //           <img
// //             src={resumeData.profilePicture || dummyImage}
// //             alt="Profile"
// //             className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover"
// //           />
// //           <input
// //             type="file"
// //             name="profileImage"
// //             accept="image/*"
// //             className="bg-gray-300 text-sm text-black py-2 px-4 rounded-md cursor-pointer hover:bg-gray-400 transition-colors"
// //             onChange={handleProfilePicture}
// //           />
// //         </div>

// //         {/* Form Fields */}
// //         <div className="flex flex-col gap-4 w-full max-w-xl">
// //           {formFields.map(({ field, placeholder, type, hasSuggestions }) => (
// //             <div
// //               key={field}
// //               className="relative group"
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               <div className="flex items-center relative">
// //                 <input
// //                   type={type}
// //                   placeholder={placeholder}
// //                   name={field}
// //                   className={`w-full p-2 border rounded-md outline-none transition-colors
// //                     ${
// //                       improve && hasErrors(field)
// //                         ? "border-red-500 focus:border-red-600"
// //                         : "border-gray-300 focus:border-blue-500"
// //                     }`}
// //                   value={resumeData[field] || ""}
// //                   onChange={handleInputChange}
// //                   onFocus={() => {
// //                     if (field === "position") setShowJobTitleDropdown(true);
// //                     if (field === "address") setShowLocationDropdown(true);
// //                   }}
// //                 />
// //                 {improve && hasErrors(field) && (
// //                   <button
// //                     type="button"
// //                     className="absolute right-2 text-red-500 hover:text-red-600 transition-colors"
// //                     onClick={() => setActiveTooltip(activeTooltip === field ? null : field)}
// //                     aria-label="Show suggestions"
// //                   >
// //                     <AlertCircle className="w-5 h-5" />
// //                   </button>
// //                 )}
// //                 {hasSuggestions && isLoading[field === "position" ? "jobTitle" : "location"] && (
// //                   <div className="absolute right-2">
// //                     <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Suggestions Dropdown */}
// //               {hasSuggestions &&
// //                 (field === "position"
// //                   ? showJobTitleDropdown && jobTitleSuggestions.length > 0
// //                   : showLocationDropdown && locationSuggestions.length > 0) && (
// //                   <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
// //                     {(field === "position" ? jobTitleSuggestions : locationSuggestions).map(
// //                       (suggestion, index) => (
// //                         <div
// //                           key={index}
// //                           className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
// //                           onClick={() => selectSuggestion(field, suggestion)}
// //                         >
// //                           {suggestion}
// //                         </div>
// //                       )
// //                     )}
// //                   </div>
// //                 )}

// //               {/* Error Tooltip */}
// //               {activeTooltip === field && hasErrors(field) && (
// //                 <div className="absolute z-50 left-8 mt-10 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
// //                   <div className="p-4 border-b border-gray-700">
// //                     <div className="flex items-center justify-between">
// //                       <div className="flex items-center space-x-2">
// //                         <AlertCircle className="w-5 h-5 text-red-400" />
// //                         <span className="font-medium text-black">Suggestions</span>
// //                       </div>
// //                       {(field === "name" || field === "position") && (
// //                         <button
// //                           onClick={() => handleAutoFix(field, resumeData[field])}
// //                           disabled={isLoading.autoFix}
// //                           className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
// //                         >
// //                           {isLoading.autoFix ? (
// //                             <Loader2 className="w-4 h-4 animate-spin" />
// //                           ) : (
// //                             'Auto Fix'
// //                           )}
// //                         </button>
// //                       )}
// //                       <button
// //                         onClick={() => setActiveTooltip(null)}
// //                         className="text-black transition-colors"
// //                       >
// //                         <X className="w-5 h-5" />
// //                       </button>
// //                     </div>
// //                   </div>
// //                   <div className="p-4">
// //                     {getSuggestions(field).map((msg, i) => (
// //                       <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
// //                         <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
// //                         <p className="text-black text-sm">{msg}</p>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PersonalInformation;

// import React, { useContext, useState, useEffect } from "react";
// import { ResumeContext } from "../context/ResumeContext";
// import { AlertCircle, X, Loader2 } from "lucide-react";
// import { useRouter } from "next/router";

// const PersonalInformation = () => {
//   const {
//     resumeData,
//     setResumeData,
//     handleProfilePicture,
//     handleChange,
//     resumeStrength,
//     setResumeStrength,
//   } = useContext(ResumeContext);
//   const router = useRouter();
//   const { improve } = router.query;

//   const [activeTooltip, setActiveTooltip] = useState(null);
//   const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
//   const [locationSuggestions, setLocationSuggestions] = useState([]);
//   const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false);
//   const [showLocationDropdown, setShowLocationDropdown] = useState(false);
//   const [isLoading, setIsLoading] = useState({
//     jobTitle: false,
//     location: false,
//     autoFix: false
//   });

//   const dummyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s";

//   const fetchJobTitles = async (keyword) => {
//     if (!keyword || keyword.length < 1) {
//       setJobTitleSuggestions([]);
//       return;
//     }

//     setIsLoading((prev) => ({ ...prev, jobTitle: true }));
//     try {
//       const response = await fetch(
//         `https://api.sentryspot.co.uk/api/jobseeker/job-title?job_title_keyword=${encodeURIComponent(
//           keyword
//         )}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         const jobTitles = data.data.map((item) => item.name);
//         setJobTitleSuggestions(jobTitles);
//         setShowJobTitleDropdown(true);
//       }
//     } catch (error) {
//       console.error("Error fetching job titles:", error);
//     }
//     setIsLoading((prev) => ({ ...prev, jobTitle: false }));
//   };

//   const fetchLocations = async (keyword) => {
//     if (!keyword || keyword.length < 1) {
//       setLocationSuggestions([]);
//       return;
//     }

//     setIsLoading((prev) => ({ ...prev, location: true }));
//     try {
//       const response = await fetch(
//         `https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${encodeURIComponent(
//           keyword
//         )}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         const locations = data.data.location_names.map((item) => item);
//         setLocationSuggestions(locations);
//         setShowLocationDropdown(true);
//       }
//     } catch (error) {
//       console.error("Error fetching locations:", error);
//     }
//     setIsLoading((prev) => ({ ...prev, location: false }));
//   };

//   const handleAutoFix = async (field, content) => {
//     if (!content) return;

//     setIsLoading((prev) => ({ ...prev, autoFix: true }));

//     try {
//       let endpoint = "";
//       let key = "";

//       if (field === "name") {
//         endpoint = "/ai-username";
//         key = "user name";
//       } else if (field === "position") {
//         endpoint = "/ai-jobtitle";
//         key = "job title";
//       } else if (field === "contactInformation") {
//         endpoint = "/ai-contact";
//         key = "contact information";
//       }

//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         `https://api.sentryspot.co.uk/api/jobseeker${endpoint}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `${token}`,
//           },
//           body: JSON.stringify({
//             key: key,
//             keyword: "auto improve",
//             content: content,
//           }),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();

//         if (data.data.resume_analysis) {
//           let updatedValue = null;

//           if (field === "name") {
//             updatedValue = data.data.resume_analysis.user_name;
//           } else if (field === "position") {
//             updatedValue = data.data.resume_analysis.job_title;
//           } else if (field === "contactInformation") {
//             updatedValue = data.data.resume_analysis.contact;
//           }

//           if (updatedValue) {
//             const event = {
//               target: {
//                 name: field,
//                 value: updatedValue,
//               },
//             };
//             handleChange(event);
//             setActiveTooltip(null);

//             // Clear errors for this field
//             if (resumeStrength?.personal_info_strenght) {
//               const updatedStrength = {
//                 ...resumeStrength,
//                 personal_info_strenght: {
//                   ...resumeStrength.personal_info_strenght,
//                   [field]: [],
//                 },
//               };
//               setResumeStrength(updatedStrength);
//             }
//           }
//         }
//       }
//     } catch (error) {
//       console.error(`Error auto-fixing ${field}:`, error);
//     } finally {
//       setIsLoading((prev) => ({ ...prev, autoFix: false }));
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     handleChange(e);

//     if (name === "position") {
//       fetchJobTitles(value);
//     } else if (name === "address") {
//       fetchLocations(value);
//     }
//   };

//   const selectSuggestion = (field, value) => {
//     const event = {
//       target: { name: field, value },
//     };
//     handleChange(event);
//     if (field === "position") {
//       setShowJobTitleDropdown(false);
//     } else {
//       setShowLocationDropdown(false);
//     }
//   };

//   const hasErrors = (field) => {
//     const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
//     return Array.isArray(strengthInfo) && strengthInfo.length > 0;
//   };

//   const getSuggestions = (field) => {
//     return resumeStrength?.personal_info_strenght?.[field] || [];
//   };

//   useEffect(() => {
//     const handleClickOutside = () => {
//       setShowJobTitleDropdown(false);
//       setShowLocationDropdown(false);
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   const formFields = [
//     { field: "name", placeholder: "Full Name", type: "text" },
//     { field: "position", placeholder: "Job Title", type: "text", hasSuggestions: true },
//     { field: "contactInformation", placeholder: "Contact Information", type: "text" },
//     { field: "email", placeholder: "Email", type: "email" },
//     { field: "address", placeholder: "Address", type: "text", hasSuggestions: true },
//   ];

//   return (
//     <div className="flex flex-col gap-3 w-full items-center md:mt-10 p-4 md:px-10">
//       <h2 className="text-2xl md:text-3xl font-semibold text-white">
//         Detail Information
//       </h2>

//       <div className="flex flex-col items-center gap-6 w-full">
//         <div className="flex flex-col items-center gap-4">
//           <img
//             src={resumeData.profilePicture || dummyImage}
//             alt="Profile"
//             className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover"
//           />
//           <input
//             type="file"
//             name="profileImage"
//             accept="image/*"
//             className="bg-gray-300 text-sm text-black py-2 px-4 rounded-md cursor-pointer hover:bg-gray-400 transition-colors"
//             onChange={handleProfilePicture}
//           />
//         </div>

//         <div className="flex flex-col gap-4 w-full max-w-xl">
//           {formFields.map(({ field, placeholder, type, hasSuggestions }) => (
//             <div
//               key={field}
//               className="relative group"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex items-center relative">
//                 <input
//                   type={type}
//                   placeholder={placeholder}
//                   name={field}
//                   className={`w-full p-2 border rounded-md outline-none transition-colors
//                     ${
//                       improve && hasErrors(field)
//                         ? "border-red-500 focus:border-red-600"
//                         : "border-gray-300 focus:border-blue-500"
//                     }`}
//                   value={resumeData[field] || ""}
//                   onChange={handleInputChange}
//                   onFocus={() => {
//                     if (field === "position") setShowJobTitleDropdown(true);
//                     if (field === "address") setShowLocationDropdown(true);
//                   }}
//                 />
//                 {improve && hasErrors(field) && (
//                   <button
//                     type="button"
//                     className="absolute right-2 text-red-500 hover:text-red-600 transition-colors"
//                     onClick={() => setActiveTooltip(activeTooltip === field ? null : field)}
//                     aria-label="Show suggestions"
//                   >
//                     <AlertCircle className="w-5 h-5" />
//                   </button>
//                 )}
//                 {hasSuggestions && isLoading[field === "position" ? "jobTitle" : "location"] && (
//                   <div className="absolute right-2">
//                     <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
//                   </div>
//                 )}
//               </div>

//               {hasSuggestions &&
//                 (field === "position"
//                   ? showJobTitleDropdown && jobTitleSuggestions.length > 0
//                   : showLocationDropdown && locationSuggestions.length > 0) && (
//                   <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
//                     {(field === "position" ? jobTitleSuggestions : locationSuggestions).map(
//                       (suggestion, index) => (
//                         <div
//                           key={index}
//                           className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
//                           onClick={() => selectSuggestion(field, suggestion)}
//                         >
//                           {suggestion}
//                         </div>
//                       )
//                     )}
//                   </div>
//                 )}

//               {activeTooltip === field && hasErrors(field) && (
//                 <div className="absolute z-50 left-8 mt-10 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
//                   <div className="p-4 border-b border-gray-700">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <AlertCircle className="w-5 h-5 text-red-400" />
//                         <span className="font-medium text-black">Suggestions</span>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         {(field === "name" || field === "position" || field ==="contactInformation") && (
//                           <button
//                             onClick={() => handleAutoFix(field, resumeData[field])}
//                             disabled={isLoading.autoFix}
//                             className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                           >
//                             {isLoading.autoFix ? (
//                               <Loader2 className="w-4 h-4 animate-spin" />
//                             ) : (
//                               'Auto Fix'
//                             )}
//                           </button>
//                         )}
//                         <button
//                           onClick={() => setActiveTooltip(null)}
//                           className="text-black transition-colors"
//                         >
//                           <X className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-4">
//                     {getSuggestions(field).map((msg, i) => (
//                       <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
//                         <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
//                         <p className="text-black text-sm">{msg}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalInformation;

import React, { useContext, useState, useEffect } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { AlertCircle, X, Loader2, ChevronDown } from "lucide-react";
import { useRouter } from "next/router";

const PersonalInformation = () => {
  const {
    resumeData,
    setResumeData,
    handleProfilePicture,
    handleChange,
    resumeStrength,
    setResumeStrength,
  } = useContext(ResumeContext);
  const router = useRouter();
  const { improve } = router.query;

  const [activeTooltip, setActiveTooltip] = useState(null);
  const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCountryCodeDropdown, setShowCountryCodeDropdown] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91"); // Default to India
  const [isLoading, setIsLoading] = useState({
    jobTitle: false,
    location: false,
    autoFix: false,
    countryCodes: false,
  });

  const dummyImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s";

  useEffect(() => {
    const fetchCountryCodes = async () => {
      setIsLoading((prev) => ({ ...prev, countryCodes: true }));
      try {
        const response = await fetch(
          "https://api.sentryspot.co.uk/api/jobseeker/countries"
        );
        if (response.ok) {
          const data = await response.json();
          const sortedCountries = data.data.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setCountryCodes(sortedCountries);
        }
      } catch (error) {
        console.error("Error fetching country codes:", error);
      }
      setIsLoading((prev) => ({ ...prev, countryCodes: false }));
    };

    fetchCountryCodes();
  }, []);

  const fetchJobTitles = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setJobTitleSuggestions([]);
      return;
    }

    setIsLoading((prev) => ({ ...prev, jobTitle: true }));
    try {
      const response = await fetch(
        `https://api.sentryspot.co.uk/api/jobseeker/job-title?job_title_keyword=${encodeURIComponent(
          keyword
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        const jobTitles = data.data.map((item) => item.name);
        setJobTitleSuggestions(jobTitles);
        setShowJobTitleDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching job titles:", error);
    }
    setIsLoading((prev) => ({ ...prev, jobTitle: false }));
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

  const handleAutoFix = async (field, content) => {
    if (!content) return;

    setIsLoading((prev) => ({ ...prev, autoFix: true }));

    try {
      let endpoint = "";
      let key = "";

      if (field === "name") {
        endpoint = "/ai-username";
        key = "user name";
      } else if (field === "position") {
        endpoint = "/ai-jobtitle";
        key = "job title";
      } else if (field === "contactInformation") {
        endpoint = "/ai-contact";
        key = "contact information";
      }

      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://api.sentryspot.co.uk/api/jobseeker${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            key: key,
            keyword: "auto improve",
            content: content,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.data.resume_analysis) {
          let updatedValue = null;

          if (field === "name") {
            updatedValue = data.data.resume_analysis.user_name;
          } else if (field === "position") {
            updatedValue = data.data.resume_analysis.job_title;
          } else if (field === "contactInformation") {
            updatedValue = data.data.resume_analysis.contact;
          }

          if (updatedValue) {
            const event = {
              target: {
                name: field,
                value: updatedValue,
              },
            };
            handleChange(event);
            setActiveTooltip(null);

            // Clear errors for this field
            if (resumeStrength?.personal_info_strenght) {
              const updatedStrength = {
                ...resumeStrength,
                personal_info_strenght: {
                  ...resumeStrength.personal_info_strenght,
                  [field]: [],
                },
              };
              setResumeStrength(updatedStrength);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error auto-fixing ${field}:`, error);
    } finally {
      setIsLoading((prev) => ({ ...prev, autoFix: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(e);

    if (name === "position") {
      fetchJobTitles(value);
    } else if (name === "address") {
      fetchLocations(value);
    }
  };

  const selectSuggestion = (field, value) => {
    const event = {
      target: { name: field, value },
    };
    handleChange(event);
    if (field === "position") {
      setShowJobTitleDropdown(false);
    } else {
      setShowLocationDropdown(false);
    }
  };

  const selectCountryCode = (country) => {
    const newCountryCode = `+${country.phonecode}`;
    setSelectedCountryCode(newCountryCode);

    // Update contact information with new country code
    if (resumeData.contactInformation) {
      const updatedContact = {
        target: {
          name: "contactInformation",
          value: `${newCountryCode} ${resumeData.contactInformation.replace(
            /^(\+\d+\s*)?/,
            ""
          )}`,
        },
      };
      handleChange(updatedContact);
    }

    setShowCountryCodeDropdown(false);
  };

  // const hasErrors = (field) => {
  //   const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
  //   return Array.isArray(strengthInfo) && strengthInfo.length > 0;
  // };

  const getSuggestions = (field) => {
    return resumeStrength?.personal_info_strenght?.[field] || [];
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowJobTitleDropdown(false);
      setShowLocationDropdown(false);
      setShowCountryCodeDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const formFields = [
    { field: "name", placeholder: "Full Name", type: "text" },
    {
      field: "position",
      placeholder: "Job Title",
      type: "text",
      hasSuggestions: true,
    },
    {
      field: "contactInformation",
      placeholder: "Contact Number",
      type: "tel",
      hasCountryCode: true,
    },
    { field: "email", placeholder: "Email", type: "email" },
    {
      field: "address",
      placeholder: "Address",
      type: "text",
      hasSuggestions: true,
    },
  ];
  // const hasErrors = (field) => {
  //   const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
  //   return Array.isArray(strengthInfo) && strengthInfo.length > 0;
  // };
  // const hasErrors = (field) => {
  //   const strengthInfo = resumeStrength?.personal_info_strenght?.[field];

  //   // Special check for contact information to ensure it's validated correctly
  //   if (field === "contactInformation") {
  //     const contactValue = resumeData[field];
  //     console.log("Contact Value: ", contactValue); // Debugging line

  //     const isValidContact = /^(\+\d{1,3}\s?)?\(?\d+\)?[\d\s\-]+$/.test(
  //       contactValue
  //     );
  //     console.log("Is Valid Contact: ", isValidContact); // Debugging line

  //     if (contactValue && !isValidContact) {
  //       return true; // Invalid phone number format
  //     }
  //     return false; // Valid phone number
  //   }

  //   return Array.isArray(strengthInfo) && strengthInfo.length > 0;
  // };
  const hasErrors = (field) => {
    const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
    const fieldValue = resumeData[field]?.trim(); // Trim to check for empty values

    // 1️⃣ Check for empty values (show error if missing)
    if (!fieldValue) return true;

    // 2️⃣ Special validation for contact information
    if (field === "contactInformation") {
      console.log("Contact Value: ", fieldValue); // Debugging

      const isValidContact = /^(\+\d{1,3}\s?)?\(?\d+\)?[\d\s\-]+$/.test(
        fieldValue
      );

      console.log("Is Valid Contact: ", isValidContact); // Debugging

      if (!isValidContact) {
        return true; // Invalid phone number format
      }
    }

    // 3️⃣ Check for API errors in `resumeStrength`
    return Array.isArray(strengthInfo) && strengthInfo.length > 0;
  };

  const handleContactChange = (e) => {
    const { value } = e.target;
    const fullContactValue = `${selectedCountryCode} ${value.replace(
      /^(\+\d+\s*)?/,
      ""
    )}`;

    console.log("Updated Contact Value: ", fullContactValue); // Debugging line

    const updatedContact = {
      target: {
        name: "contactInformation",
        value: fullContactValue,
      },
    };
    handleChange(updatedContact);
  };

  return (
    <div className="flex flex-col gap-3 w-full items-center md:mt-10 p-4 md:px-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-white">
        Detail Information
      </h2>

      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex flex-col items-center gap-4">
          <img
            src={resumeData.profilePicture || dummyImage}
            alt="Profile"
            className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover"
          />
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            className="bg-gray-300 text-sm text-black py-2 px-4 rounded-md cursor-pointer hover:bg-gray-400 transition-colors"
            onChange={handleProfilePicture}
          />
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xl">
          {formFields.map(
            ({ field, placeholder, type, hasSuggestions, hasCountryCode }) => (
              <div
                key={field}
                className="relative group"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center relative">
                  {/* If field has a country code (for contact number) */}

                  {hasCountryCode && (
                    <div className="relative w-full">
                      <div className="flex items-center">
                        {/* Country Code Selector */}
                        <div
                          className="absolute left-2 z-10 flex items-center cursor-pointer"
                          onClick={() =>
                            setShowCountryCodeDropdown(!showCountryCodeDropdown)
                          }
                        >
                          <span className="text-gray-700 mr-1">
                            {selectedCountryCode}
                          </span>
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        </div>

                        {/* Input Field for Contact Information */}
                        {showCountryCodeDropdown && (
                          <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg z-50">
                            {countryCodes.map((country) => (
                              <div
                                key={country.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                                onClick={() => selectCountryCode(country)}
                              >
                                <span>{country.name}</span>
                                <span>+{country.phonecode}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <input
                          type={type}
                          placeholder={placeholder}
                          name={field}
                          className={`w-full p-2 pl-16 border rounded-md outline-none transition-colors ${
                            improve && hasErrors(field)
                              ? "border-red-500 focus:border-red-600"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          value={
                            resumeData[field]
                              ? resumeData[field].replace(/^(\+\d+\s*)?/, "")
                              : ""
                          }
                          onChange={
                            field === "contactInformation"
                              ? handleContactChange
                              : handleInputChange
                          }
                        />

                        {/* Error Icon for Contact Information */}
                        {improve && hasErrors(field) && (
                          <button
                            type="button"
                            className="absolute right-2 mt-2 text-red-500 hover:text-red-600 transition-colors"
                            onClick={() =>
                              setActiveTooltip(
                                activeTooltip === field ? null : field
                              )
                            }
                            aria-label="Show suggestions"
                          >
                            <AlertCircle className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* If field does NOT have a country code */}
                  {!hasCountryCode && (
                    <div className="relative w-full">
                      {/* Input Field */}
                      <input
                        type={type}
                        placeholder={placeholder}
                        name={field}
                        className={`w-full p-2 border rounded-md outline-none transition-colors ${
                          improve && hasErrors(field)
                            ? "border-red-500 focus:border-red-600"
                            : "border-gray-300 focus:border-blue-500"
                        }`}
                        value={resumeData[field] || ""}
                        onChange={handleInputChange}
                        onFocus={() => {
                          if (field === "position")
                            setShowJobTitleDropdown(true);
                          if (field === "address")
                            setShowLocationDropdown(true);
                        }}
                      />

                      {/* Error Icon for Other Fields */}
                      {improve && hasErrors(field) && (
                        <button
                          type="button"
                          className="absolute right-2 mt-2 text-red-500 hover:text-red-600 transition-colors"
                          onClick={() =>
                            setActiveTooltip(
                              activeTooltip === field ? null : field
                            )
                          }
                          aria-label="Show suggestions"
                        >
                          <AlertCircle className="w-5 h-5" />
                        </button>
                      )}

                      {/* Loading Indicator for Job Title & Address Suggestions */}
                      {hasSuggestions &&
                        isLoading[
                          field === "position" ? "jobTitle" : "location"
                        ] && (
                          <div className="absolute right-8">
                            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                          </div>
                        )}
                    </div>
                  )}
                </div>

                {hasSuggestions &&
                  (field === "position"
                    ? showJobTitleDropdown && jobTitleSuggestions.length > 0
                    : showLocationDropdown &&
                      locationSuggestions.length > 0) && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {(field === "position"
                        ? jobTitleSuggestions
                        : locationSuggestions
                      ).map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                          onClick={() => selectSuggestion(field, suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}

                {activeTooltip === field && hasErrors(field) && (
                  <div className="absolute z-50 left-8  w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <span className="font-medium text-black">
                            Suggestions
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {(field === "name" ||
                            field === "position" ||
                            field === "contactInformation") && (
                            <button
                              onClick={() =>
                                handleAutoFix(field, resumeData[field])
                              }
                              disabled={
                                isLoading.autoFix || !resumeData[field]?.trim()
                              } // ✅ Disable when empty
                              className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isLoading.autoFix ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                "Auto Fix"
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => setActiveTooltip(null)}
                            className="text-black transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      {getSuggestions(field).map((msg, i) => (
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
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
