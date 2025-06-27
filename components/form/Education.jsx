
// import { ResumeContext } from "../context/ResumeContext";
// import FormButton from "./FormButton";
// import React, { useContext, useState } from "react";
// import { AlertCircle, X, Loader2, Trash2, Trash } from "lucide-react";
// import { useRouter } from "next/router";
// import { MdRemoveCircle } from "react-icons/md";
// import { toast } from "react-toastify";

// const Education = () => {
//   const { resumeData, setResumeData, resumeStrength } =
//     useContext(ResumeContext);
//   const [activeTooltip, setActiveTooltip] = useState(null);
//   const [universitySuggestions, setUniversitySuggestions] = useState([]);
//   const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
//   const [degreeSuggestions, setDegreeSuggestions] = useState([]);
//   const [showDegreeDropdown, setShowDegreeDropdown] = useState(false);
//   const [locationSuggestions, setLocationSuggestions] = useState([]);
//   const [showLocationDropdown, setShowLocationDropdown] = useState(false);
//   const [isLoading, setIsLoading] = useState({
//     university: false,
//     location: false,
//   });
//   const router = useRouter();
//   const { improve } = router.query;

//   const handleEducation = (e, index) => {
//     const { name, value } = e.target;
//     const newEducation = [...resumeData.education];
//     newEducation[index][name] = value;
//     setResumeData({ ...resumeData, education: newEducation });

//     if (name === "school") {
//       fetchUniversities(value, index);
//     }
//     if (name == "degree") {
//       fetchDegrees(value, index);
//     }
//     if (name === "location") {
//       fetchLocations(value);
//     }
//   };

//   const fetchUniversities = async (keyword, index) => {
//     if (!keyword || keyword.length < 1) {
//       setUniversitySuggestions([]);
//       return;
//     }

//     setIsLoading((prev) => ({ ...prev, university: true }));
//     try {
//       const response = await fetch(
//         `https://api.sentryspot.co.uk/api/jobseeker/university-lists?university_keyword=${encodeURIComponent(
//           keyword
//         )}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setUniversitySuggestions(data?.data?.map((item) => item.name));
//         setShowUniversityDropdown(true);
//       }
//     } catch (error) {
//       console.error("Error fetching universities:", error);
//     }
//     setIsLoading((prev) => ({ ...prev, university: false }));
//   };

//   const fetchDegrees = async (keyword, index) => {
//     if (!keyword || keyword.length < 1) {
//       setDegreeSuggestions([]);
//       return;
//     }

//     setIsLoading((prev) => ({ ...prev, degree: true }));
//     try {
//       const response = await fetch(
//         `https://api.sentryspot.co.uk/api/jobseeker/degree?degree_keyword=${encodeURIComponent(
//           keyword
//         )}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setDegreeSuggestions(data.data.map((item) => item.name));
//         setShowDegreeDropdown(true);
//       }
//     } catch (error) {
//       console.error("Error fetching degrees:", error);
//     }
//     setIsLoading((prev) => ({ ...prev, degree: false }));
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

//   const selectUniversity = (value, index) => {
//     const newEducation = [...resumeData.education];
//     newEducation[index].school = value;
//     setResumeData({ ...resumeData, education: newEducation });
//     setShowUniversityDropdown(false);
//   };

//   const selectLocation = (value, index) => {
//     const newEducation = [...resumeData.education];
//     newEducation[index].location = value;
//     setResumeData({ ...resumeData, education: newEducation });
//     setShowLocationDropdown(false);
//   };

//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   const years = Array.from(
//     { length: 50 },
//     (_, i) => new Date().getFullYear() - i
//   );

//   // Fix to prevent comma-only values
//   const formatDateValue = (month, year) => {
//     if (month && year) {
//       return `${month},${year}`;
//     } else if (month) {
//       return month;
//     } else if (year) {
//       return year;
//     } else {
//       return "";
//     }
//   };

//   const handleMonthChange = (e, index, field) => {
//     const newEducation = [...resumeData.education];
//     const newMonth = e.target.value;

//     // Get the current year value
//     let year = "";
//     if (newEducation[index][field]) {
//       const parts = newEducation[index][field].split(",");
//       if (parts.length > 1) {
//         year = parts[1];
//       } else if (parts.length === 1 && !months.includes(parts[0])) {
//         // If there's only one part and it's not a month, it must be a year
//         year = parts[0];
//       }
//     }

//     // Format the new value
//     newEducation[index][field] = formatDateValue(newMonth, year);

//     setResumeData({ ...resumeData, education: newEducation });
//   };

//   const handleYearChange = (e, index, field) => {
//     const newEducation = [...resumeData.education];
//     const newYear = e.target.value;

