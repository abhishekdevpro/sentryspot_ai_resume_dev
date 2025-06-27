
import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

const Skills = ({ title, skills, color = "black", layout }) => {
  const { resumeData, setResumeData, backgroundColorss } = useContext(ResumeContext);
  const handleTitleChange = (e) => {
    const newSkills = [...resumeData.skills];
    const skillType = newSkills.find((skillType) => skillType.title === title);
    if (skillType) {
      skillType.title = e.target.innerText;
    }
    setResumeData({ ...resumeData, skills: newSkills });
  };

  return (
    skills.length > 0 && (
      <div className="">
        <h2
           style={{
            color: layout === "row" || !backgroundColorss ? "black" : color,
          }}
          className="text-md font-semibold mb-2 editable"
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTitleChange}
        >
          {title}
        </h2>
        {layout === "row"  ? (
          <div
            style={{ color: "black" }} // Explicitly set color to black for row layout
            className=""
          >
            {skills.join(", ")}
          </div>
        ) : (
          <ul
            style={{ color: backgroundColorss? color:"black" }}
            className="list-disc ml-6"
          >
            {skills.map((skill, index) => (
              <li key={index} className="break-words whitespace-normal">
                {skill}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  );
};

export default Skills;
