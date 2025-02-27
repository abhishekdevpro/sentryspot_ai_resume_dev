// // import React from "react";
// // import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";


// // const ContactAndSocialMedia = ({
// //   contactData,
// //   socialMediaData,
// //   icons,
// //   layout = "column", // "column" or "row"
// //   contactClass = "",
// //   socialMediaClass = "",
// //   addressCharacterLimit = 30, // Default character limit for address
// // }) => {
// //   return (
// //     <div
// //       className={`flex ${
// //         layout === "row" ? "flex-row items-center justify-center flex-wrap gap-2" : "flex-col gap-2"
// //       }`}
// //     >
// //       {/* Contact Information */}
// //       {contactData && (
// //         <>
// //           {contactData.teldata && (
// //             <div className={`flex items-center gap-2 ${contactClass}`}>
// //               <span>{<MdPhone />}</span>
// //               <span>{contactData.teldata}</span>
// //             </div>
// //           )}
// //           {contactData.emaildata && (
// //             <div className={`flex items-center gap-2 ${contactClass}`}>
// //               <span>{<MdEmail />}</span>
// //               <span>{contactData.emaildata}</span>
// //             </div>
// //           )}
// //           {contactData.addressdata && (
// //             <div className={`flex items-center gap-2 ${contactClass}`}>
// //               <span>{<MdLocationOn />}</span>
// //               <span>
// //                 {contactData.addressdata.length > addressCharacterLimit
// //                   ? `${contactData.addressdata.slice(0, addressCharacterLimit)}...`
// //                   : contactData.addressdata}
// //               </span>
// //             </div>
// //           )}
// //         </>
// //       )}

// //       {/* Social Media Links */}
// //       {Array.isArray(socialMediaData) && socialMediaData.length > 0 ? (
// //         socialMediaData.map((socialMedia, index) => (
// //           <a
// //             href={`http://${socialMedia.link}`}
// //             aria-label={socialMedia.socialMedia}
// //             key={index}
// //             title={socialMedia.socialMedia}
// //             target="_blank"
// //             rel="noreferrer"
// //             className={`flex items-center gap-2 transition-transform transform hover:scale-105 ${socialMediaClass}`}
// //           >
// //             {icons.map((icon, iconIndex) => {
// //               if (icon.name === socialMedia.socialMedia.toLowerCase()) {
// //                 return <span key={iconIndex}>{icon.icon}</span>;
// //               }
// //               return null;
// //             })}
// //             <span className="truncate">{socialMedia.socialMedia}</span>
// //           </a>
// //         ))
// //       ) : (
// //         <p className="text-gray-600 dark:text-gray-300">
// //           No social media links available
// //         </p>
// //       )}
// //     </div>
// //   );
// // };

// // export default ContactAndSocialMedia;

// // import React from "react";
// // import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";

// // const ContactAndSocialMedia = ({
// //   contactData,
// //   socialMediaData,
// //   icons,
// //   layout = "column", // "column" or "row"
// //   contactClass = "",
// //   socialMediaClass = "",
// //   addressCharacterLimit = 30, // Default character limit for address
// //   textColor = "text-black", // Default text color
// // }) => {
// //   return (
// //     <div
// //       className={`flex ${
// //         layout === "row"
// //           ? "flex-row items-center justify-center flex-wrap gap-2"
// //           : "flex-col gap-2"
// //       }`}
// //     >
// //       {/* Contact Information */}
// //       {contactData && (
// //         <>
// //           {contactData.teldata && (
// //             <div className={`flex items-center gap-2 ${contactClass}`}>
// //               <span className={`${textColor}`}>{<MdPhone />}</span>
// //               <span className={`${textColor}`}>{contactData.teldata}</span>
// //             </div>
// //           )}
// //           {contactData.emaildata && (
// //             <div className={`flex items-center gap-2 ${contactClass}`}>
// //               <span className={`${textColor}`}>{<MdEmail />}</span>
// //               <span className={`${textColor}`}>{contactData.emaildata}</span>
// //             </div>
// //           )}
// //           {contactData.addressdata && (
// //             <div className={`flex items-center gap-2 ${contactClass}`}>
// //               <span className={`${textColor}`}>{<MdLocationOn />}</span>
// //               <span className={`${textColor}`}>
// //                 {contactData.addressdata.length > addressCharacterLimit
// //                   ? `${contactData.addressdata.slice(0, addressCharacterLimit)}...`
// //                   : contactData.addressdata}
// //               </span>
// //             </div>
// //           )}
// //         </>
// //       )}

