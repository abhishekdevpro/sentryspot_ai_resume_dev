import React, { useContext } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import { ResumeContext } from "../context/ResumeContext";

const ImageWrapper = ({
  src,
  alt,
  defaultSize = 100,
  size,
  border = "2px",
  borderColor = "black",
}) => {
  const finalSize = size || defaultSize; // Use dynamic size if provided, otherwise use default size

  return (
    <div
      className="rounded-full overflow-hidden"
      style={{
        width: `${finalSize}px`,
        height: `${finalSize}px`,
        border: `${border} solid ${borderColor}`,
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={finalSize}
          height={finalSize}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
    </div>
  );
};

ImageWrapper.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  defaultSize: PropTypes.number,
  size: PropTypes.number,
  border: PropTypes.string,
  borderColor: PropTypes.string,
};

ImageWrapper.defaultProps = {
  alt: "profile image",
  defaultSize: 100,
  border: "2px",
  borderColor: "black",
};

// const TextWrapper = ({
//   name,
//   position,
//   headerColor = "black",
//   orientation = "column",
//   className = "",
// }) => {
//   return (
//     <div
//       className={`flex ${orientation === "row" ? "flex-row items-center " : "flex-col justify-center items-center"} ${className}`}
//     >
//       <h1 className="text-2xl font-bold" style={{ color: headerColor }}>
//         {name}
//       </h1>
//       <p className="text-lg text-gray-700">{position}</p>
//     </div>
//   );
// };

const TextWrapper = ({
  name,
  position,
  headerColor = "black",
  orientation = "column",
  className = "",
}) => {
  return (
    <div
      className={`flex ${
        orientation === "row" ? "flex-row " : "flex-col "
      }  ${className}`}
    >
      <h1
        className="text-2xl font-bold break-words whitespace-normal"
        style={{ color: headerColor }}
      >
        {name}
      </h1>
      <p className="text-lg font-semibold text-gray-700 break-words whitespace-normal">
        {position}
      </p>
    </div>
  );
};

TextWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string,
  headerColor: PropTypes.string,
  orientation: PropTypes.oneOf(["row", "column"]),
  className: PropTypes.string,
};

TextWrapper.defaultProps = {
  position: "",
  headerColor: "black",
  orientation: "column",
  className: "",
};

const SummaryWrapper = ({
  summary,
  headerColor = "black",
  editable = true,
  className = "",
}) => {
  const { backgroundColorss } = useContext(ResumeContext);
  return (
    summary &&
    summary.length > 0 && (
      <div className={`mb-1 ${className}`}>
        <h2
          style={{
            color: `${
              headerColor == "black" ? `${backgroundColorss}` : headerColor
            }`,
            borderBottom: `2px solid ${
              headerColor == "black" ? `${backgroundColorss}` : headerColor
            }`,
          }}
          className="text-lg font-bold mb-1 "
        >
          Summary
        </h2>
        <p
          style={{ color: headerColor }}
          className="break-words whitespace-normal hover:outline-dashed hover:scale-105 hover:outline-2 hover:outline-gray-400"
          contentEditable={editable}
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{ __html: summary }}
        ></p>
      </div>
    )
  );
};

SummaryWrapper.propTypes = {
  summary: PropTypes.string,
  headerColor: PropTypes.string,
  editable: PropTypes.bool,
  className: PropTypes.string,
};

SummaryWrapper.defaultProps = {
  summary: "",
  headerColor: "black",
  editable: true,
  className: "",
};

export { ImageWrapper, TextWrapper, SummaryWrapper };
