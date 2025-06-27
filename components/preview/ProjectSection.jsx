// ProjectsSection.js
import React from "react";
import dynamic from "next/dynamic";
import DateRange from "../utility/DateRange";
import Link from "next/link";
import DateRangeExperience from "../utility/DateRangeExperience";
import { LinkIcon } from "lucide-react";
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
const ProjectsSection = ({ resumeData, headerColor }) => {
  if (!resumeData?.projects || resumeData.projects.length === 0) {
    return null;
  }

  // console.log(resumeData?.projects ,"llllll");

  return (
    <Droppable droppableId="projects" type="PROJECTS">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <h2
            className="text-lg font-bold mb-1 border-b-2 border-gray-300 editable"
            contentEditable
            suppressContentEditableWarning
            style={{
              color: headerColor,
              borderBottom: `2px solid ${headerColor}`,
            }}
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
                  {/* <div className="flex flex-row justify-between space-y-1">
                    <p className="content i-bold break-words whitespace-normal">{item.name}</p>
                    <DateRangeExperience
                      startYear={item.startYear}
                      endYear={item.endYear}
                      id={`projects-start-end-date`}
                    />
                  </div> */}
                  <div className="flex flex-row justify-between items-start space-y-1">
                    <div className="flex items-center gap-2 break-words whitespace-normal max-w-[70%]">
                      <p className="font-semibold break-words whitespace-normal">
                        {item.name}
                      </p>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <LinkIcon size={16} />
                        </a>
                      )}
                    </div>

                    <DateRangeExperience
                      startYear={item.startYear}
                      endYear={item.endYear}
                      // id={`projects-start-end-date`}
                    />
                  </div>
                  {/* <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content"
                  >
                    {item.link}
                  </Link> */}
                  <p
                    className="break-words whitespace-normal hover:outline-dashed hover:scale-105 hover:outline-2 hover:outline-gray-400"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></p>

                  <Droppable
                    droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                    type="PROJECTS_KEY_ACHIEVEMENT"
                  >
                    {(provided) => (
                      <ul
                        className="list-disc ul-padding content pl-6"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {item.keyAchievements &&
                          item.keyAchievements.map((achievement, subIndex) => (
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
                                    hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
  );
};

export default ProjectsSection;