//       // {/* Social Media Links */}
//       // {Array.isArray(socialMediaData) && socialMediaData.length > 0 ? (
//       //   socialMediaData.map((socialMedia, index) => (
//       //     <a
//       //       href={`http://${socialMedia.link}`}
//       //       aria-label={socialMedia.socialMedia}
//       //       key={index}
//       //       title={socialMedia.socialMedia}
//       //       target="_blank"
//       //       rel="noreferrer"
//       //       className={`flex items-center gap-2 transition-transform transform hover:scale-105 ${socialMediaClass}`}
//       //     >
//       //       {icons.map((icon, iconIndex) => {
//       //         if (icon.name === socialMedia.socialMedia.toLowerCase()) {
//       //           return <span key={iconIndex} className={`${textColor}`}>{icon.icon}</span>;
//       //         }
//       //         return null;
//       //       })}
//       //       <span className={`truncate ${textColor}`}>{socialMedia.socialMedia}</span>
//       //     </a>
//       //   ))
//       // ) : (
//       //   <p className={`text-gray-600 dark:text-gray-300 ${textColor}`}>
//       //     No social media links available
//       //   </p>
//       // )}
// //     </div>
// //   );
// // };

// // export default ContactAndSocialMedia;
// // import React, { useContext } from "react";
// // import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
// // import { ResumeContext } from "../context/ResumeContext";

// // const ContactAndSocialMedia = ({
// //   title, // Title prop
// //   contactData,
// //   socialMediaData,
// //   icons,
// //   layout = "column", // "column" or "row"
// //   contactClass = "",
// //   socialMediaClass = "",
// //   addressCharacterLimit = 30, // Default character limit for address
// //   textColor = "text-black", // Default text color
// //   className=""
// // }) => {
  
// //   const {backgroundColorss} =  useContext(ResumeContext)
// //   {backgroundColorss?textColor:textColor="text-black"}



// //     return (
// //     <div
// //     className={`flex ${
// //               layout === "row"
// //                 ? "flex-row items-center flex-wrap gap-2"
// //                 : "flex-col gap-2"
// //             }   ${className}`}
// //     >
// //       {/* Title */}
// //       {title && (
// //         <h3 
// //         className={`text-xl font-bold mb-2 border-b-2 ${textColor=="text-black"?"border-black":"border-white"} ${textColor}`}>
// //           {title}
// //         </h3>
// //       )}

