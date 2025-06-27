// import React from "react";
// import DateRange from "../utility/DateRange";

// const EducationSection = ({
//   educationData,
//   headerColor,
//   hassidebar,
//   className = "",
//   style = {},
//   itemClassNames = {}, 
//   layout = "column", // "column" or "row"
// }) => {
//   if (!educationData || educationData.length === 0) return null;
// console.log(headerColor,"");
//   return (
//     <div className={`mb-1 ${className}`} 
//     >
//        <h2
//          style={{
//           color: headerColor,
//           borderBottom: `2px solid ${headerColor}`,
//         }}
//         className="text-xl font-bold mb-1 "
//       >
//         Education
//       </h2>
//       {educationData.map((item, index) => (
//         <div key={index}  className={`flex  mb-1${
//           layout === "row" ? "flex-row items-center flex-wrap gap-2" : "flex-col gap-2 justify-between"
//         }`}> 
//           <div>
//           <p className={` font-semibold}`}>
//             {item.degree}
//           </p>
//           <p className={``}>{item.school}</p>
//           </div>
//           <div>
//           <DateRange
//             startYear={item.startYear}
//             endYear={item.endYear}
//             // id={`education-start-end-date-${index}`}
//           />
//           <p className={``}>
//             {item.location}
//           </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EducationSection;
import React, { useContext } from "react";
import DateRange from "../utility/DateRange";
import { ResumeContext } from "../context/ResumeContext";

const EducationSection = ({
  educationData,
  headerColor,
  className = "",
  layout = "column", // "column" or "row"
}) => {
  const {backgroundColorss}= useContext(ResumeContext)
  if (!educationData || educationData.length === 0) return null;

  return (
    <div className={`mb-1 ${className}`}>
      <h2
        style={{
          color: `${headerColor == "black" ? `${backgroundColorss}` : headerColor}`,
          borderBottom: `2px solid ${headerColor == "black" ? `${backgroundColorss}` : headerColor}`,
        }}
        className="text-xl font-bold mb-1"
      >
        Education
      </h2>
      {educationData.map((item, index) => (
        <div
          key={index}
          className={`flex mb-1 ${
            layout === "row"
              ? "flex-row items-center justify-between flex-wrap gap-2"
              : "flex-col gap-2 justify-between"
          }`}
        >
          <div>
            <p
              className="font-semibold break-words whitespace-normal"
              style={{ color: layout === "row" || headerColor == "black" ? "black" : "white" }}
            >
              {item.degree}
            </p>
            <p
            className="break-words whitespace-normal"
              style={{ color: layout === "row" || headerColor == "black" ? "black" : "white" }}
            >
              {item.school}
            </p>
          </div>
          <div>
            <DateRange layout={layout} startYear={item.startYear} endYear={item.endYear} />
            <p
            className="break-words whitespace-normal"
              style={{ color: layout === "row" || headerColor == "black" ? "black" : "white" }}
            >
              {item.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationSection;
