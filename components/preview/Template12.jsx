// import React from "react";
import { useContext, useRef } from "react";
// import { ResumeContext } from "../../pages/builder";
import { ResumeContext } from "../context/ResumeContext";

import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Certification from "./Certification";
import Image from "next/image";
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
import Link from "next/link";
import ContactAndSocialMedia from "./ContactAndSocial";

import EducationSection from "./Education";

import { ImageWrapper, SummaryWrapper, TextWrapper } from "./Common";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";

// Importing draggable components dynamically
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
const Template12 = () => {
  const { resumeData, setResumeData, headerColor, backgroundColorss } =
    useContext(ResumeContext);
  const templateRef = useRef(null);

  const extractHtml = () => {
    const htmlContent = templateRef.current?.outerHTML;
    console.log(htmlContent);
    return htmlContent;
  };
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
      <div className="header text-start mb-6">
        <div className="flex justify-start items-center gap-4">
          {resumeData?.profilePicture && (
            <ImageWrapper
              src={resumeData.profilePicture}
              alt="Profile Picture"
            />
          )}
           <TextWrapper
          name={resumeData.name}
          position={resumeData.position}
          headerColor={backgroundColorss}
          orientation="column" // Use "column" for stacked layout
        />
        </div>
       
        {/* <h1 className="text-2xl mb-1.5" style={{ color: headerColor }}>{resumeData.name}</h1> */}
        <ContactAndSocialMedia
          contactData={{
            teldata: resumeData.contactInformation,
            emaildata: resumeData.email,
            addressdata: resumeData.address,
          }}
          socialMediaData={resumeData.socialMedia}
          icons={icons}
          layout="row" // or "row"
          contactClass=""
          socialMediaClass=""
          className="justify-start gap-4 mt-4"
        />
      </div>
      
      <SummaryWrapper
        summary={resumeData.summary}
        headerColor={"black"}
        editable={true} // Set to false if editing is not required
        className="mt-4"
      />

      <section className="experience mb-6">
        {/* <h2 className="text-lg font-bold mb-2.5 uppercase border-b border-black pb-0.5 " style={{ color: headerColor }}>Professional Experience</h2> */}

        <div className="col-span-2 space-y-2">
          <WorkExperience
            itemClassNames={{
              title:
                "text-lg font-bold mb-1 border-b-2 border-gray-300 editable",
              company: "font-semibold",
              position: "content",
              location: "sub-content",
            }}
            resumeData={resumeData}
            headerColor={backgroundColorss}
          />
          <ProjectsSection resumeData={resumeData} headerColor={backgroundColorss} />
        </div>
      </section>

      <section className="education mb-6">
        {resumeData.education.length > 0 && (
          <div className="mb-1">
            {/* <h2 className="text-lg font-bold mb-2.5 uppercase border-b border-black pb-0.5" style={{ color: headerColor }}>Education</h2> */}
            {/* {resumeData.education.map((item, index) => (
            <div key={index} className="mb-1">
              <div className="flex justify-end text-sm italic">
                <span>{item.startYear} - {item.endYear}</span>
              </div>
              <p className="font-semibold">{item.degree}</p>
              <p className="">{item.school}</p>
            </div>
          ))} */}
            <EducationSection
              itemClassNames={{
                school: "",
                degree: "",
                location: "",
              }}
              layout="row"
              educationData={resumeData?.education}
              headerColor={backgroundColorss}
            />
          </div>
        )}
      </section>

      <section className="skills mb-6">
        {/* <Droppable droppableId="skills" type="SKILLS"> */}
        {/* {(provided) => (
          <ul
            className="pl-5 "
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {resumeData.skills.map((skill, index) => (
              <Draggable
                key={`SKILLS-${index}`}
                draggableId={`SKILLS-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`hover:scale-105 transition-transform duration-300 text-sm mb-1.5 ${snapshot.isDragging &&
                      "outline-dashed outline-2 outline-gray-400 bg-white"
                      }`}
                  >
                    <Skills title={skill.title} skills={skill.skills} />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul> */}
        <SkillsWrapper
          skills={resumeData.skills}
          headerColor={backgroundColorss}
          droppableId="skills-section-1"
          className="mt-4"
          layout="row"
        />
      </section>
    </div>
  );
};



export default Template12;