//     // Get the current month value
//     let month = "";
//     if (newEducation[index][field]) {
//       const parts = newEducation[index][field].split(",");
//       if (parts.length > 0 && months.includes(parts[0])) {
//         month = parts[0];
//       }
//     }

//     // Format the new value
//     newEducation[index][field] = formatDateValue(month, newYear);

//     setResumeData({ ...resumeData, education: newEducation });
//   };

//   const handlePresentToggle = (index) => {
//     const newEducation = [...resumeData.education];
//     newEducation[index].endYear =
//       newEducation[index].endYear === "Present" ? "" : "Present";
//     setResumeData({ ...resumeData, education: newEducation });
//   };

//   const addEducation = () => {
//     setResumeData({
//       ...resumeData,
//       education: [
//         ...resumeData.education,
//         {
//           school: "",
//           degree: "",
//           startYear: "",
//           endYear: "",
//           location: "",
//         },
//       ],
//     });
//   };

//   // const removeEducation = (index) => {
//   //   const newEducation = [...resumeData.education];
//   //   newEducation.splice(index, 1);
//   //   setResumeData({ ...resumeData, education: newEducation });
//   // };

//   const removeEducation = (index) => {
//     // Check if this is the last education entry
//     if (resumeData.education.length <= 1) {
//       toast.warn("At least one Education is required")
      
//       // Clear the error message after 3 seconds
//       // setTimeout(() => {
//       //   // const updatedErrors = {...validationErrors};
//       //   delete updatedErrors.general;
//       //   setValidationErrors(updatedErrors);
//       // }, 3000);
//       return; // Don't remove if it's the last one
//     }
    
//     const newEducation = [...resumeData.education];
//     newEducation.splice(index, 1);
    
//     // Clear any errors related to this index
//     // const updatedErrors = {};
//     // Object.keys(validationErrors).forEach(key => {
//     //   if (!key.startsWith(`${index}-`)) {
//     //     updatedErrors[key] = validationErrors[key];
//     //   }
//     // });
//     // setValidationErrors(updatedErrors);
    
//     setResumeData({ ...resumeData, education: newEducation });
//   };

//   const hasErrors = (index, field) => {
//     const educationStrength = resumeStrength?.education_strenght?.[index];
//     return educationStrength && educationStrength[field] !== null;
//   };

//   const getErrorMessage = (index, field) => {
//     const educationStrength = resumeStrength?.education_strenght?.[index];
//     if (educationStrength && Array.isArray(educationStrength[field])) {
//       return educationStrength[field];
//     }
//     return null;
//   };

//   // Parse date string to get month and year
//   const getDatePart = (dateStr, part) => {
//     if (!dateStr) return "";
//     if (dateStr === "Present") return part === "month" ? "" : dateStr;

//     const parts = dateStr.split(",");

//     // If there's only one part, determine if it's a month or year
//     if (parts.length === 1) {
//       if (months.includes(parts[0]) && part === "month") {
//         return parts[0];
//       } else if (!isNaN(parts[0]) && part === "year") {
//         return parts[0];
//       } else {
//         return "";
//       }
//     }

//     // If there are two parts, return the appropriate one
//     if (part === "month") {
//       return parts[0] || "";
//     } else {
//       return parts[1] || "";
//     }
//   };

//   // Close dropdowns when clicking outside
//   React.useEffect(() => {
//     const handleClickOutside = () => {
//       setShowUniversityDropdown(false);
//       setShowLocationDropdown(false);
//       setShowDegreeDropdown(false);
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   // Clean up any existing data that might have just commas
//   React.useEffect(() => {
//     const needsCleanup = resumeData.education?.some(
//       (edu) => edu.startYear === "," || edu.endYear === ","
//     );

//     if (needsCleanup) {
//       const cleanedEducation = resumeData.education.map((edu) => ({
//         ...edu,
//         startYear: edu.startYear === "," ? "" : edu.startYear,
//         endYear: edu.endYear === "," ? "" : edu.endYear,
//       }));

//       setResumeData({
//         ...resumeData,
//         education: cleanedEducation,
//       });
//     }
//   }, []);

