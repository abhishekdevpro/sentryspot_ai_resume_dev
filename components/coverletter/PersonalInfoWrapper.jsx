import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ResumeContext } from "../context/ResumeContext";

const PersonalInfoWrapper = ({ personalDetails, editable = false, headerColor = "black", className = "" }) => {
  const { backgroundColorss } = useContext(ResumeContext);

  return (
    <div className={`mb-4 ${className}`}>
      <h2
        style={{
          color: `${headerColor === "black" ? backgroundColorss : headerColor}`,
          borderBottom: `2px solid ${headerColor === "black" ? backgroundColorss : headerColor}`,
        }}
        className="text-lg font-bold mb-2"
      >
        Personal Information
      </h2>
      <div className="space-y-2">
        {personalDetails.name && (
          <p
            style={{ color: headerColor }}
            className={`break-words ${editable ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400" : ""}`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <strong>Name:</strong> {personalDetails.name}
          </p>
        )}
        {personalDetails.email && (
          <p
            style={{ color: headerColor }}
            className={`break-words ${editable ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400" : ""}`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <strong>Email:</strong> {personalDetails.email}
          </p>
        )}
        {personalDetails.address && (
          <p
            style={{ color: headerColor }}
            className={`break-words ${editable ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400" : ""}`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <strong>Address:</strong> {personalDetails.address}
          </p>
        )}
        {personalDetails.contact && (
          <p
            style={{ color: headerColor }}
            className={`break-words ${editable ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400" : ""}`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <strong>Contact:</strong> {personalDetails.contact}
          </p>
        )}
      </div>
    </div>
  );
};

PersonalInfoWrapper.propTypes = {
  personalDetails: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    contact: PropTypes.string,
  }).isRequired,
  editable: PropTypes.bool,
  headerColor: PropTypes.string,
  className: PropTypes.string,
};

PersonalInfoWrapper.defaultProps = {
  editable: false,
  headerColor: "black",
  className: "",
};

export default PersonalInfoWrapper;
