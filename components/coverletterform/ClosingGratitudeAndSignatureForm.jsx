import React, { useContext } from "react";
import { CoverLetterContext } from "../context/CoverLetterContext";

const ClosingGratitudeAndSignatureForm = () => {
  const { coverLetterData, setCoverLetterData } = useContext(CoverLetterContext);

  const handleChange = (field, value) => {
    setCoverLetterData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Closing & Gratitude</h2>

      {/* Closing Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Closing</label>
        <textarea
          value={coverLetterData.closing}
          onChange={(e) => handleChange("closing", e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Write your closing statement here"
        ></textarea>
      </div>

      {/* Gratitude Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gratitude</label>
        <textarea
          value={coverLetterData.gratitude}
          onChange={(e) => handleChange("gratitude", e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Write your gratitude statement here"
        ></textarea>
      </div>

      {/* Signature Section */}
      <div>
        <label className="block text-gray-600 font-medium mb-2">Signature</label>
        <input
          type="text"
          value={coverLetterData.signature}
          onChange={(e) => handleChange("signature", e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your signature (e.g., Sincerely, John Doe)"
        />
      </div>

      <button
        onClick={() => console.log("Closing & Gratitude Updated:", coverLetterData)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ClosingGratitudeAndSignatureForm;