// //       {/* Contact Information */}
// //       {contactData && (
// //         <>
// //           {contactData.teldata && (
// //             <div className={`flex items-center gap-4 ${contactClass}`}>
// //               <span className={`${textColor}`}>{<MdPhone />}</span>
// //               <span className={`${textColor}`}>{contactData.teldata}</span>
// //             </div>
// //           )}
// //           {contactData.emaildata && (
// //             <div className={`flex items-center gap-4 ${contactClass}`}>
// //               <span className={`${textColor}`}>{<MdEmail />}</span>
// //               <span className={`${textColor}`}>{contactData.emaildata}</span>
// //             </div>
// //           )}
// //           {contactData.addressdata && (
// //             <div className={`flex items-center gap-4 ${contactClass}`}>
// //               <span className={`${textColor}`}>{<MdLocationOn />}</span>
// //               <span className={`${textColor}`}>
// //                 {contactData.addressdata.length > addressCharacterLimit
// //                   ? `${contactData.addressdata.slice(0, addressCharacterLimit)}...`
// //                   : contactData.addressdata}
// //               </span>
// //             </div>
// //           )}
// //         </>
// //       )}

      
// //        {Array.isArray(socialMediaData) && socialMediaData.length > 0 ? (
// //         socialMediaData.map((socialMedia, index) => (
// //           <a
// //             href={`http://${socialMedia.link}`}
// //             aria-label={socialMedia.socialMedia}
// //             key={index}
// //             title={socialMedia.socialMedia}
// //             target="_blank"
// //             rel="noreferrer"
// //             className={`flex items-center gap-4 transition-transform transform hover:scale-105 ${socialMediaClass}`}
// //           >
// //             {icons.map((icon, iconIndex) => {
// //               if (icon.name === socialMedia.socialMedia.toLowerCase()) {
// //                 return <span key={iconIndex} className={`${textColor}`}>{icon.icon}</span>;
// //               }
// //               return null;
// //             })}
// //             <span className={`truncate ${textColor}`}>{socialMedia.socialMedia}</span>
// //           </a>
// //         ))
// //       ) : (
// //         <p className={`text-gray-600 dark:text-gray-300 ${textColor}`}>
        
// //         </p>
// //       )}
// //     </div>
// //   );
// // };

// // export default ContactAndSocialMedia;
// import React, { useContext } from "react";
// import { Phone, Mail, MapPin, Github, Linkedin, Twitter, Globe, Instagram, Facebook } from "lucide-react";
// import { ResumeContext } from "../context/ResumeContext";

// const ContactAndSocialMedia = ({
//   title,
//   contactData,
//   socialMediaData,
//   icons,
//   layout = "column",
//   contactClass = "",
//   socialMediaClass = "",
//   addressCharacterLimit = 30,
//   textColor = "text-black",
//   className = ""
// }) => {
//   const { backgroundColorss } = useContext(ResumeContext);
//   { backgroundColorss ? textColor : textColor = "text-black" }

//   // Icon mapping object
//   const iconComponents = {
//     phone: Phone,
//     email: Mail,
//     location: MapPin,
//     github: Github,
//     linkedin: Linkedin,
//     twitter: Twitter,
//     website: Globe,
//     instagram: Instagram,
//     facebook: Facebook
//   };

//   // Helper function to get icon component
//   const getIcon = (iconName) => {
//     const IconComponent = iconComponents[iconName.toLowerCase()];
//     return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
//   };

//   return (
//     <div
//       className={`flex ${
//         layout === "row"
//           ? "flex-row items-center flex-wrap gap-2"
//           : "flex-col gap-2"
//       } ${className}`}
//     >
//       {/* Title */}
//       {title && (
//         <h3 className={`text-xl font-bold mb-2 border-b-2 ${
//           textColor === "text-black" ? "border-black" : "border-white"
//         } ${textColor}`}>
//           {title}
//         </h3>
//       )}

//       {/* Contact Information */}
//       {contactData && (
//         <>
//           {contactData.teldata && (
//             <div className={`flex items-center gap-4 ${contactClass}`}>
//               <span className={`${textColor}`}>{getIcon("phone")}</span>
//               <span className={`${textColor}`}>{contactData.teldata}</span>
//             </div>
//           )}
//           {contactData.emaildata && (
//             <div className={`flex items-center gap-4 ${contactClass}`}>
//               <span className={`${textColor}`}>{getIcon("email")}</span>
//               <span className={`${textColor}`}>{contactData.emaildata}</span>
//             </div>
//           )}
//           {contactData.addressdata && (
//             <div className={`flex items-center gap-4 ${contactClass}`}>
//               <span className={`${textColor}`}>{getIcon("location")}</span>
//               <span className={`${textColor}`}>
//                 {contactData.addressdata.length > addressCharacterLimit
//                   ? `${contactData.addressdata.slice(0, addressCharacterLimit)}...`
//                   : contactData.addressdata}
//               </span>
//             </div>
//           )}
//         </>
//       )}

