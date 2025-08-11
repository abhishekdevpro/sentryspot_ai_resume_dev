// import React, { useState, useRef, useEffect, useContext } from "react";
// import Language from "../components/form/Language";
// import axios from "axios";
// import Meta from "../components/meta/Meta";
// import FormCP from "../components/form/FormCP";
// import dynamic from "next/dynamic";
// import DefaultResumeData from "../components/utility/DefaultResumeData";
// import SocialMedia from "../components/form/SocialMedia";
// import WorkExperience from "../components/form/WorkExperience";
// import Skill from "../components/form/Skill";
// import PersonalInformation from "../components/form/PersonalInformation";
// import Summary from "../components/form/Summary";
// import Projects from "../components/form/Projects";
// import Education from "../components/form/Education";
// import Certification from "../components/form/certification";
// import ColorPickers from "./ColorPickers";
// import Preview from "../components/preview/Preview";
// import TemplateSelector from "../components/preview/TemplateSelector";
// import { PDFExport } from "@progress/kendo-react-pdf";
// import LoadUnload from "../components/form/LoadUnload";
// import MyResume from "./dashboard/MyResume";
// import { useRouter } from "next/router";
// import Sidebar from "./dashboard/Sidebar";
// import { toast } from "react-toastify";
// import LoaderButton from "../components/utility/LoaderButton";
// import useLoader from "../hooks/useLoader";
// import Modal from "./adminlogin/Modal";
// import { Menu, X } from "lucide-react";
// import Image from "next/image";
// import { ResumeContext } from "../components/context/ResumeContext";
// import ResumeLoader from "../components/ResumeLoader/Loader";
// import { SaveLoader } from "../components/ResumeLoader/SaveLoader";

// const Print = dynamic(() => import("../components/utility/WinPrint"), {
//   ssr: false,
// });

// export default function WebBuilder() {
//   const [formClose, setFormClose] = useState(false);
//   const [currentSection, setCurrentSection] = useState(0);
//   const [selectedTemplate, setSelectedTemplate] = useState("template1");
//   const [selectedPdfType, setSelectedPdfType] = useState("1");
//   const [isFinished, setIsFinished] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [token, setToken] = useState(null);
//   const [resumeId, setResumeId] = useState(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const router = useRouter();
//   const pdfExportComponent = useRef(null);
//   const { PayerID } = router.query;
//   const [isSaved, setIsSaved] = useState(false);
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
//   const [userId, setUserId] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [isDownloading,setisDownloading] =  useState(false)
//   const templateRef = useRef(null);
//   const {
//     resumeData,
//     setResumeData,
//     setHeaderColor,
//     setBgColor,
//     setSelectedFont,
//     selectedFont,
//     backgroundColorss,
//     headerColor,
//     setResumeStrength,
//   } = useContext(ResumeContext);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     setToken(storedToken);
//   }, []);

//   useEffect(() => {
//     const fetchResumeData = async () => {
//       const { id } = router.query;
//       const token = localStorage.getItem("token");

//       if (id && token) {
//         try {
//           const response = await axios.get(
//             `https://api.sentryspot.co.uk/api/jobseeker/resume-list/${id}`,
//             {
//               headers: {
//                 Authorization: token,
//               },
//             }
//           );

//           if (response.data.status === "success") {
//             const { data } = response.data;
//             // console.log(data,"rnd");
//             const parsedData = data.ai_resume_parse_data;

//             setResumeData(parsedData.templateData);
//             setResumeStrength(data.resume_strenght_details);

//             if (parsedData.templateData.templateDetails) {
//               setBgColor(
//                 parsedData.templateData.templateDetails.backgroundColor || ""
//               );
//               setHeaderColor(
//                 parsedData.templateData.templateDetails.backgroundColor || ""
//               );
//               setSelectedTemplate(
//                 parsedData.templateData.templateDetails.templateId ||
//                   "template1"
//               );
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching resume data:", error);
//           toast.error("Failed to fetch resume data");
//         }
//       }
//     };

//     fetchResumeData();
//   }, [router.query]);

//   useEffect(() => {
//     const path = window.location.pathname;
//     const id = path.split("/").pop();
//     setResumeId(id);
//   }, []);

//   const sections = [
//     { label: "Personal Details", component: <PersonalInformation /> },
//     { label: "Social Links", component: <SocialMedia /> },
//     { label: "Summary", component: <Summary /> },
//     { label: "Education", component: <Education /> },
//     { label: "Experience", component: <WorkExperience /> },
//     { label: "Projects", component: <Projects /> },
//     {
//       label: "Skills",
//       component: Array.isArray(resumeData?.skills) ? (
//         resumeData.skills.map((skill, index) => (
//           <Skill title={skill.title} currentSkillIndex={index} key={index} />
//         ))
//       ) : (
//         <p>No skills available</p>
//       ),
//     },
//     { label: "Languages", component: <Language /> },
//     { label: "Certifications", component: <Certification /> },
//   ];

//   const handleNext = () => {
//     handleFinish(false);
//     if (currentSection === sections.length - 1) {
//       setIsFinished(true);
//     } else {
//       setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
//     }
//   };

//   const handlePrevious = () => {
//     setCurrentSection((prev) => Math.max(prev - 1, 0));
//   };

