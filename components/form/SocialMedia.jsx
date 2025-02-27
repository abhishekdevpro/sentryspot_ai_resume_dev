// import FormButton from "./FormButton";
// import React, { useContext } from "react";
// import { ResumeContext } from "../../pages/builder";

// const SocialMedia = () => {
//   const { resumeData, setResumeData } = useContext(ResumeContext);

//   // social media
//   const handleSocialMedia = (e, index) => {
//     const newSocialMedia = [...resumeData.socialMedia];
//     newSocialMedia[index][e.target.name] = e.target.value.replace(
//       "https://",
//       ""
//     );
//     setResumeData({ ...resumeData, socialMedia: newSocialMedia });
//   };

//   const addSocialMedia = () => {
//     setResumeData({
//       ...resumeData,
//       socialMedia: [...resumeData.socialMedia, { socialMedia: "", link: "" }],
//     });
//   };

//   const removeSocialMedia = (index) => {
//     const newSocialMedia = [...resumeData.socialMedia];
//     newSocialMedia[index] = newSocialMedia[newSocialMedia.length - 1];
//     newSocialMedia.pop();
//     setResumeData({ ...resumeData, socialMedia: newSocialMedia });
//   };

//   return (
//     <div className="flex-col flex items-center gap-3 w-full mt-10 px-10">
//       <h2 className="input-title text-white text-3xl">Social Media</h2>
//       <h2 className="input-title text-white ">
//         Please metion platform and there link
//       </h2>
//       {resumeData.socialMedia.map((socialMedia, index) => (
//         <div key={index} className="flex-wrap-gap-2">
//           <input
//             type="text"
//             placeholder="Social Media"
//             name="socialMedia"
//             className="other-input border-black bo font-semibold bg-gray-200 text-center w-full"
//             value={socialMedia.socialMedia}
//             onChange={(e) => handleSocialMedia(e, index)}
//           />
//           <input
//             type="text"
//             placeholder="Link"
//             name="link"
//             className="other-input border-black border w-full"
//             value={socialMedia.link}
//             onChange={(e) => handleSocialMedia(e, index)}
//           />
//         </div>
//       ))}
//       <FormButton
//         size={resumeData.socialMedia.length}
//         add={addSocialMedia}
//         remove={removeSocialMedia}
//       />
//     </div>
//   );
// };

// export default SocialMedia;

import { ResumeContext } from "../context/ResumeContext";
import FormButton from "./FormButton";
import React, { useContext, useState } from "react";
import { MdRemoveCircle } from "react-icons/md";
import { AlertCircle, X } from "lucide-react";

import { useRouter } from "next/router";
const SOCIAL_MEDIA_OPTIONS = [
  { name: "GitHub", baseUrl: "https://github.com/" },
  { name: "LinkedIn", baseUrl: "https://linkedin.com/in/" },
  { name: "Twitter", baseUrl: "https://twitter.com/" },
  { name: "Facebook", baseUrl: "https://facebook.com/" },
  { name: "Instagram", baseUrl: "https://instagram.com/" },
  { name: "Website", baseUrl: "https://" },
];

const SocialMedia = () => {
  const { resumeData, setResumeData, resumeStrength, setResumeStrength } =
    useContext(ResumeContext);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const router = useRouter();
  const { improve } = router.query;
  // Handle the changes in social media dropdown and URL input
  const handleSocialMedia = (e, index) => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia[index][e.target.name] = e.target.value.replace(
      "https://",
      ""
    );
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  // Handle platform selection change and set default link
  const handlePlatformChange = (index, platform) => {
    const newSocialMedia = [...resumeData.socialMedia];

    // Find the selected platform in the SOCIAL_MEDIA_OPTIONS array
    const selectedPlatform = SOCIAL_MEDIA_OPTIONS.find(
      (option) => option.name === platform
    );

    // Check if the selectedPlatform exists before trying to access baseUrl
    if (selectedPlatform) {
      newSocialMedia[index].socialMedia = platform;
      newSocialMedia[index].link = selectedPlatform.baseUrl; // Set the default link for selected platform
      setResumeData({ ...resumeData, socialMedia: newSocialMedia });
    } else {
      console.error(
        `Platform "${platform}" not found in SOCIAL_MEDIA_OPTIONS.`
      );
    }
  };

  // Add a new social media entry
  const addSocialMedia = () => {
    setResumeData({
      ...resumeData,
      socialMedia: [...resumeData.socialMedia, { socialMedia: "", link: "" }],
    });
  };

  // Remove a social media entry
  const removeSocialMedia = (index) => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia.splice(index, 1); // Remove the entry at the given index
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };
  const hasErrors = (index, field) => {
    const workStrength = resumeStrength?.social_strenght?.[index];
    return (
      workStrength &&
      Array.isArray(workStrength[field]) &&
      workStrength[field].length > 0
    );
  };
  const getErrorMessages = (index, field) => {
    const workStrength = resumeStrength?.social_strenght?.[index];
    return workStrength && Array.isArray(workStrength[field])
      ? workStrength[field]
      : [];
  };
  return (
    <div className="flex-col flex gap-3 w-full mt-10 px-10">
      <h2 className="input-title text-white text-3xl">Social Media</h2>
      <h2 className="input-title text-white">
        Please mention the platform and their link
      </h2>

      {resumeData.socialMedia.map((socialMedia, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-2 w-full md:w-auto"
        >
          <select
            className="other-input border-black bg-gray-200 font-semibold text-center w-1/3"
            value={socialMedia.socialMedia || ""}
            onChange={(e) => handlePlatformChange(index, e.target.value)}
          >
            <option value="">Select </option>
            {SOCIAL_MEDIA_OPTIONS.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>

          {/* Input for the username or link */}
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Username"
              name="link"
              // className="other-input border-black border w-2/3"
              className={`  w-full other-input border  ${
                improve && hasErrors(index, "socialMedia")
                  ? "border-red-500"
                  : "border-black"
              }`}
              value={socialMedia.link.replace("https://", "")}
              onChange={(e) => handleSocialMedia(e, index)}
            />
            {improve && hasErrors(index, "socialMedia") && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                onClick={() =>
                  setActiveTooltip(
                    activeTooltip === `socialMedia-${index}`
                      ? null
                      : `socialMedia-${index}`
                  )
                }
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
            {activeTooltip === `socialMedia-${index}` && (
              <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="font-medium text-black">
                        Social Media Suggestion
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTooltip(null)}
                      className="text-black transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {getErrorMessages(index, "socialMedia").map((msg, i) => (
                    <div
                      key={i}
                      className="flex items-start space-x-3 mb-3 last:mb-0"
                    >
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                      <p className="text-black text-sm">{msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => removeSocialMedia(index)}
            aria-label="Remove"
            className="p-2 text-white bg-red-700 rounded-lg text-xl mb-2"
          >
            <MdRemoveCircle />
          </button>
        </div>
      ))}
      <FormButton
        size={resumeData.socialMedia.length}
        add={addSocialMedia}
        remove={removeSocialMedia}
      />
      <div className=" mb-2">
        {/* <button type="button" 
          aria-label="Add"
          className="p-2 text-white bg-black rounded-lg text-sm"   onClick={addSocialMedia}> 
        
         <span> ✙ Add section</span>
        </button> */}
      </div>
    </div>
  );
};

export default SocialMedia;
