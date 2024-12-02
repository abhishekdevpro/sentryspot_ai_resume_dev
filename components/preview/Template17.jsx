// import React from "react";
import { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Image from "next/image";

import Certification from "./Certification";
// import Image from "next/image";
import Link from "next/link";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaYoutube, FaBold, FaItalic, FaPlus, FaMinus, FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink,
    FaUnderline,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import dynamic from "next/dynamic";
// Importing draggable components dynamically
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false })
const Template17 = () => {
    const { resumeData, setResumeData, headerColor } = useContext(ResumeContext);
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
      <div className="max-w-3xl mx-auto p-5 bg-white-500 shadow-md">
        {/* <div class="absolute bg-yellow-600 h-1/5 w-5/12	 bg-cover opacity-10"></div> */}
        <div class="flex gap-1 items-start">
          <div class="border-2 border-zinc-950 text-black	 w-1/3 p-5 h-full">
            <div class="border-solid border-black-900 mb-5">
              <Image
                src={resumeData.profilePicture}
                alt="profile"
                width={100}
                height={100}
                className="object-cover h-full w-full"
              />
            </div>
            <div class="text-left text-white">
              <div className="mb-8">
                <h2
                  className="text-xl text-black font-bold mb-4 bg-yellow-600 h-1/5 w-5/12	 bg-cover"
                  style={{ color: headerColor }}
                >
                  CONTACT
                </h2>
                <ContactInfo
                  mainclass=" gap-1 mb-1 text-black mb-5 contact"
                  linkclass="inline-flex items-center gap-1"
                  teldata={resumeData.contactInformation}
                  emaildata={resumeData.email}
                  addressdata={resumeData.address}
                  telicon={<MdPhone />}
                  emailicon={<MdEmail />}
                  addressicon={<MdLocationOn />}
                />
              </div>
            </div>
            <div className="mb-8">
              <h2
                className="text-xl text-black mb-5 font-bold mb-4 bg-yellow-600 h-1/5 w-5/12	 bg-cover"
                style={{ color: headerColor }}
              >
                EDUCATION
              </h2>
              <div className="mb-4">
                <ul className="list-none p-0">
                  {resumeData.education.length > 0 && (
                    <div className="mb-5">
                      {resumeData.education.map((item, index) => (
                        <div key={index} className="text-black mb-5">
                          <p
                            className="content i-bold "
                            style={{ fontSize: "1.3rem" }}
                          >
                            {item.degree}
                          </p>
                          <p className="content">{item.school}</p>
                          <DateRange
                            className="mb-1 text-lg"
                            startYear={item.startYear}
                            endYear={item.endYear}
                            id={`education-start-end-date`}
                          />
                          <p className="content">{item.location}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </ul>
              </div>
            </div>
            <div className="mb-8">
              <h2
                className="text-xl font-bold text-black mb-4 bg-yellow-600 h-1/5 w-5/12	 bg-cover"
                style={{ color: headerColor }}
              >
                SKILLS
              </h2>

              <Droppable droppableId="skills" type="SKILLS">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {resumeData.skills.map((skill, index) => (
                      <Draggable
                        key={`SKILLS-${index}`}
                        draggableId={`SKILLS-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`text-black mb-5 hover:scale-105 transition-transform duration-300 mb-1 ${
                              snapshot.isDragging &&
                              "outline-dashed outline-2 outline-gray-400 bg-white"
                            }`}
                          >
                            <Skills title={skill.title} skills={skill.skills} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div className="mb-8">
              <h2
                className="text-xl font-bold text-black bg-yellow-600 h-1/5 w-5/12	 bg-cover"
                style={{ color: headerColor }}
              >
                LANGUAGE
              </h2>
              <div className="flex text-black justify-start mb-4 font-bold">
                <Language languages={resumeData.languages} />
              </div>
            </div>
          </div>
          <div class="p-5 w-2/3">
            <div className="mb-8">
              <h1
                className="text-4xl font-bold mb-4"
                style={{ color: headerColor }}
              >
                {resumeData.name}
              </h1>
              <h2
                className="text-2xl font-semibold mb-3"
                style={{ color: headerColor }}
              >
                {resumeData.position}
              </h2>
            </div>
            <div className="mb-8">
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: headerColor }}
              >
                ABOUT ME
              </h2>
              <div class="border-solid border-b-2 border-gray-800 mb-5"></div>
              {/* <p>
                {resumeData.summary}
                </p> */}
              <p
                dangerouslySetInnerHTML={{
                  __html: resumeData.summary,
                }}
              />
            </div>
            <div className="mb-8">
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: headerColor }}
              >
                EXPERIENCE
              </h2>

              <div>
                <h3
                  className="text-xl font-semibold border-b-2 border-gray-800 pb-2 mb-4"
                  style={{ color: headerColor }}
                >
                  Projects
                </h3>
                {resumeData.workExperience.length > 0 && (
                  <Droppable
                    droppableId="work-experience"
                    type="WORK_EXPERIENCE"
                  >
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {resumeData.workExperience.map((item, index) => (
                          <Draggable
                            key={`${item.company}-${index}`}
                            draggableId={`WORK_EXPERIENCE-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-5 hover:scale-105 transition-transform duration-300 mb-1 ${
                                  snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                }`}
                              >
                                <div className="justify-between space-y-1">
                                  <p
                                    className="content i-bold text-2xl"
                                    style={{ fontSize: "1.3rem" }}
                                  >
                                    {item.company}
                                  </p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <div className="flex flex-row justify-between space-y-1">
                                  <p className="content">{item.position}</p>
                                  <p className="content">{item.location}</p>
                                </div>
                                <p
                                  className="content hyphens-auto"
                                  dangerouslySetInnerHTML={{
                                    __html: item.description,
                                  }}
                                />

                                <Droppable
                                  droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                  type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                                >
                                  {(provided) => (
                                    <ul
                                      className="list-disc ul-padding content"
                                      {...provided.droppableProps}
                                      ref={provided.innerRef}
                                    >
                                      {typeof item.keyAchievements ===
                                        "string" &&
                                        item.keyAchievements
                                          .split("\n")
                                          .map((achievement, subIndex) => (
                                            <Draggable
                                              key={`${item.company}-${index}-${subIndex}`}
                                              draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                                  hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                                  ${
                                                    snapshot.isDragging &&
                                                    "outline-dashed outline-2 outline-gray-400 bg-white"
                                                  }`}
                                                >
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html: achievement,
                                                    }}
                                                    contentEditable
                                                  />
                                                </li>
                                              )}
                                            </Draggable>
                                          ))}
                                      {provided.placeholder}
                                    </ul>
                                  )}
                                </Droppable>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
                {resumeData.projects.length > 0 && (
                  <Droppable droppableId="projects" type="PROJECTS">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <h2
                          className="section-title mb-1 border-b-2 border-gray-300 editable"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }}
                        >
                          Projects
                        </h2>
                        {resumeData.projects.map((item, index) => (
                          <Draggable
                            key={`${item.name}-${index}`}
                            draggableId={`PROJECTS-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`hover:scale-105 transition-transform duration-300 mb-1 ${
                                  snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                }`}
                              >
                                <div className="flex flex-row justify-between space-y-1">
                                  <p className="content i-bold">{item.name}</p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <Link
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="content"
                                >
                                  {item.link}
                                </Link>
                                <p
                                  className="content"
                                  dangerouslySetInnerHTML={{
                                    __html: item.description,
                                  }}
                                />
                                <Droppable
                                  droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                                  type="PROJECTS_KEY_ACHIEVEMENT"
                                >
                                  {(provided) => (
                                    <ul
                                      className="list-disc ul-padding content"
                                      {...provided.droppableProps}
                                      ref={provided.innerRef}
                                    >
                                      {typeof item.keyAchievements ===
                                        "string" &&
                                        item.keyAchievements
                                          .split("\n")
                                          .map((achievement, subIndex) => (
                                            <Draggable
                                              key={`${item.name}-${index}-${subIndex}`}
                                              draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                                  hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                                  ${
                                                    snapshot.isDragging &&
                                                    "outline-dashed outline-2 outline-gray-400 bg-white"
                                                  }`}
                                                >
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html: achievement,
                                                    }}
                                                    contentEditable
                                                  />
                                                </li>
                                              )}
                                            </Draggable>
                                          ))}
                                      {provided.placeholder}
                                    </ul>
                                  )}
                                </Droppable>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </div>
              <div class=" text-left">
                <h2 class="text-2xl font-bold uppercase text-black-900 mb-5">
                  Reference
                </h2>
                <div class="border-solid border-2 border-black mb-5"></div>
                <div class="flex justify-between">
                  <div class="mb-5">
                    <p class="text-xl font-semibold mb-2 uppercase">
                      Estelle Darcy
                    </p>
                    <p class="font-light mb-2">Wardlere Inc. / CTO</p>
                    <p class="font-light mb-2">Phone: 123-456-7890</p>
                    <p class="font-light mb-2">Email: abc@gmail.com</p>
                  </div>
                  <div class="mb-5">
                    <p class="text-xl font-semibold mb-2 uppercase">
                      Harper Richard
                    </p>
                    <p class="font-light mb-2">Wardlere Inc. / CEO</p>
                    <p class="font-light mb-2">Phone: 123-456-7890</p>
                    <p class="font-light mb-2">Email: abc@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

const A4PageWrapper = ({ children }) => {
    const alertA4Size = () => {
        const preview = document.querySelector(".preview");
        const previewHeight = preview.offsetHeight;
        console.log(previewHeight);
        if (previewHeight > 1122) {
            alert("A4 size exceeded");
        }
    };

    return (
        <div className="w-8.5in border p-3" onLoad={alertA4Size}>
            {children}
        </div>
    );

};

export default Template17;