//   const renderTooltip = (index, field, title) => {
//     if (activeTooltip === `${field}-${index}`) {
//       return (
//         <div className="absolute z-50 right-0 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
//           <div className="p-4 border-b border-gray-700">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <AlertCircle className="w-5 h-5 text-red-400" />
//                 <span className="font-medium text-black">
//                   {title || "Suggestions"}
//                 </span>
//               </div>
//               <button
//                 onClick={() => setActiveTooltip(null)}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//           <div className="p-4">
//             {getErrorMessage(index, field)?.map((msg, i) => (
//               <div
//                 key={i}
//                 className="flex items-start space-x-3 mb-3 last:mb-0"
//               >
//                 <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
//                 <p className="text-black text-sm">{msg}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="flex-col gap-3 w-full md:mt-10 md:px-10">
//       <h2 className="input-title text-white text-3xl">Education</h2>
//       {resumeData.education && resumeData.education.length > 0 ? (
//         resumeData.education?.map((education, index) => (
//           <div key={index} className="f-col">
//             <div className="relative mb-4">
//               <div className="flex items-center justify-between mt-4 pb-4">
//                 <h3 className="text-white text-xl font-semibold">
//                   {`Education ${index + 1}`}
//                 </h3>
//                 <button
//                   type="button"
//                   onClick={() => removeEducation(index)}
//                   aria-label="Remove"
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
//                 >
//                   <Trash />
//                 </button>
//               </div>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="School"
//                   name="school"
//                   className={`w-full other-input border ${
//                     hasErrors(index, "school")
//                       ? "border-red-500"
//                       : "border-black"
//                   }`}
//                   value={education.school}
//                   onChange={(e) => handleEducation(e, index)}
//                   onClick={(e) => e.stopPropagation()}
//                 />
//                 {isLoading.university && (
//                   <div className="absolute right-8 top-1/2 -translate-y-1/2">
//                     <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
//                   </div>
//                 )}
//                 {improve && hasErrors(index, "school") && (
//                   <button
//                     type="button"
//                     className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
//                     onClick={() =>
//                       setActiveTooltip(
//                         activeTooltip === `school-${index}`
//                           ? null
//                           : `school-${index}`
//                       )
//                     }
//                   >
//                     <AlertCircle className="w-5 h-5" />
//                   </button>
//                 )}
//               </div>

//               {showUniversityDropdown && universitySuggestions?.length > 0 && (
//                 <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
//                   {universitySuggestions.map((university, i) => (
//                     <div
//                       key={i}
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
//                       onClick={() => selectUniversity(university, index)}
//                     >
//                       {university}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {renderTooltip(index, "school", "School Suggestions")}
//             </div>

//             <div className="relative mb-4">
//               <input
//                 type="text"
//                 placeholder="Degree"
//                 name="degree"
//                 className={`w-full other-input border ${
//                   improve && hasErrors(index, "degree")
//                     ? "border-red-500"
//                     : "border-black"
//                 }`}
//                 value={education.degree}
//                 onChange={(e) => {
//                   handleEducation(e, index);
//                   fetchDegrees(e.target.value, index);
//                 }}
//                 onFocus={() => setShowDegreeDropdown(true)}
//                 onBlur={() =>
//                   setTimeout(() => setShowDegreeDropdown(false), 200)
//                 }
//               />
//               {improve && hasErrors(index, "degree") && (
//                 <button
//                   type="button"
//                   className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
//                   onClick={() =>
//                     setActiveTooltip(
//                       activeTooltip === `degree-${index}`
//                         ? null
//                         : `degree-${index}`
//                     )
//                   }
//                 >
//                   <AlertCircle className="w-5 h-5" />
//                 </button>
//               )}
//               {renderTooltip(index, "degree", "Degree Suggestions")}

//               {showDegreeDropdown && degreeSuggestions.length > 0 && (
//                 <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md  shadow-lg">
//                   {degreeSuggestions.map((degree, i) => (
//                     <li
//                       key={i}
//                       className="px-3 py-2 cursor-pointer hover:bg-gray-200"
//                       onMouseDown={() => {
//                         handleEducation(
//                           { target: { name: "degree", value: degree } },
//                           index
//                         );
//                         setShowDegreeDropdown(false);
//                       }}
//                     >
//                       {degree}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             <div className="relative">
//               {/* Start Date */}
//               <label className="text-white">Start Date</label>
//               <div className="flex flex-wrap gap-2 relative">
//                 <select
//                   className={`border other-input flex-1 ${
//                     improve && hasErrors(index, "startYear")
//                       ? "border-red-500"
//                       : "border-black"
//                   }`}
//                   value={getDatePart(education.startYear, "month")}
//                   onChange={(e) => handleMonthChange(e, index, "startYear")}
//                 >
//                   <option value="">Month</option>
//                   {months.map((month, idx) => (
//                     <option key={idx} value={month}>
//                       {month}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   className={`border other-input flex-1 ${
//                     improve && hasErrors(index, "startYear")
//                       ? "border-red-500"
//                       : "border-black"
//                   }`}
//                   value={getDatePart(education.startYear, "year")}
//                   onChange={(e) => handleYearChange(e, index, "startYear")}
//                 >
//                   <option value="">Year</option>
//                   {years.map((year, idx) => (
//                     <option key={idx} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>

