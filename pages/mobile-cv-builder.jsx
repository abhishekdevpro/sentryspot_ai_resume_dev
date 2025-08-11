import React, { useState, useRef } from 'react';
import { ArrowLeft, Download, Save } from 'lucide-react';
import TemplateSelector from '../components/cv/coverletter/CvSelector';
import CoverLetterEditor from '../components/cv/coverletterform/CoverLetterEditor';
import Navbar from './Navbar/Navbar';
import ColorPickers from "./ColorPickers";
import CoverLetterPreview from '../components/cv/coverletter/CoverLetterPreview';
import { Button } from '../components/ui/Button';
import Select from '../components/ui/Select';

const MobileCoverLetterBuilder = ({
  selectedFont,
  handleFontChange,
  backgroundColorss,
  setBgColor,
  selectedTemplate,
  setSelectedTemplate,
  handleFinish,
  downloadAsPDF,
  templateRef
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const fonts = [
    { value: "Ubuntu", label: "Ubuntu" },
    { value: "Calibri", label: "Calibri" },
    { value: "Georgia", label: "Georgia" },
    { value: "Roboto", label: "Roboto" },
    { value: "Poppins", label: "Poppins" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Sticky Navbar */}
      {/* <div className="sticky top-0 z-50 bg-white shadow-md"> */}
        <Navbar />
      {/* </div> */}

      {!isPreviewMode ? (
        // Form Mode
        <div className="flex flex-col min-h-screen bg-brand">
          {/* Editor Section */}
          <div className="flex-grow p-4">
            <CoverLetterEditor />
          </div>

          {/* Next Button */}
          <div className="sticky bottom-0 w-full p-4 bg-white shadow-t">
            <Button
              onClick={togglePreviewMode}
              className="w-full bg-blue-950 text-white px-6 py-3 rounded-lg text-lg font-medium"
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        // Preview Mode
        <div className="flex flex-col min-h-screen bg-gray-50">
          {/* Sticky Options Bar */}
          <div className="sticky top-[64px] z-40 bg-gray-200 p-4 shadow-sm">
            <div className="flex flex-row flex-wrap justify-center items-center ">
              {/* Font Selector */}
             <Select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  options={fonts}
                  variant="outline"
                  size='sm'
                />

              {/* Color Picker */}
              <ColorPickers
                selectmultiplecolor={backgroundColorss}
                onChange={setBgColor}
              />

              {/* Template Selector */}
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
              />
            </div>
          </div>

          {/* Preview Content */}
          <div className=" ">
            <CoverLetterPreview
              selectedTemplate={selectedTemplate}
              ref={templateRef}
            />
          </div>

          {/* Fixed Bottom Actions */}
          {/* <div className="sticky bottom-0 w-full bg-white shadow-t p-4"> */}
            <div className="flex items-center justify-center gap-4 p-2 fixed bottom-0 left-0 right-0 bg-white shadow-lg">
              <Button
                onClick={togglePreviewMode}
                icon={ArrowLeft}
                size='sm'
                // className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg"
              >
                {/* <ArrowLeft size={20} /> */}
                {/* Back to Editor */}
              </Button>
              <Button
                onClick={handleFinish}
                size='sm'
                icon={Save}
                // className="w-full flex items-center justify-center gap-2 bg-blue-950 text-white px-6 py-3 rounded-lg"
              >
                {/* <Save size={20} /> */}
                {/* Save Cover Letter */}
              </Button>
              <Button
                onClick={downloadAsPDF}
                size='sm'
                icon={Download}
                // className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg"
              >
                {/* <Download size={20}/> */}
                {/* Download */}
              </Button>
            </div>
          </div>
        // </div>
      )}
    </div>
  );
};

export default MobileCoverLetterBuilder;