//       {/* Social Media Links */}
//       {Array.isArray(socialMediaData) && socialMediaData.length > 0 ? (
//         socialMediaData.map((socialMedia, index) => (
//           <a
//             href={`http://${socialMedia.link}`}
//             aria-label={socialMedia.socialMedia}
//             key={index}
//             title={socialMedia.socialMedia}
//             target="_blank"
//             rel="noreferrer"
//             className={`flex items-center gap-4 transition-transform transform hover:scale-105 ${socialMediaClass}`}
//           >
//             <span className={`${textColor}`}>
//               {getIcon(socialMedia.socialMedia.toLowerCase())}
//             </span>
//             <span className={`truncate ${textColor}`}>
//               {socialMedia.socialMedia}
//             </span>
//           </a>
//         ))
//       ) : (
//         <p className={`text-gray-600 dark:text-gray-300 ${textColor}`}></p>
//       )}
//     </div>
//   );
// };

// export default ContactAndSocialMedia;
// import React, { useContext } from "react";
// import { Phone, Mail, MapPin, Github, Linkedin, Twitter, Globe, Instagram, Facebook } from "lucide-react";
// import { ResumeContext } from "../context/ResumeContext";

// const ContactAndSocialMedia = ({
//   title,
//   contactData,
//   socialMediaData,
//   icons,
//   layout = "column",
//   contactClass = "",
//   socialMediaClass = "",
//   addressCharacterLimit = 30,
//   textColor = "text-black",
//   className = ""
// }) => {
//   const { backgroundColorss } = useContext(ResumeContext);
//   { backgroundColorss ? textColor : textColor = "text-black" }

//   const iconComponents = {
//     phone: Phone,
//     email: Mail,
//     location: MapPin,
//     github: Github,
//     linkedin: Linkedin,
//     twitter: Twitter,
//     website: Globe,
//     instagram: Instagram,
//     facebook: Facebook
//   };

//   const getIcon = (iconName) => {
//     const IconComponent = iconComponents[iconName.toLowerCase()];
//     return IconComponent ? <div className={`${layout==="row"?"px-2":"pr-2"}`}>
//       <IconComponent className="w-5 h-5" />
//     </div> : null;
//   };

//   return (
//     <div
//       className={`flex ${
//         layout === "row"
//           ? "flex-row items-center flex-wrap gap-2"
//           : "flex-col gap-2"
//       } ${className}`}
//     >
//       {/* Title */}
//       {title && (
//         <h3 className={`text-xl font-bold mb-2 border-b-2 ${
//           textColor === "text-black" ? "border-black" : "border-white"
//         } ${textColor}`}>
//           {title}&nbsp;
//         </h3>
//       )}

//       {/* Contact Information */}
//       {contactData && (
//         <>
//           {contactData.teldata && (
//             <div className={`flex items-center gap-2 ${contactClass}`}>
//               <span className={`${textColor}`}>{getIcon("phone")}</span>
//               &nbsp;
//               <span className={`${textColor}`}>{contactData.teldata}</span>
//             </div>
//           )}
//           {contactData.emaildata && (
//             <div className={`flex items-center gap-2 ${contactClass}`}>
//               <span className={`${textColor}`}>{getIcon("email")}</span>
//               &nbsp;
//               <span className={`${textColor}`}>{contactData.emaildata}</span>
//             </div>
//           )}
//           {contactData.addressdata && (
//             <div className={`flex items-center gap-2 ${contactClass}`}>
//               <span className={`${textColor}`}>{getIcon("location")}</span>
//               &nbsp;
//               <span className={`${textColor}`}>
//                 {contactData.addressdata.length > addressCharacterLimit
//                   ? `${contactData.addressdata.slice(0, addressCharacterLimit)}...`
//                   : contactData.addressdata}
//               </span>
//             </div>
//           )}
//         </>
//       )}