//                 {improve && hasErrors(index, "startYear") && (
//                   <>
//                     <button
//                       type="button"
//                       className="absolute right-[2px] top-[-1.5rem] text-red-500"
//                       onClick={() =>
//                         setActiveTooltip(
//                           activeTooltip === `startYear-${index}`
//                             ? null
//                             : `startYear-${index}`
//                         )
//                       }
//                     >
//                       <AlertCircle className="w-5 h-5" />
//                     </button>

//                     {activeTooltip === `startYear-${index}` && (
//                       <div className="absolute right-0 top-14 w-80 bg-white rounded-lg shadow-xl border border-gray-700 z-50">
//                         <div className="p-4 border-b border-gray-700">
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2">
//                               <AlertCircle className="w-5 h-5 text-red-400" />
//                               <span className="font-medium text-black">
//                                 Start Date Issues
//                               </span>
//                             </div>
//                             <button
//                               onClick={() => setActiveTooltip(null)}
//                               className="text-black transition-colors"
//                             >
//                               <X className="w-5 h-5" />
//                             </button>
//                           </div>
//                         </div>
//                         <div className="p-4">
//                           {getErrorMessage(index, "startYear").map((msg, i) => (
//                             <div
//                               key={i}
//                               className="flex items-start space-x-3 mb-3 last:mb-0"
//                             >
//                               <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
//                               <p className="text-black text-sm">{msg}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>

//               {/* End Date */}
//               <label className="mt-4 block text-white">End Date</label>
//               <div className="flex flex-wrap gap-2 relative">
//                 <select
//                   className={`border other-input flex-1 ${
//                     improve && hasErrors(index, "endYear")
//                       ? "border-red-500"
//                       : "border-black"
//                   }`}
//                   value={getDatePart(education.endYear, "month")}
//                   onChange={(e) => handleMonthChange(e, index, "endYear")}
//                   disabled={education.endYear === "Present"}
//                 >
//                   <option value="">Month</option>
//                   {months.map((month, idx) => (
//                     <option key={idx} value={month}>
//                       {month}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   className={`border other-input flex-1 ${
//                     improve && hasErrors(index, "endYear")
//                       ? "border-red-500"
//                       : "border-black"
//                   }`}
//                   value={getDatePart(education.endYear, "year")}
//                   onChange={(e) => handleYearChange(e, index, "endYear")}
//                   disabled={education.endYear === "Present"}
//                 >
//                   <option value="">Year</option>
//                   {years.map((year, idx) => (
//                     <option key={idx} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//                 <label className="flex flex-1 items-center gap-1 other-input text-xl">
//                   <input
//                     type="checkbox"
//                     checked={education.endYear === "Present"}
//                     onChange={() => handlePresentToggle(index)}
//                     className="w-6 h-6"
//                   />
//                   Present
//                 </label>

//                 {improve && hasErrors(index, "endYear") && (
//                   <>
//                     <button
//                       type="button"
//                       className="absolute right-[2px] top-[-1.5rem] text-red-500"
//                       onClick={() =>
//                         setActiveTooltip(
//                           activeTooltip === `endYear-${index}`
//                             ? null
//                             : `endYear-${index}`
//                         )
//                       }
//                     >
//                       <AlertCircle className="w-5 h-5" />
//                     </button>

//                     {activeTooltip === `endYear-${index}` && (
//                       <div className="absolute right-0 top-14 w-80 bg-white rounded-lg shadow-xl border border-gray-700 z-50">
//                         <div className="p-4 border-b border-gray-700">
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2">
//                               <AlertCircle className="w-5 h-5 text-red-400" />
//                               <span className="font-medium text-black">
//                                 End Date Issues
//                               </span>
//                             </div>
//                             <button
//                               onClick={() => setActiveTooltip(null)}
//                               className="text-black transition-colors"
//                             >
//                               <X className="w-5 h-5" />
//                             </button>
//                           </div>
//                         </div>
//                         <div className="p-4">
//                           {getErrorMessage(index, "endYear")?.map((msg, i) => (
//                             <div
//                               key={i}
//                               className="flex items-start space-x-3 mb-3 last:mb-0"
//                             >
//                               <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
//                               <p className="text-black text-sm">{msg}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>

