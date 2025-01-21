// import React, { useContext,  forwardRef } from "react";

//   import { CoverLetterContext } from "../../components/context/CoverLetterContext";
//   import dynamic from "next/dynamic";

// import CoverLetter1 from "./CoverLetter1";

//   // Importing draggable components dynamically
//   const DragDropContext = dynamic(
//     () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
//     { ssr: false }
//   );

//   const CoverLetterPreview = forwardRef(({ selectedTemplate }, ref) => {
//     const { coverLetterData, setcoverLetterData, selectedFont } = useContext(CoverLetterContext);
//     console.log(coverLetterData, ">>>previewdashboard")

//     const templates = {
//       CoverLetter1: <CoverLetter1 />,

//     };

//     return (

//         <A4PageWrapper>
//           <div ref={ref} className="preview-dashboard" style={{ fontFamily: selectedFont }}>

//             <DragDropContext onDragEnd={onDragEnd}>
//               {templates[selectedTemplate]}
//             </DragDropContext>
//           </div>
//         </A4PageWrapper>

//     );
//   });

//   CoverLetterPreview.displayName = "CoverLetterPreview"

//   const A4PageWrapper = ({ children }) => {
//     const alertA4Size = () => {
//       const preview = document.querySelector(".preview");
//       if (preview) {
//         const previewHeight = preview.offsetHeight;
//         console.log(previewHeight);
//         if (previewHeight > 1122) {
//           alert("A4 size exceeded");
//         }
//       } else {
//         console.error("Element with class 'preview' not found.");
//       }
//     };

//     return (
//       <div className="a4-wrapper    "

//       onLoad={alertA4Size}>
//         {children}
//       </div>
//     );
//   };

//   export default CoverLetterPreview;

import React, { useContext, forwardRef } from "react";

import {
  CoverLetterContext,
  CoverLetterProvider,
} from "../../components/context/CoverLetterContext";
import dynamic from "next/dynamic";

import CoverLetter1 from "./CoverLetter1";

const CoverLetterPreview = () => {
  return (
    <>
      <CoverLetterProvider>
        <CoverLetter1 />
      </CoverLetterProvider>
    </>
  );
};

export default CoverLetterPreview;