//       {/* Social Media Links */}
//       {Array.isArray(socialMediaData) && socialMediaData.length > 0 ? (
//         socialMediaData.map((socialMedia, index) => (
//           <a
//             href={`http://${socialMedia.link}`}
//             aria-label={socialMedia.socialMedia}
//             key={index}
//             title={socialMedia.socialMedia}
//             target="_blank"
//             rel="noreferrer"
//             className={`flex items-center gap-2  ${socialMediaClass}`}
//           >
//             <span className={`${textColor}`}>
//               {getIcon(socialMedia.socialMedia.toLowerCase())}
//             </span>
//             &nbsp;
//             <span className={`truncate ${textColor}`}>
//               {socialMedia.socialMedia}
//             </span>
//           </a>
//         ))
//       ) : (
//         <p className={`text-gray-600 dark:text-gray-300 ${textColor}`}>&nbsp;</p>
//       )}
//     </div>
//   );
// };

// export default ContactAndSocialMedia;
import React, { useContext } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Instagram,
  Facebook
} from "lucide-react";
import { ResumeContext } from "../context/ResumeContext";

const ICON_COMPONENTS = {
  phone: Phone,
  email: Mail,
  location: MapPin,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  website: Globe,
  instagram: Instagram,
  facebook: Facebook
};

const ContactAndSocialMedia = ({
  title,
  contactData,
  socialMediaData,
  layout = "column",
  contactClass = "",
  socialMediaClass = "",
  addressCharacterLimit = 30,
  textColor = "text-black",
  className = ""
}) => {
  const { backgroundColorss } = useContext(ResumeContext);
  const finalTextColor = backgroundColorss ? textColor : "text-black";

  const getIcon = (iconName) => {
    const IconComponent = ICON_COMPONENTS[iconName.toLowerCase()];
    if (!IconComponent) return null;
    
    return (
      <div>
        <IconComponent className="w-5 h-5" />
      </div>
    );
  };

  const renderContactItem = (icon, data, truncate = false) => {
    if (!data) return null;

    const displayData = truncate && data.length > addressCharacterLimit
      ? `${data.slice(0, addressCharacterLimit)}...`
      : data;

    return (
      <div className={`flex items-center px-2 ${contactClass}`}>
        <span className={finalTextColor}>{getIcon(icon)}</span>
        &nbsp;
        <span className={finalTextColor}>{displayData}</span>
      </div>
    );
  };

  const renderSocialMediaLinks = () => {
    if (!Array.isArray(socialMediaData) || socialMediaData.length === 0) {
      return <p className={`text-gray-600 dark:text-gray-300 ${finalTextColor}`}>&nbsp;</p>;
    }

    return socialMediaData.map((socialMedia, index) => (
      <a
        href={`http://${socialMedia.link}`}
        aria-label={socialMedia.socialMedia}
        key={index}
        title={socialMedia.socialMedia}
        target="_blank"
        rel="noreferrer"
        className={`flex items-center px-2 ${socialMediaClass}`}
      >
        <span className={finalTextColor}>
          {getIcon(socialMedia.socialMedia.toLowerCase())}
        </span>
        &nbsp;
        <span className={`truncate ${finalTextColor}`}>
          {socialMedia.socialMedia}
        </span>
      </a>
    ));
  };

  return (
    <div
      className={`flex ${
        layout === "row"
          ? "flex-row items-center flex-wrap gap-2"
          : "flex-col gap-2"
      } ${className}`}
    >
      {title && (
        <h3 
          className={`text-xl font-bold mb-2 border-b-2 ${
            finalTextColor === "text-black" ? "border-black" : "border-white"
          } ${finalTextColor}`}
        >
          {title}&nbsp;
        </h3>
      )}

      {contactData && (
        <>
          {renderContactItem("phone", contactData.teldata)}
          {renderContactItem("email", contactData.emaildata)}
          {renderContactItem("location", contactData.addressdata, true)}
        </>
      )}

      {renderSocialMediaLinks()}
    </div>
  );
};

export default ContactAndSocialMedia;