//             <div className="relative">
//               <label className="mt-2 text-white">Location</label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Location"
//                   name="location"
//                   className={`w-full other-input border ${
//                     improve && hasErrors(index, "location")
//                       ? "border-red-500"
//                       : "border-black"
//                   }`}
//                   value={education.location}
//                   onChange={(e) => handleEducation(e, index)}
//                   onClick={(e) => e.stopPropagation()}
//                 />
//                 {isLoading.location && (
//                   <div className="absolute right-8 top-1/2 -translate-y-1/2">
//                     <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
//                   </div>
//                 )}
//                 {improve && hasErrors(index, "location") && (
//                   <button
//                     type="button"
//                     className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
//                     onClick={() =>
//                       setActiveTooltip(
//                         activeTooltip === `location-${index}`
//                           ? null
//                           : `location-${index}`
//                       )
//                     }
//                   >
//                     <AlertCircle className="w-5 h-5" />
//                   </button>
//                 )}
//               </div>

//               {showLocationDropdown && locationSuggestions.length > 0 && (
//                 <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
//                   {locationSuggestions.map((location, i) => (
//                     <div
//                       key={i}
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
//                       onClick={() => selectLocation(location, index)}
//                     >
//                       {location}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {renderTooltip(index, "location", "Location Suggestions")}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-white my-2">
//           No Education available. Add a new one to get started.
//         </p>
//       )}
//       <FormButton
//         size={resumeData.education.length}
//         add={addEducation}
//         remove={removeEducation}
//       />
//     </div>
//   );
// };

// export default Education;




"use client"

import { ResumeContext } from "../context/ResumeContext"
import FormButton from "./FormButton"
import React, { useContext, useState } from "react"
import { AlertCircle, X, Loader2, Trash, ChevronDown, ChevronUp } from "lucide-react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

