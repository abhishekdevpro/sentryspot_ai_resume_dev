// // import React from "react";
// import { useContext, useRef } from "react";
// // import { ResumeContext } from "../../pages/builder";
// import { HighlightMenu } from "react-highlight-menu";
// import ContactInfo from "./ContactInfo";
// import { CgWebsite } from "react-icons/cg";
// import DateRange from "../utility/DateRange";
// import Language from "./Language";
// import Skills from "./Skills";
// import Certification from "./Certification";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   FaGithub,
//   FaLinkedin,
//   FaTwitter,
//   FaFacebook,
//   FaInstagram,
//   FaYoutube,
//   FaBold,
//   FaItalic,
//   FaPlus,
//   FaMinus,
//   FaAlignLeft,
//   FaAlignCenter,
//   FaAlignRight,
//   FaLink,
//   FaUnderline,
//   FaSpellCheck,
// } from "react-icons/fa";
// import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
// import dynamic from "next/dynamic";
// import { ResumeContext } from "../context/ResumeContext";
// import EducationSection from "./Education";
// import WorkExperience from "./WorkExperience";
// import ProjectsSection from "./ProjectSection";
// import { ImageWrapper, SummaryWrapper, TextWrapper } from "./Common";
// import ContactAndSocialMedia from "./ContactAndSocial";
// import { SkillsWrapper } from "./SkillWrapper";

// // Importing draggable components dynamically
// const DragDropContext = dynamic(
//   () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
//   { ssr: false }
// );
// const Droppable = dynamic(
//   () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
//   { ssr: false }
// );
// const Draggable = dynamic(
//   () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
//   { ssr: false }
// );

// const checkGrammar = () => {
//   const selectedText = window.getSelection().toString();

//   if (selectedText) {
//     // API call to the grammar correction service (example using LanguageTool API)
//     fetch("https://api.languagetool.org/v2/check", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({
//         language: "en-US",
//         text: selectedText,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.matches.length > 0) {
//           alert("Grammar issues found: " + data.matches.length);
//           // Extend this to show grammar correction suggestions to the user
//         } else {
//           alert("No grammar issues found!");
//         }
//       })
//       .catch((error) => console.error("Error:", error));
//   } else {
//     alert("Please select some text to check for grammar.");
//   }
// };

// const Template1 = () => {
//   const { resumeData, setResumeData, headerColor, backgroundColorss } =
//     useContext(ResumeContext);
//   const templateRef = useRef(null);

//   const icons = [
//     { name: "github", icon: <FaGithub /> },
//     { name: "linkedin", icon: <FaLinkedin /> },
//     { name: "twitter", icon: <FaTwitter /> },
//     { name: "facebook", icon: <FaFacebook /> },
//     { name: "instagram", icon: <FaInstagram /> },
//     { name: "youtube", icon: <FaYoutube /> },
//     { name: "website", icon: <CgWebsite /> },
//   ];
//   const MenuButton = ({ title, icon, onClick }) => (
//     <button
//       onClick={onClick}
//       title={title}
//       className="flex items-center justify-center p-3 hover:bg-gray-200 rounded font-semibold text-lg"
//     >
//       {icon}
//     </button>
//   );

//   const toggleBold = () => formatText("bold");
//   const toggleItalic = () => formatText("italic");
//   const toggleUnderline = () => formatText("underline");
//   const changeFontSize = (size) => formatText("fontSize", size);
//   const alignText = (alignment) => formatText(`justify${alignment}`);
//   const toggleLink = () => {
//     const url = prompt("Enter the URL:");
//     if (url) {
//       formatText("createLink", url);
//     }
//   };
//   return (
//     <div ref={templateRef} className="">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        

//         <div className="flex-col items-center justify-center mb-1 p-2">
//           {resumeData?.profilePicture && (
//             <ImageWrapper
//               src={resumeData.profilePicture}
//               alt="Profile Picture"
//               className="justify-center items-center"
//             />
//           )}

// <TextWrapper
//             name={resumeData.name}
//             position={resumeData.position}
//             className="justify-center items-center"
//             headerColor={backgroundColorss}
//             orientation="column" // Use "column" for stacked layout
//           />
//           <ContactAndSocialMedia
//               contactData={{
//                 teldata: resumeData.contactInformation,
//                 emaildata: resumeData.email,
//                 addressdata: resumeData.address,
//               }}
//               socialMediaData={resumeData.socialMedia}
//               icons={icons}
//               layout="row" // or "row"
//               contactClass=""
//               socialMediaClass=""
//                textColor=""
//             />
//         </div>
//         <hr className="border-dashed my-2" />
//         {/* two column start */}
//         <div className="grid grid-cols-3 gap-6">
//           <div
//             className="col-span-1 space-y-2 p-2"
//             style={{ backgroundColor: backgroundColorss }}
//           >
//             <SummaryWrapper
//               summary={resumeData.summary}
//               headerColor= {backgroundColorss?"white":"black"}
//               editable={true} // Set to false if editing is not required
//               className="mt-4"
//             />
//             <div>
              
//               <EducationSection
//               itemClassNames={{
//                 school: "",
//                 degree: "",
//                 location: "",
//               }}
//               layout="column"
//               educationData={resumeData?.education}
//               headerColor={backgroundColorss?"white":"black"}
//             />
//             </div>
//             <SkillsWrapper
//               skills={resumeData.skills}
//               headerColor={backgroundColorss?"white":"black"}
//               droppableId="skills-section-1"
//               className="mt-4"
//               layout="column"
//             />
//              <Language title="Languages" languages={resumeData.languages}
//              headerColor= {backgroundColorss?"white":"black"}
//             />
            