//   const handleSectionClick = (index) => {
//     handleFinish(false);
//     setCurrentSection(index);
//     setIsMobileMenuOpen(false);
//   };

//   const handleFontChange = (e) => {
//     setSelectedFont(e.target.value);
//   };

//   const nextSection = () => {
//     handleFinish(false);
//     if (currentSection < sections.length - 1) {
//       handleSectionClick(currentSection + 1);
//     }
//   };

//   const prevSection = () => {
//     handleFinish(false);
//     if (currentSection > 0) {
//       handleSectionClick(currentSection - 1);
//     }
//   };

//   const [showModal, setShowModal] = useState(false);

//   const handleCloseModal = () => setShowModal(false);
//   const handleShowModal = () => setShowModal(true);

//   // const downloadAsPDF = async () => {
//   //   handleFinish();
//   //   if (!templateRef.current) {
//   //     toast.error("Template reference not found");
//   //     return;
//   //   }
//   // setLoading(true)
//   //   try {
//   //     const htmlContent = templateRef.current.innerHTML;

//   //     const fullContent = `
//   //       <style>
//   //         @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
//   //       </style>
//   //       ${htmlContent}
//   //     `;

//   //     const response = await axios.post(
//   //       "https://api.sentryspot.co.uk/api/jobseeker/generate-pdf-py",
//   //       { html: fullContent, pdf_type: selectedPdfType },
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: token,
//   //         },
//   //       }
//   //     );

//   //     downloadPDF();
//   //     setLoading(false)
//   //   } catch (error) {
//   //     console.error("PDF generation error:", error);
//   //     toast.error(
//   //       error.response?.data?.message || "Failed to generate and open PDF"
//   //     );
//   //   }
//   //   finally{
//   //     setLoading(false)
//   //   }
//   // };
//   const downloadAsPDF = async () => {
//     handleFinish();
//     if (!templateRef.current) {
//         toast.error("Template reference not found");
//         return;
//     }

//     setisDownloading(true); // Start loading before the async operation

//     try {
//         const htmlContent = templateRef.current.innerHTML;

//         const fullContent = `
//             <style>
//                 @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
//             </style>
//             ${htmlContent}
//         `;

//         const response = await axios.post(
//             "https://api.sentryspot.co.uk/api/jobseeker/generate-pdf-py",
//             { html: fullContent, pdf_type: selectedPdfType },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: token,
//                 },
//             }
//         );

//         downloadPDF(); // Call this only if the request is successful
//     } catch (error) {
//         console.error("PDF generation error:", error);
//         toast.error(
//             error.response?.data?.message || "Failed to generate and open PDF"
//         );
//     } finally {
//       setisDownloading(false); // Ensure loading is stopped after success or failure
//     }
// };

//   const createPayment = async () => {
//     const amount = 49;

//     try {
//       const payload = {
//         amount,
//         ResumeId: resumeId,
//         Token: token || "",
//       };

//       const response = await axios.post(
//         "https://api.sentryspot.co.uk/api/jobseeker/paypal/create-payment",
//         payload,
//         {
//           headers: {
//             Authorization: token,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = response.data;
//       console.log(data, "data");
//       if (data && data.data) {
//         const orderId = data.order_id;
//         localStorage.setItem("orderid", orderId);

//         if (data.data) {
//           window.location.href = data.data;
//         } else {
//           console.error("Payment URL not found");
//         }
//       }
//     } catch (error) {
//       console.error("Payment Error:", error);
//     }
//   };

//   useEffect(() => {
//     if (PayerID) {
//       verifyPayment();
//     }
//   }, [PayerID]);

//   const verifyPayment = async () => {
//     try {
//       const orderId = localStorage.getItem("orderid");
//       const token = localStorage.getItem("token");

//       if (orderId && token && PayerID) {
//         const response = await axios.get(
//           `https://api.sentryspot.co.uk/api/jobseeker/paypal/verify-order?orderid=${orderId}`,
//           {
//             headers: {
//               Authorization: token,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data.status === "success") {
//           setPaymentVerified(true);
//           toast.success("Payment verified successfully!");

//           localStorage.removeItem("orderid");
//           await downloadPDF(orderId, resumeId, token);
//         } else {
//           toast.error("Payment verification failed. Please try again.");
//           router.push("/payment-failed");
//         }
//       }
//     } catch (error) {
//       console.error("Payment Verification Error:", error);
//       toast.error(
//         error?.response?.data?.message || "Payment verification failed"
//       );
//       router.push("/payment-failed");
//     }
//   };

//   const downloadPDF = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.sentryspot.co.uk/api/jobseeker/download-file/11/${resumeId}`,
//         {
//           headers: {
//             Authorization: token,
//           },
//           responseType: "blob",
//         }
//       );

//       const url = window.URL.createObjectURL(
//         new Blob([response.data], { type: "application/pdf" })
//       );
//       const link = document.createElement("a");
//       link.href = url;

//       link.setAttribute("download", `resume.pdf`);
//       document.body.appendChild(link);
//       link.click();

//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);

//       toast.success("PDF downloaded successfully!");
//     } catch (error) {
//       console.error("PDF Download Error:", error);
//       toast.error("Failed to download the PDF. Please try again.");
//     }
//   };

