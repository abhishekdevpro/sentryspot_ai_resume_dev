import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CoverLetterContext } from "../../context/CoverLetterContext";

const PersonalInfoWrapper = ({
  personalDetails,
  editable = false,
  headerColor = "black",
  className = "",
}) => {
  const { backgroundColorss } = useContext(CoverLetterContext);

  return (
    <div className={`mb-4 ${className}`}>
      <div className="space-y-2">
        {personalDetails.name && (
          <div>
            <h2
              style={{
                color: `${
                  headerColor === "black" ? backgroundColorss : headerColor
                }`,
                borderBottom: `2px solid ${
                  headerColor === "black" ? backgroundColorss : headerColor
                }`,
              }}
              className="text-4xl font-bold mb-2 break-words whitespace-normal "
            >
              {personalDetails.name}
            </h2>
          </div>
        )}
        {personalDetails.email && (
          <p
            style={{ color: headerColor }}
            className={`break-words ${
              editable
                ? "break-words whitespace-normal hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                : ""
            }`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <strong>Email:</strong> {personalDetails.email}
          </p>
        )}
        {personalDetails.address && (
          <p
            style={{ color: headerColor }}
            className={`break-words ${
              editable
                ? "break-words whitespace-normal hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                : ""
            }`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <strong>Address:</strong> {personalDetails.address}
          </p>
        )}
        {personalDetails.contact && (
          <p
            style={{ color: headerColor }}
            className={`break-words ${
              editable
                ? " break-words whitespace-normal hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                : ""
            }`}
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