//             <Certification
//               title="Certifications"
//               certifications={resumeData.certifications}
//               hasBullet={true}
//               headerColor= {backgroundColorss?"white":"black"}
//             />
//           </div>
//           <div className="col-span-2 space-y-2 ">
//           <WorkExperience
//                 itemClassNames={{
//                   title:
//                     "text-lg font-bold mb-1  editable",
//                   company: "",
//                   position: "",
//                   location: "",
//                 }}
//                 resumeData={resumeData}
//                 headerColor={backgroundColorss}
//               />
//            <ProjectsSection
//                 resumeData={resumeData}
//                 headerColor={backgroundColorss}
//               />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // const A4PageWrapper = ({ children }) => {
// //   const alertA4Size = () => {
// //     const preview = document.querySelector(".preview");
// //     if (preview) {
// //       const previewHeight = preview.offsetHeight;
// //       console.log(previewHeight);
// //       if (previewHeight > 1122) {
// //         alert("A4 size exceeded");
// //       }
// //     } else {
// //       console.error("Element with class 'preview' not found.");
// //     }
// //   };

// //   return (
// //     <div className="w-8.5in border p-3" onLoad={alertA4Size}>
// //       {children}
// //     </div>
// //   );
// // };
// const A4PageWrapper = ({ children }) => {
//   const alertA4Size = () => {
//     const preview = document.querySelector(".preview");
//     if (preview) {
//       const previewHeight = preview.offsetHeight;
//       if (previewHeight > 1122) {
//         alert("A4 size exceeded");
//       }
//     }
//   };

//   return (
//     <div
//       className="w-full md:w-8.5in border p-2 md:p-3 transform-gpu transition-transform duration-300 ease-in-out mx-auto
//       sm:scale-[0.7] md:scale-[0.85] lg:scale-100 
//       sm:origin-top md:origin-top lg:origin-top"
//       onLoad={alertA4Size}
//     >
//       {children}
//     </div>
//   );
// };

// export default Template1;
import { useContext, useRef } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Certification from "./Certification";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaBold,
  FaItalic,
  FaPlus,
  FaMinus,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
  FaUnderline,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import dynamic from "next/dynamic";
import ContactAndSocialMedia from "./ContactAndSocial";
import { SummaryWrapper, TextWrapper, ImageWrapper } from "./Common";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
import EducationSection from "./Education";

const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
);

const Template1 = () => {
  const templateRef = useRef(null);

  const extractHtml = () => {
    const htmlContent = templateRef.current?.outerHTML;
    console.log(htmlContent);
    return htmlContent;
  };

  const { resumeData, setResumeData, headerColor, backgroundColorss } =
    useContext(ResumeContext);

  const icons = [
    { name: "github", icon: <FaGithub /> },
    { name: "linkedin", icon: <FaLinkedin /> },
    { name: "twitter", icon: <FaTwitter /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> },
    { name: "youtube", icon: <FaYoutube /> },
    { name: "website", icon: <CgWebsite /> },
  ];

  return (
    <div
      ref={templateRef}
      className=""
    >
      <div
      style={{ borderBottom: `2px solid ${backgroundColorss}` }}
      className={`mb-6 ${resumeData?.profilePicture ? 'flex justify-between items-center' : 'flex justify-center items-center '} px-16 py-4`}>

      {resumeData?.profilePicture && (
              <ImageWrapper
                src={resumeData.profilePicture}
                alt="Profile Picture"
                className="w-32 h-32 rounded-full"
              />
            )}
            <TextWrapper
              name={resumeData?.name}
              position={resumeData?.position}
              className={resumeData?.profilePicture ? "justify-start items-start" : "text-center"}
              headerColor={backgroundColorss}
              orientation="column"
            />
           
          </div>
         
      <div className="container mx-auto flex">
        {/* Left Column */}
        <div className="left-column w-8/12 p-8 border-r border-gray-300">
          {/* Header Section with TextWrapper and conditional ImageWrapper */}
          

          {/* Rest of the left column content */}
          <div className="flex flex-col gap-4">
            <div className="col-span-2 space-y-2">
              <SummaryWrapper
                summary={resumeData.summary}
                headerColor={"black"}
                editable={true}
                className="mt-4"
              />
              <WorkExperience
                itemClassNames={{
                  title: "text-lg font-bold mb-1 editable",
                  company: "",
                  position: "",
                  location: "",
                }}
                resumeData={resumeData}
                headerColor={backgroundColorss}
              />
              <ProjectsSection
                resumeData={resumeData}
                headerColor={backgroundColorss}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div
          className="right-column w-4/12 bg-gray-100 p-8"
          style={{ backgroundColor: backgroundColorss }}
        >
          <div className="flex flex-col gap-4">
            <ContactAndSocialMedia
              title="Contacts"
              contactData={{
                teldata: resumeData.contactInformation,
                emaildata: resumeData.email,
                addressdata: resumeData.address,
              }}
              socialMediaData={resumeData.socialMedia}
              icons={icons}
              layout="column"
              contactClass=""
              socialMediaClass=""
              textColor="text-white"
            />
            <SkillsWrapper
              skills={resumeData.skills}
              headerColor={backgroundColorss ? "white" : "black"}
              droppableId="skills-section-1"
              className="mt-4"
              layout="column"
            />
            <Language
              title="Languages"
              languages={resumeData.languages}
              headerColor={backgroundColorss ? "white" : "black"}
            />
            <Certification
              title="Certifications"
              certifications={resumeData.certifications}
              hasBullet={true}
              headerColor={backgroundColorss ? "white" : "black"}
            />
          </div>

          <div className="education mb-8">
            <EducationSection
              itemClassNames={{
                school: "",
                degree: "",
                location: "",
              }}
              layout="column"
              educationData={resumeData?.education}
              headerColor={backgroundColorss ? "white" : "black"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1;