//   const handleFinish = async (showToast = true) => {
//     if (!resumeData) return;

//     const templateData = {
//       templateData: {
//         name: resumeData.name || "",
//         position: resumeData.position || "",
//         contactInformation: resumeData.contactInformation || "",
//         phone_code: resumeData.phone_code || "",
//         email: resumeData.email || "",
//         address: resumeData.address || "",
//         profilePicture: resumeData.profilePicture || "",
//         socialMedia:
//           resumeData.socialMedia?.map((media) => ({
//             socialMedia: media.platform || "",
//             link: media.link || "",
//             socialMedia: media.socialMedia || "",
//           })) || [],
//         summary: resumeData.summary || "",
//         is_fresher: resumeData.is_fresher || false,
//         education:
//           resumeData.education?.map((edu) => ({
//             school: edu.school || "",
//             degree: edu.degree || "",
//             startYear: edu.startYear || "",
//             endYear: edu.endYear || "",
//             location: edu.location || "",
//           })) || [],
//         workExperience:
//           resumeData.workExperience?.map((exp) => ({
//             company: exp.company || "",
//             position: exp.position || "",
//             description: exp.description || "",
//             KeyAchievements: Array.isArray(exp.KeyAchievements)
//               ? exp.KeyAchievements
//               : [exp.KeyAchievements || ""],
//             startYear: exp.startYear || "",
//             endYear: exp.endYear || "",
//             location: exp.location,
//           })) || [],
//         projects:
//           resumeData.projects?.map((project) => ({
//             title: project.title || "",
//             link: project.link || "",
//             description: project.description || "",
//             keyAchievements: Array.isArray(project.keyAchievements)
//               ? project.keyAchievements
//               : [project.keyAchievements || ""],
//             startYear: project.startYear || "",
//             endYear: project.endYear || "",
//             name: project.name || "",
//           })) || [],
//         skills: Array.isArray(resumeData.skills)
//           ? resumeData.skills.map((skill) => ({
//               title: skill.title || "",
//               skills: skill.skills || [],
//             }))
//           : [],
//         languages: resumeData.languages || [],
//         certifications: resumeData.certifications || [],
//         templateDetails: {
//           templateId: selectedTemplate,
//           backgroundColor: backgroundColorss || "",
//           font: selectedFont || "Ubuntu",
//         },
//       },
//     };

//     const htmlContent = templateRef?.current?.innerHTML;
//     if (!htmlContent) {
//       toast.error("Error: Template content is missing.");
//       return;
//     }

//     const resumeHtml = `
//       <style>
//         @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
//       </style>
//       ${htmlContent}
//     `;

//     try {
//       const id = router.query.id || resumeId;
//       if (!id) {
//         console.error("Resume ID not found.");
//         toast.error("Error: Resume ID is missing.");
//         return;
//       }

//       const url = `https://api.sentryspot.co.uk/api/jobseeker/resume-update/${id}`;
//       const response = await axios.put(
//         url,
//         { ...templateData, resume_html: resumeHtml },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//         }
//       );