const Education = () => {
  const { resumeData, setResumeData, resumeStrength } = useContext(ResumeContext)
  const [activeTooltip, setActiveTooltip] = useState(null)
  const [universitySuggestions, setUniversitySuggestions] = useState([])
  const [degreeSuggestions, setDegreeSuggestions] = useState([])
  const [locationSuggestions, setLocationSuggestions] = useState([])
  const [focusedField, setFocusedField] = useState({ index: null, field: null })
  const [isLoading, setIsLoading] = useState({
    university: false,
    location: false,
    degree: false,
  })
  const [expandedSections, setExpandedSections] = useState({})
  const router = useRouter()
  const { improve } = router.query

  // Toggle section expansion
  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const handleEducation = (e, index) => {
    const { name, value } = e.target
    const newEducation = [...resumeData.education]
    newEducation[index][name] = value
    setResumeData({ ...resumeData, education: newEducation })

    if (name === "school") {
      fetchUniversities(value, index)
    }
    if (name === "degree") {
      fetchDegrees(value, index)
    }
    if (name === "location") {
      fetchLocations(value)
    }
  }

  const fetchUniversities = async (keyword, index) => {
    if (!keyword || keyword.length < 1) {
      setUniversitySuggestions([])
      return
    }

    setIsLoading((prev) => ({ ...prev, university: true }))
    try {
      const response = await fetch(
        `https://api.sentryspot.co.uk/api/jobseeker/university-lists?university_keyword=${encodeURIComponent(keyword)}`,
      )
      if (response.ok) {
        const data = await response.json()
        setUniversitySuggestions(data?.data?.map((item) => item.name))
      }
    } catch (error) {
      console.error("Error fetching universities:", error)
    }
    setIsLoading((prev) => ({ ...prev, university: false }))
  }

  const fetchDegrees = async (keyword, index) => {
    if (!keyword || keyword.length < 1) {
      setDegreeSuggestions([])
      return
    }

    setIsLoading((prev) => ({ ...prev, degree: true }))
    try {
      const response = await fetch(
        `https://api.sentryspot.co.uk/api/jobseeker/degree?degree_keyword=${encodeURIComponent(keyword)}`,
      )
      if (response.ok) {
        const data = await response.json()
        setDegreeSuggestions(data.data?.map((item) => item.name) || [])
      }
    } catch (error) {
      console.error("Error fetching degrees:", error)
    }
    setIsLoading((prev) => ({ ...prev, degree: false }))
  }

  const fetchLocations = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setLocationSuggestions([])
      return
    }

    setIsLoading((prev) => ({ ...prev, location: true }))
    try {
      const response = await fetch(
        `https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${encodeURIComponent(keyword)}`,
      )
      if (response.ok) {
        const data = await response.json()
        const locations = data?.data?.location_names?.map((item) => item) || [];
        setLocationSuggestions(locations)
      }
    } catch (error) {
      console.error("Error fetching locations:", error)
    }
    setIsLoading((prev) => ({ ...prev, location: false }))
  }

  const selectUniversity = (value, index) => {
    const newEducation = [...resumeData.education]
    newEducation[index].school = value
    setResumeData({ ...resumeData, education: newEducation })
    setFocusedField({ index: null, field: null })
  }

  const selectDegree = (value, index) => {
    const newEducation = [...resumeData.education]
    newEducation[index].degree = value
    setResumeData({ ...resumeData, education: newEducation })
    setFocusedField({ index: null, field: null })
  }

  const selectLocation = (value, index) => {
    const newEducation = [...resumeData.education]
    newEducation[index].location = value
    setResumeData({ ...resumeData, education: newEducation })
    setFocusedField({ index: null, field: null })
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i)

  // Fix to prevent comma-only values
  const formatDateValue = (month, year) => {
    if (month && year) {
      return `${month},${year}`
    } else if (month) {
      return month
    } else if (year) {
      return year
    } else {
      return ""
    }
  }

  const handleMonthChange = (e, index, field) => {
    const newEducation = [...resumeData.education]
    const newMonth = e.target.value

    // Get the current year value
    let year = ""
    if (newEducation[index][field]) {
      const parts = newEducation[index][field].split(",")
      if (parts.length > 1) {
        year = parts[1]
      } else if (parts.length === 1 && !months.includes(parts[0])) {
        // If there's only one part and it's not a month, it must be a year
        year = parts[0]
      }
    }

    // Format the new value
    newEducation[index][field] = formatDateValue(newMonth, year)

    setResumeData({ ...resumeData, education: newEducation })
  }

  const handleYearChange = (e, index, field) => {
    const newEducation = [...resumeData.education]
    const newYear = e.target.value

    // Get the current month value
    let month = ""
    if (newEducation[index][field]) {
      const parts = newEducation[index][field].split(",")
      if (parts.length > 0 && months.includes(parts[0])) {
        month = parts[0]
      }
    }

    // Format the new value
    newEducation[index][field] = formatDateValue(month, newYear)

    setResumeData({ ...resumeData, education: newEducation })
  }

  const handlePresentToggle = (index) => {
    const newEducation = [...resumeData.education]
    newEducation[index].endYear = newEducation[index].endYear === "Present" ? "" : "Present"
    setResumeData({ ...resumeData, education: newEducation })
  }

  const addEducation = () => {
    const newEducation = {
      school: "",
      degree: "",
      startYear: "",
      endYear: "",
      location: "",
    }

    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation],
    })

    // Auto-expand the newly added education section
    const newIndex = resumeData.education.length
    setExpandedSections((prev) => ({
      ...prev,
      [newIndex]: true,
    }))
  }

  const removeEducation = (index) => {
    // Check if this is the last education entry
    if (resumeData.education.length <= 1) {
      toast.warn("At least one Education is required")
      return // Don't remove if it's the last one
    }
    const newEducation = [...resumeData.education]
    newEducation.splice(index, 1)
    setResumeData({ ...resumeData, education: newEducation })

    // Update expanded sections after removal
    const updatedExpandedSections = { ...expandedSections }
    delete updatedExpandedSections[index]

    // Shift keys for sections after the removed one
    Object.keys(updatedExpandedSections).forEach((key) => {
      const numKey = Number.parseInt(key)
      if (numKey > index) {
        updatedExpandedSections[numKey - 1] = updatedExpandedSections[numKey]
        delete updatedExpandedSections[numKey]
      }
    })

    setExpandedSections(updatedExpandedSections)
  }

  const hasErrors = (index, field) => {
    const educationStrength = resumeStrength?.education_strenght?.[index]
    return educationStrength && educationStrength[field] !== null
  }

  const getErrorMessage = (index, field) => {
    const educationStrength = resumeStrength?.education_strenght?.[index]
    if (educationStrength && Array.isArray(educationStrength[field])) {
      return educationStrength[field]
    }
    return null
  }

  // Parse date string to get month and year
  const getDatePart = (dateStr, part) => {
    if (!dateStr) return ""
    if (dateStr === "Present") return part === "month" ? "" : dateStr

    const parts = dateStr.split(",")

    // If there's only one part, determine if it's a month or year
    if (parts.length === 1) {
      if (months.includes(parts[0]) && part === "month") {
        return parts[0]
      } else if (!isNaN(parts[0]) && part === "year") {
        return parts[0]
      } else {
        return ""
      }
    }

    // If there are two parts, return the appropriate one
    if (part === "month") {
      return parts[0] || ""
    } else {
      return parts[1] || ""
    }
  }

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      // Only clear focused field if clicking outside of any dropdown
      if (!e.target.closest(".dropdown-container")) {
        setFocusedField({ index: null, field: null })
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  // Initialize expanded sections on first render
  React.useEffect(() => {
    if (resumeData.education?.length > 0 && Object.keys(expandedSections).length === 0) {
      // By default, expand the first education section
      setExpandedSections({ 0: true })
    }
  }, [resumeData.education])

  // Clean up any existing data that might have just commas
  React.useEffect(() => {
    const needsCleanup = resumeData.education?.some((edu) => edu.startYear === "," || edu.endYear === ",")

    if (needsCleanup) {
      const cleanedEducation = resumeData.education.map((edu) => ({
        ...edu,
        startYear: edu.startYear === "," ? "" : edu.startYear,
        endYear: edu.endYear === "," ? "" : edu.endYear,
      }))

      setResumeData({
        ...resumeData,
        education: cleanedEducation,
      })
    }
  }, [])

  const renderTooltip = (index, field, title) => {
    if (activeTooltip === `${field}-${index}`) {
      return (
        <div className="absolute z-50 right-0 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="font-medium text-black">{title || "Suggestions"}</span>
              </div>
              <button
                onClick={() => setActiveTooltip(null)}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-4">
            {getErrorMessage(index, field)?.map((msg, i) => (
              <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                <p className="text-black text-sm">{msg}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex-col gap-3 w-full md:mt-10 md:px-10">
      <h2 className="input-title text-white text-3xl">Education</h2>
      {resumeData.education && resumeData.education.length > 0 ? (
        resumeData.education?.map((education, index) => (
          <div key={index} className="border border-gray-300 rounded-lg mb-4 overflow-hidden shadow-sm">
            {/* Header with expand/collapse functionality */}
            <div
              className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleSection(index)}
            >
              <div className="flex items-center ">
               
                <h3 className="break-words whitespace-normal text-black text-xl font-semibold">
                  {education.school || education.degree
                    ? `${education.school || "School"}`
                    : `Education ${index + 1}`}
                </h3>
              </div>
               <div className="flex justify-center items-center gap-2">
                {expandedSections[index] ? (
                  <ChevronUp className="w-5 h-5 mr-2" />
                ) : (
                  <ChevronDown className="w-5 h-5 mr-2" />
                )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeEducation(index)
                }}
                aria-label="Remove"
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
              >
                <Trash className="w-4 h-4" />
              </button>
               </div>
            </div>

            {/* Collapsible content */}
            {expandedSections[index] && (
              <div className="p-4 bg-white">
                <div className="relative mb-4">
                  <label className="text-black py-1 block">School/University</label>
                  <div className="relative dropdown-container">
                    <input
                      type="text"
                      placeholder="School"
                      name="school"
                      className={`w-full other-input border ${
                        hasErrors(index, "school") ? "border-red-500" : "border-black"
                      }`}
                      value={education.school}
                      onChange={(e) => handleEducation(e, index)}
                      onClick={(e) => {
                        e.stopPropagation()
                        setFocusedField({ index, field: "school" })
                      }}
                      maxLength={50}
                    />
                    {isLoading.university && (
                      <div className="absolute right-8 top-1/2 -translate-y-1/2">
                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                      </div>
                    )}
                    {improve && hasErrors(index, "school") && (
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveTooltip(activeTooltip === `school-${index}` ? null : `school-${index}`)
                        }}
                      >
                        <AlertCircle className="w-5 h-5" />
                      </button>
                    )}

                    {focusedField.index === index &&
                      focusedField.field === "school" &&
                      universitySuggestions?.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                          {universitySuggestions.map((university, i) => (
                            <div
                              key={i}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                              onClick={(e) => {
                                e.stopPropagation()
                                selectUniversity(university, index)
                              }}
                            >
                              {university}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                  {renderTooltip(index, "school", "School Suggestions")}
                </div>

                <div className="relative mb-4">
                  <label className="text-black py-1 block">Degree</label>
                  <div className="relative dropdown-container">
                    <input
                      type="text"
                      placeholder="Degree"
                      name="degree"
                      className={`w-full other-input border ${
                        improve && hasErrors(index, "degree") ? "border-red-500" : "border-black"
                      }`}
                      value={education.degree}
                      onChange={(e) => {
                        handleEducation(e, index)
                        fetchDegrees(e.target.value, index)
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setFocusedField({ index, field: "degree" })
                      }}
                      maxLength={50}
                    />
                    {isLoading.degree && (
                      <div className="absolute right-8 top-1/2 -translate-y-1/2">
                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                      </div>
                    )}
                    {improve && hasErrors(index, "degree") && (
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveTooltip(activeTooltip === `degree-${index}` ? null : `degree-${index}`)
                        }}
                      >
                        <AlertCircle className="w-5 h-5" />
                      </button>
                    )}
                    {renderTooltip(index, "degree", "Degree Suggestions")}

                    {focusedField.index === index &&
                      focusedField.field === "degree" &&
                      degreeSuggestions.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                          {degreeSuggestions.map((degree, i) => (
                            <div
                              key={i}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                              onClick={(e) => {
                                e.stopPropagation()
                                selectDegree(degree, index)
                              }}
                            >
                              {degree}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>

                <div className="relative mb-4">
                  {/* Start Date */}
                  <div className="flex justify-between py-1">
                    <label className="text-black">Start Date</label>
                    {improve && hasErrors(index, "startYear") && (
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveTooltip(activeTooltip === `startYear-${index}` ? null : `startYear-${index}`)
                        }}
                      >
                        <AlertCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 relative">
                    <select
                      className={`border other-input flex-1 ${
                        improve && hasErrors(index, "startYear") ? "border-red-500" : "border-black"
                      }`}
                      value={getDatePart(education.startYear, "month")}
                      onChange={(e) => handleMonthChange(e, index, "startYear")}
                    >
                      <option value="">Month</option>
                      {months.map((month, idx) => (
                        <option key={idx} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      className={`border other-input flex-1 ${
                        improve && hasErrors(index, "startYear") ? "border-red-500" : "border-black"
                      }`}
                      value={getDatePart(education.startYear, "year")}
                      onChange={(e) => handleYearChange(e, index, "startYear")}
                    >
                      <option value="">Year</option>
                      {years.map((year, idx) => (
                        <option key={idx} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  {renderTooltip(index, "startYear", "Start Date Issues")}
                </div>

                <div className="relative mb-4">
                  {/* End Date */}
                  <div className="flex justify-between py-1">
                    <label className="text-black">End Date</label>
                    {improve && hasErrors(index, "endYear") && (
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveTooltip(activeTooltip === `endYear-${index}` ? null : `endYear-${index}`)
                        }}
                      >
                        <AlertCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 relative">
                    <select
                      className={`border other-input flex-1 ${
                        improve && hasErrors(index, "endYear") ? "border-red-500" : "border-black"
                      }`}
                      value={getDatePart(education.endYear, "month")}
                      onChange={(e) => handleMonthChange(e, index, "endYear")}
                      disabled={education.endYear === "Present"}
                    >
                      <option value="">Month</option>
                      {months.map((month, idx) => (
                        <option key={idx} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      className={`border other-input flex-1 ${
                        improve && hasErrors(index, "endYear") ? "border-red-500" : "border-black"
                      }`}
                      value={getDatePart(education.endYear, "year")}
                      onChange={(e) => handleYearChange(e, index, "endYear")}
                      disabled={education.endYear === "Present"}
                    >
                      <option value="">Year</option>
                      {years.map((year, idx) => (
                        <option key={idx} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <label className="flex flex-1 items-center gap-1 other-input text-xl">
                      <input
                        type="checkbox"
                        checked={education.endYear === "Present"}
                        onChange={() => handlePresentToggle(index)}
                        className="w-6 h-6"
                      />
                      Present
                    </label>
                  </div>
                  {renderTooltip(index, "endYear", "End Date Issues")}
                </div>

                <div className="relative">
                  <label className="text-black py-1 block">Location</label>
                  <div className="relative dropdown-container">
                    <input
                      type="text"
                      placeholder="Location"
                      name="location"
                      className={`w-full other-input border ${
                        improve && hasErrors(index, "location") ? "border-red-500" : "border-black"
                      }`}
                      value={education.location}
                      onChange={(e) => handleEducation(e, index)}
                      onClick={(e) => {
                        e.stopPropagation()
                        setFocusedField({ index, field: "location" })
                      }}
                      maxLength={50}
                    />
                    {isLoading.location && (
                      <div className="absolute right-8 top-1/2 -translate-y-1/2">
                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                      </div>
                    )}
                    {improve && hasErrors(index, "location") && (
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveTooltip(activeTooltip === `location-${index}` ? null : `location-${index}`)
                        }}
                      >
                        <AlertCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {focusedField.index === index &&
                    focusedField.field === "location" &&
                    locationSuggestions.length > 0 && (
                      <div className=" z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {locationSuggestions.map((location, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                            onClick={(e) => {
                              e.stopPropagation()
                              selectLocation(location, index)
                            }}
                          >
                            {location}
                          </div>
                        ))}
                      </div>
                    )}

                  {renderTooltip(index, "location", "Location Suggestions")}
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-black my-2">No Education available. Add a new one to get started.</p>
      )}
      <FormButton size={resumeData.education.length} add={addEducation} remove={removeEducation} />
    </div>
  )
}

export default Education