//       if (response.data.code === 200 || response.data.status === "success") {
//         setIsSaved(true);
//         if (showToast) {
//           toast.success(response.data.message || "Resume saved successfully.");
//         }
//       } else {
//         toast.error(response.data.error || "Error while saving the resume.");
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "An error occurred.");
//       console.error("Error updating resume:", error);
//     }
//   };
//   const handleClick = async () => {
//     setLoading(true);
//     try {
//       await handleFinish(); // Ensure handleFinish is an async function
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToEditor = () => {
//     setIsFinished(false);
//   };

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const userProfileResponse = await axios.get(
//           "https://api.sentryspot.co.uk/api/jobseeker/user-profile",
//           {
//             headers: {
//               Authorization: token,
//             },
//           }
//         );

//         if (userProfileResponse.data.status === "success") {
//           const userData = userProfileResponse.data.data;
//           setFormData((prevData) => ({
//             ...prevData,
//             first_name: userData.first_name || "",
//             last_name: userData.last_name || "",
//             phone: userData.phone || "",
//             email: userData.email || "",
//           }));
//         }
//       } catch (error) {
//         console.error("An error occurred while fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // console.log(selectedTemplate,selectedPdfType);
//   return (
//     <>
//       <Meta
//         title="SentrySpot- AI Resume Builder"
//         description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
//         keywords="ATS-friendly, Resume optimization..."
//       />
//       {/* <ResumeLoader /> */}
//       <div className="min-h-screen bg-gray-50">
//         {!isFinished ? (
//           <div className="min-h-screen bg-gray-50 flex flex-col">
//             <div className="w-full bg-gray-200 p-4 shadow-sm">
//               <div className="hidden md:flex flex-col lg:flex-row items-center justify-between gap-4">
//                 <div className="flex w-full lg:w-auto gap-4">
//                   <button
//                     type="button"
//                     onClick={handlePrevious}
//                     disabled={currentSection === 0}
//                     className="w-40 h-10 rounded-lg bg-blue-950 text-white font-medium transition hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Previous
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleNext}
//                     className="w-40 h-10 rounded-lg bg-yellow-500 text-black font-medium transition hover:bg-yellow-400"
//                   >
//                     {currentSection === sections.length - 1 ? "Finish" : "Next"}
//                   </button>
//                 </div>

//                 <div className="hidden lg:flex items-center gap-4">
//                   <select
//                     value={selectedFont}
//                     onChange={handleFontChange}
//                     className="w-40 h-10 rounded-lg border border-blue-800 px-4 font-bold text-blue-800 bg-white focus:ring-2 focus:ring-blue-800"
//                   >
//                     <option value="Ubuntu">Ubuntu</option>
//                     <option value="Calibri">Calibri</option>
//                     <option value="Georgia">Georgia</option>
//                     <option value="Roboto">Roboto</option>
//                     <option value="Poppins">Poppins</option>
//                   </select>

//                   <div className="flex items-center gap-4">
//                     <ColorPickers
//                       selectmultiplecolor={backgroundColorss}
//                       onChange={setBgColor}
//                     />
//                     <TemplateSelector
//                       selectedTemplate={selectedTemplate}
//                       setSelectedTemplate={setSelectedTemplate}
//                       setSelectedPdfType={setSelectedPdfType}
//                       selectedPdfType={selectedPdfType}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="sticky top-0 z-10 w-full bg-white shadow-sm">
//               <div className="hidden md:flex justify-center items-center p-4">
//                 <nav className="bg-gray-100 rounded-lg p-2">
//                   <div className="flex items-center">
//                     <button
//                       onClick={() => prevSection()}
//                       className="p-2 hover:bg-gray-200 rounded-lg "
//                       disabled={currentSection === 0}
//                     >
//                       {/* Chevron Left Icon Here */}
//                     </button>

//                     <div className="flex-1 overflow-x-auto scrollbar-hide ">
//                       <ul className="flex flex-row gap-3 items-center py-2 px-4  ">
//                         {sections.map((section, index) => (
//                           <li
//                             key={index}
//                             className={`px-4 py-2 cursor-pointer transition rounded-lg border-2 ${
//                               currentSection === index
//                                 ? "border-blue-800 font-semibold bg-blue-950 text-white"
//                                 : "border-blue-800 bg-white text-blue-800 hover:bg-blue-50"
//                             }`}
//                             onClick={() => handleSectionClick(index)}
//                           >
//                             {section.label}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     <button
//                       onClick={() => nextSection()}
//                       className="p-2 hover:bg-gray-200 rounded-lg "
//                       disabled={currentSection === sections.length - 1}
//                     >
//                       {/* Chevron Right Icon Here */}
//                     </button>
//                   </div>
//                 </nav>
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row flex-grow p-4">
//               <div
//                 className="w-[40%] "
//                 style={{ backgroundColor: "#323159f5" }}
//               >
//                 <main className="w-full mx-auto md:p-4">
//                   <form>{sections[currentSection].component}</form>
//                 </main>
//               </div>

//               <aside className="w-[60%] min-h-screen border-l bg-gray-50">
//                 <div className="sticky top-20 p-4">
//                   <Preview
//                     ref={templateRef}
//                     selectedTemplate={selectedTemplate}
//                   />
//                 </div>
//               </aside>
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col">
//             <div className="hidden md:flex w-screen px-8 py-4 justify-between items-center bg-white shadow">
//               <div className="flex gap-4">
//                 <select
//                   value={selectedFont}
//                   onChange={handleFontChange}
//                   className="px-4 py-2 border rounded-lg"
//                 >
//                   <option value="Ubuntu">Ubuntu</option>
//                   <option value="Calibri">Calibri</option>
//                   <option value="Georgia">Georgia</option>
//                   <option value="Roboto">Roboto</option>
//                   <option value="Poppins">Poppins</option>
//                 </select>
//                 <ColorPickers
//                   selectmultiplecolor={backgroundColorss}
//                   onChange={setBgColor}
//                 />
//                 <TemplateSelector
//                   selectedTemplate={selectedTemplate}
//                   setSelectedTemplate={setSelectedTemplate}
//                   setSelectedPdfType={setSelectedPdfType}
//                   selectedPdfType={selectedPdfType}
//                 />
//               </div>
//               <div className="flex gap-4">
//                 <button
//                   onClick={handleClick}
//                   className={`px-6 py-2 rounded-lg flex items-center justify-center gap-2 ${
//                     loading
//                       ? "bg-blue-800 cursor-not-allowed"
//                       : "bg-blue-950 hover:bg-blue-900 active:bg-blue-800"
//                   } text-white transition-colors duration-200`}
//                   disabled={loading}
//                 >
//                   {loading ? <SaveLoader  /> : "Save Resume"}
//                 </button>
//                 <button
//                   onClick={downloadAsPDF}
//                   className={`px-6 py-2 rounded-lg flex items-center justify-center gap-2 ${
//                     loading
//                       ? "bg-yellow-800 cursor-not-allowed"
//                       : "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600"
//                   } text-white transition-colors duration-200`}
//                   disabled={loading}
//                 >

//                   {isDownloading ? <SaveLoader loadingText="Downloading" />  : "Pay & Download"}

//                 </button>

//                 <button
//                   onClick={handleBackToEditor}
//                   className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
//                 >
//                   Edit Resume
//                 </button>
//               </div>
//             </div>

//             <div className="z-10">
//               <Preview ref={templateRef} selectedTemplate={selectedTemplate} />
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

import React, { useState, useRef, useEffect, useContext } from "react";
import Language from "../components/form/Language";
import axios from "axios";
import Meta from "../components/meta/Meta";
import FormCP from "../components/form/FormCP";
import dynamic from "next/dynamic";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import SocialMedia from "../components/form/SocialMedia";
import WorkExperience from "../components/form/WorkExperience";
import Skill from "../components/form/Skill";
import PersonalInformation from "../components/form/PersonalInformation";
import Summary from "../components/form/Summary";
import Projects from "../components/form/Projects";
import Education from "../components/form/Education";
import Certification from "../components/form/certification";
import ColorPickers from "./ColorPickers";
import Preview from "../components/preview/Preview";
import TemplateSelector from "../components/preview/TemplateSelector";
import { PDFExport } from "@progress/kendo-react-pdf";
import LoadUnload from "../components/form/LoadUnload";
import MyResume from "./dashboard/MyResume";
import { useRouter } from "next/router";
import Sidebar from "./dashboard/Sidebar";
import { toast } from "react-toastify";
import LoaderButton from "../components/utility/LoaderButton";
import useLoader from "../hooks/useLoader";
import Modal from "./adminlogin/Modal";
import { AlertCircle, Menu, X } from "lucide-react";
import Image from "next/image";
import { ResumeContext } from "../components/context/ResumeContext";
import ResumeLoader from "../components/ResumeLoader/Loader";
import { SaveLoader } from "../components/ResumeLoader/SaveLoader";
import { Button } from "../components/ui/Button";
import Select from "../components/ui/Select";

const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function WebBuilder() {
  const [formClose, setFormClose] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [selectedPdfType, setSelectedPdfType] = useState("1");
  const [isFinished, setIsFinished] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pdfExportComponent = useRef(null);
  const { PayerID } = router.query;
  const [isSaved, setIsSaved] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDownloading, setisDownloading] = useState(false);
  const { improve } = router.query;
  const templateRef = useRef(null);
  const {
    resumeData,
    setResumeData,
    setHeaderColor,
    setBgColor,
    setSelectedFont,
    selectedFont,
    backgroundColorss,
    headerColor,
    setResumeStrength,
    resumeStrength,
    exp,
  } = useContext(ResumeContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchResumeData = async () => {
      const { id } = router.query;
      const token = localStorage.getItem("token");

      if (id && token) {
        try {
          const response = await axios.get(
            `https://api.sentryspot.co.uk/api/jobseeker/resume-list/${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          if (response.data.status === "success") {
            const { data } = response.data;
            // console.log(data,"rnd");
            const parsedData = data.ai_resume_parse_data;

            setResumeData(parsedData.templateData);
            setResumeStrength(data.resume_strenght_details);

            if (parsedData.templateData.templateDetails) {
              setBgColor(
                parsedData.templateData.templateDetails.backgroundColor || ""
              );
              setHeaderColor(
                parsedData.templateData.templateDetails.backgroundColor || ""
              );
              setSelectedTemplate(
                parsedData.templateData.templateDetails.templateId ||
                  "template1"
              );
            }
          }
        } catch (error) {
          console.error("Error fetching resume data:", error);
          toast.error("Failed to fetch resume data");
        }
      }
    };

    fetchResumeData();
  }, [router.query]);

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    setResumeId(id);
  }, []);

  const sections = [
    {
      label: "Personal Details",
      component: <PersonalInformation />,
      showErrorIcon: resumeStrength?.is_personal_info === false,
    },
    {
      label: "Social Links",
      component: <SocialMedia />,
      showErrorIcon: resumeStrength?.is_social === false,
    },
    {
      label: "Summary",
      component: <Summary />,
      showErrorIcon: resumeStrength?.is_personal_summery === false,
    },
    {
      label: "Education",
      component: <Education />,
      showErrorIcon: resumeStrength?.is_education === false,
    },
    {
      label: "Experience",
      component: <WorkExperience />,
      showErrorIcon: resumeStrength?.is_work_history === false,
    },
    {
      label: "Projects",
      component: <Projects />,
      showErrorIcon: resumeStrength?.is_project === false,
    },
    {
      label: "Skills",
      showErrorIcon: resumeStrength?.is_skills === false,
      component: Array.isArray(resumeData?.skills) ? (
        resumeData.skills.map((skill, index) => (
          <Skill title={skill.title} currentSkillIndex={index} key={index} />
        ))
      ) : (
        <p>No skills available</p>
      ),
    },
    {
      label: "Languages",
      component: <Language />,
      showErrorIcon: resumeStrength?.is_languages === false,
    },
    {
      label: "Certifications",
      component: <Certification />,
      showErrorIcon: resumeStrength?.is_certifications === false,
    },
  ];

  const handleNext = () => {
    handleFinish(false);
    if (currentSection === sections.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleSectionClick = (index) => {
    handleFinish(false);
    setCurrentSection(index);
    setIsMobileMenuOpen(false);
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const nextSection = () => {
    handleFinish(false);
    if (currentSection < sections.length - 1) {
      handleSectionClick(currentSection + 1);
    }
  };

  const prevSection = () => {
    handleFinish(false);
    if (currentSection > 0) {
      handleSectionClick(currentSection - 1);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // const downloadAsPDF = async () => {
  //   handleFinish();
  //   if (!templateRef.current) {
  //     toast.error("Template reference not found");
  //     return;
  //   }
  // setLoading(true)
  //   try {
  //     const htmlContent = templateRef.current.innerHTML;

  //     const fullContent = `
  //       <style>
  //         @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
  //       </style>
  //       ${htmlContent}
  //     `;

  //     const response = await axios.post(
  //       "https://api.sentryspot.co.uk/api/jobseeker/generate-pdf-py",
  //       { html: fullContent, pdf_type: selectedPdfType },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token,
  //         },
  //       }
  //     );

  //     downloadPDF();
  //     setLoading(false)
  //   } catch (error) {
  //     console.error("PDF generation error:", error);
  //     toast.error(
  //       error.response?.data?.message || "Failed to generate and open PDF"
  //     );
  //   }
  //   finally{
  //     setLoading(false)
  //   }
  // };
  // const downloadAsPDF = async () => {
  //   handleFinish();
  //   if (!templateRef.current) {
  //     toast.error("Template reference not found");
  //     return;
  //   }

  //   setisDownloading(true); // Start loading before the async operation

  //   try {
  //     const htmlContent = templateRef.current.innerHTML;

  //     const fullContent = `
  //           <style>
  //               @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
  //           </style>
  //           ${htmlContent}
  //       `;

  //     const response = await axios.post(
  //       `https://api.sentryspot.co.uk/api/jobseeker/download-resume/${resumeId}?pdf_type=${selectedPdfType}`,
  //       { html: fullContent, pdf_type: selectedPdfType },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token,
  //         },
  //       }
  //     );

  //     downloadPDF(); // Call this only if the request is successful
  //   } catch (error) {
  //     console.error("PDF generation error:", error);
  //     toast.error(
  //       error.response?.data?.message || "Failed to generate and open PDF"
  //     );
  //   } finally {
  //     setisDownloading(false); // Ensure loading is stopped after success or failure
  //   }
  // };

  const downloadAsPDF = async () => {
    handleFinish();
    if (!templateRef.current) {
      toast.error("Template reference not found");
      return;
    }

    setisDownloading(true); // Start loading before the async operation

    try {
      const token = localStorage.getItem("token");
      const htmlContent = templateRef.current.innerHTML;

      const fullContent = `
            <style>
                @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
            </style>
            ${htmlContent}
        `;

      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/download-resume/${resumeId}?pdf_type=${selectedPdfType}`,

        {
          headers: {
            Authorization: token,
            "Content-Type": "application/pdf",
          },
          responseType: "blob",
        }
      );
      console.log(response);
      if (response.code == 200) {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;

        link.setAttribute("download", `resume.pdf`);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success(
          response.data.message || "Resume Downloaded Successfully"
        );
      }

      // downloadPDF();
      // initiateCheckout(); // Call this only if the request is successful
    } catch (error) {
      console.error("PDF generation error:", error);

      if (
        error?.response?.status === 403 &&
        error?.response?.data instanceof Blob
      ) {
        // Try to read blob content as JSON
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errorData = JSON.parse(reader.result);
            const errorMessage =
              errorData.message || errorData.error || "Access denied";
            toast.error(errorMessage);
          } catch (err) {
            toast.error("Access denied. Please check your plan.");
          }
        };
        reader.readAsText(error.response.data);
      } else {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to generate and open PDF";
        toast.error(errorMessage);
      }
    } finally {
      setisDownloading(false); // Ensure loading is stopped after success or failure
    }
  };

  const createPayment = async () => {
    const amount = 49;

    try {
      const payload = {
        amount,
        ResumeId: resumeId,
        Token: token || "",
      };

      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/paypal/create-payment",
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data, "data");
      if (data && data.data) {
        const orderId = data.order_id;
        localStorage.setItem("orderid", orderId);

        if (data.data) {
          window.location.href = data.data;
        } else {
          console.error("Payment URL not found");
        }
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  useEffect(() => {
    if (PayerID) {
      verifyPayment();
    }
  }, [PayerID]);

  const verifyPayment = async () => {
    try {
      const orderId = localStorage.getItem("orderid");
      const token = localStorage.getItem("token");

      if (orderId && token && PayerID) {
        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/paypal/verify-order?orderid=${orderId}`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status === "success") {
          setPaymentVerified(true);
          toast.success("Payment verified successfully!");

          localStorage.removeItem("orderid");
          await downloadPDF(orderId, resumeId, token);
        } else {
          toast.error("Payment verification failed. Please try again.");
          router.push("/payment-failed");
        }
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      toast.error(
        error?.response?.data?.message || "Payment verification failed"
      );
      router.push("/payment-failed");
    }
  };

  // const downloadPDF = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.sentryspot.co.uk/api/jobseeker/download-file/11/${resumeId}`,
  //       // https://api.ciblijob.fr/api/user/download-resume/1530?pdf_type=1
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //         responseType: "blob",
  //       }
  //     );

  //     const url = window.URL.createObjectURL(
  //       new Blob([response.data], { type: "application/pdf" })
  //     );
  //     const link = document.createElement("a");
  //     link.href = url;

  //     link.setAttribute("download", `resume.pdf`);
  //     document.body.appendChild(link);
  //     link.click();

  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(url);

  //     toast.success("PDF downloaded successfully!");
  //   } catch (error) {
  //     console.error("PDF Download Error:", error);
  //     toast.error("Failed to download the PDF. Please try again.");
  //   }
  // };

  const handleFinish = async (showToast = true) => {
    if (!resumeData) return;

    const templateData = {
      templateData: {
        name: resumeData.name || "",
        position: resumeData.position || "",
        contactInformation: resumeData.contactInformation || "",
        phone_code: resumeData.phone_code || "",
        email: resumeData.email || "",
        address: resumeData.address || "",
        profilePicture: resumeData.profilePicture || "",
        socialMedia:
          resumeData.socialMedia?.map((media) => ({
            socialMedia: media.platform || "",
            link: media.link || "",
            socialMedia: media.socialMedia || "",
          })) || [],
        summary: resumeData.summary || "",
        is_fresher: resumeData.is_fresher || false,
        education:
          resumeData.education?.map((edu) => ({
            school: edu.school || "",
            degree: edu.degree || "",
            startYear: edu.startYear,
            endYear: edu.endYear,
            location: edu.location || "",
          })) || [],
        workExperience:
          resumeData.workExperience?.map((exp) => ({
            company: exp.company,
            position: exp.position,
            description: exp.description,
            // keyAchievements: Array.isArray(exp.keyAchievements)
            //   ? exp.keyAchievements
            //   : [exp.keyAchievements],
            keyAchievements: Array.isArray(exp.keyAchievements)
              ? exp.keyAchievements.filter((item) => item?.trim?.()) // filter out empty strings or undefined
              : exp.keyAchievements && exp.keyAchievements.trim?.()
              ? [exp.keyAchievements.trim()]
              : [],
            startYear: exp.startYear,
            endYear: exp.endYear,
            location: exp.location,
          })) || [],
        projects:
          resumeData.projects?.map((project) => ({
            title: project.title || "",
            link: project.link || "",
            description: project.description,
            keyAchievements: Array.isArray(project.keyAchievements)
              ? project.keyAchievements.filter((item) => item?.trim?.()) // filter out empty strings or undefined
              : project.keyAchievements && project.keyAchievements.trim?.()
              ? [project.keyAchievements.trim()]
              : [],
            startYear: project.startYear,
            endYear: project.endYear,
            name: project.name,
          })) || [],
        skills: Array.isArray(resumeData.skills)
          ? resumeData.skills.map((skill) => ({
              title: skill.title || "",
              skills: skill.skills || [],
            }))
          : [],
        languages: resumeData.languages || [],
        certifications: resumeData.certifications || [],
        templateDetails: {
          templateId: selectedTemplate,
          backgroundColor: backgroundColorss || "",
          font: selectedFont || "Ubuntu",
        },
        no_of_experience: exp,
      },
    };

    const htmlContent = templateRef?.current?.innerHTML;
    if (!htmlContent) {
      toast.error("Error: Template content is missing.");
      return;
    }

    const resumeHtml = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      </style>
      ${htmlContent}
    `;

    try {
      const id = router.query.id || resumeId;
      if (!id) {
        console.error("Resume ID not found.");
        toast.error("Error: Resume ID is missing.");
        return;
      }

      const url = `https://api.sentryspot.co.uk/api/jobseeker/resume-update/${id}`;
      const response = await axios.put(
        url,
        { ...templateData, resume_html: resumeHtml },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        setIsSaved(true);
        if (showToast) {
          toast.success(response.data.message || "Resume saved successfully.");
        }
      } else {
        toast.error(response.data.error || "Error while saving the resume.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred.");
      console.error("Error updating resume:", error);
    }
  };
  const handleClick = async () => {
    setLoading(true);
    try {
      await handleFinish(); // Ensure handleFinish is an async function
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEditor = () => {
    setIsFinished(false);
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const userProfileResponse = await axios.get(
          "https://api.sentryspot.co.uk/api/jobseeker/user-profile",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (userProfileResponse.data.status === "success") {
          const userData = userProfileResponse.data.data;
          setFormData((prevData) => ({
            ...prevData,
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            phone: userData.phone || "",
            email: userData.email || "",
          }));
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const fonts = [
    { value: "Ubuntu", label: "Ubuntu" },
    { value: "Calibri", label: "Calibri" },
    { value: "Georgia", label: "Georgia" },
    { value: "Roboto", label: "Roboto" },
    { value: "Poppins", label: "Poppins" },
  ];
  console.log(resumeStrength, "resumeStrength");
  return (
    <>
      <Meta
        title="SentrySpot- AI Resume Builder"
        description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
        keywords="ATS-friendly, Resume optimization..."
      />
      {/* <ResumeLoader /> */}
      <div className="min-h-screen">
        {!isFinished ? (
          <div className="min-h-screen flex flex-col">
            <div className="w-full p-4 shadow-sm app-card-bg">
              <div className="hidden md:flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex w-full lg:w-auto gap-4">
                  <Button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentSection === 0}

                    
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    variant={currentSection === sections.length - 1 ?"danger":"secondary"}
                    // className="w-40 h-10 rounded-lg bg-yellow-500 text-black font-medium transition hover:bg-yellow-400"
                  >
                    {currentSection === sections.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>

                <div className="hidden lg:flex items-center gap-4">
                  <Select
                    value={selectedFont}
                    onChange={(e) => setSelectedFont(e.target.value)}
                    options={fonts}
                    variant="outline"
                    // className="px-4 py-2"
                  />

                  <div className="flex items-center gap-4">
                    <ColorPickers
                      selectmultiplecolor={backgroundColorss}
                      onChange={setBgColor}
                    />
                    <TemplateSelector
                      selectedTemplate={selectedTemplate}
                      setSelectedTemplate={setSelectedTemplate}
                      setSelectedPdfType={setSelectedPdfType}
                      selectedPdfType={selectedPdfType}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky top-0 z-10 w-full shadow-sm">
              <div className="hidden md:flex justify-center items-center p-4">
                <nav className="app-card-bg rounded-xl p-2">
                  <div className="flex items-center">
                    {/* <button
                      onClick={() => prevSection()}
                      className="p-2 hover:bg-gray-200 rounded-lg "
                      disabled={currentSection === 0}
                    >
                      {/* Chevron Left Icon Here 
                    </button> */}

                    {/* <div className="flex-1 overflow-x-auto scrollbar-hide ">
                      <ul className="flex flex-row gap-3 items-center py-2 px-4  ">
                        {sections.map((section, index) => (
                          <li
                            key={index}
                            className={`flex items-center justify-between gap-2 px-4 py-2 cursor-pointer transition-all duration-200 rounded-lg border-2 
    ${
      currentSection === index
        ? "border-blue-800 bg-blue-950 text-white font-semibold shadow-md"
        : "border-blue-800 bg-white text-blue-800 hover:bg-blue-100"
    }`}
                            onClick={() => handleSectionClick(index)}
                          >
                            <span>{section.label}</span>
                            {improve && section.showErrorIcon && (
                              <AlertCircle className="text-red-500 w-5 h-5" />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div> */}
                    <div className="flex-1 overflow-x-auto scrollbar-hide">
                      <ul className="flex flex-row gap-3 items-center py-2 px-4">
                        {sections.map((section, index) => {
                          const isActive = currentSection === index;

                          return (
                            <li key={index} className="flex-shrink-0">
                              <Button
                                // size="sm"
                                variant={isActive ? "primary" : "outline"}
                                className={`!px-4 !py-2 border-2 border-blue-800 rounded-lg transition-all duration-200 
                  ${
                    isActive
                      ? "bg-blue-950 text-white font-semibold shadow-md hover:bg-blue-900"
                      : "bg-white text-blue-800 hover:bg-blue-100"
                  }`}
                                onClick={() => handleSectionClick(index)}
                                icon={
                                  improve && section.showErrorIcon
                                    ? AlertCircle
                                    : undefined
                                }
                                iconPosition="right"
                              >
                                {section.label}
                              </Button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* <button
                      onClick={() => nextSection()}
                      className="p-2 hover:bg-gray-200 rounded-lg "
                      disabled={currentSection === sections.length - 1}
                    >
                      
                    </button> */}
                  </div>
                </nav>
              </div>
            </div>

            <div className="flex flex-col md:flex-row flex-grow p-4">
              <div
                className="w-[40%] bg-brand "
                
                // style={{ backgroundColor: "#323159f5" }}
              >
                <main className="w-full mx-auto md:p-4">
                  <form>{sections[currentSection].component}</form>
                </main>
              </div>

              <aside className="w-[60%] min-h-screen border-l bg-gray-50">
                <div className="sticky top-20 p-4">
                  <Preview
                    ref={templateRef}
                    selectedTemplate={selectedTemplate}
                  />
                </div>
              </aside>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="hidden md:flex w-screen px-8 py-4 justify-between items-center app-light-bg shadow">
              <div className="flex items-center gap-4">
                
                <Select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  options={fonts}
                  variant="outline"
                />
                <ColorPickers
                  selectmultiplecolor={backgroundColorss}
                  onChange={setBgColor}
                />
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                  setSelectedPdfType={setSelectedPdfType}
                  selectedPdfType={selectedPdfType}
                />
              </div>
              <div className="flex gap-4">
                <Button onClick={handleClick} disabled={loading}>
                  {loading ? <SaveLoader /> : "Save Resume"}
                </Button>
                <Button
                  onClick={downloadAsPDF}
                  variant="success"
                  disabled={loading}
                >
                  {isDownloading ? (
                    <SaveLoader loadingText="Downloading" />
                  ) : (
                    "Pay & Download"
                  )}
                </Button>

                <Button onClick={handleBackToEditor} variant="secondary">
                  Edit Resume
                </Button>
              </div>
            </div>

            <div className="z-10 bg-white">
              <Preview ref={templateRef} selectedTemplate={selectedTemplate} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
