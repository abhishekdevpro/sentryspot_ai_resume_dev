"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// Import all templates
import template1 from "../preview/template/template1.png";
import template3 from "../preview/template/template3.png";
import template4 from "../preview/template/template4.png";
import template5 from "../preview/template/template5.png";
import template6 from "../preview/template/template6.png";
import template7 from "../preview/template/template7.png";
import { SaveLoader } from "../ResumeLoader/SaveLoader";
import { Button } from "../ui/Button";

const TemplateStep = ({ onNext, onBack, onChange, value }) => {
  const router = useRouter();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedHexCode, setSelectedHexCode] = useState("#2563EB");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const colors = [
    {
      name: "Gray",
      class: "bg-gray-200",
      selectedClass: "ring-gray-400",
      hexCode: "#6D7278",
    },
    {
      name: "Blue",
      class: "bg-blue-600",
      selectedClass: "ring-blue-400",
      hexCode: "#2563EB",
    },
    {
      name: "Purple",
      class: "bg-purple-600",
      selectedClass: "ring-purple-400",
      hexCode: "#9333EA",
    },
    {
      name: "Green",
      class: "bg-green-600",
      selectedClass: "ring-green-400",
      hexCode: "#16A34A",
    },
    {
      name: "Red",
      class: "bg-red-600",
      selectedClass: "ring-red-400",
      hexCode: "#DC2626",
    },
    {
      name: "Yellow",
      class: "bg-yellow-500",
      selectedClass: "ring-yellow-400",
      hexCode: "#EAB308",
    },
    {
      name: "Pink",
      class: "bg-pink-500",
      selectedClass: "ring-pink-400",
      hexCode: "#EC4899",
    },
    {
      name: "Teal",
      class: "bg-teal-500",
      selectedClass: "ring-teal-400",
      hexCode: "#14B8A6",
    },
    {
      name: "Orange",
      class: "bg-orange-500",
      selectedClass: "ring-orange-400",
      hexCode: "#F97316",
    },
    {
      name: "Indigo",
      class: "bg-indigo-600",
      selectedClass: "ring-indigo-400",
      hexCode: "#4F46E5",
    },
    // { name: 'Lime', class: 'bg-lime-500', selectedClass: 'ring-lime-400', hexCode: '#84CC16' },
    // { name: 'Cyan', class: 'bg-cyan-500', selectedClass: 'ring-cyan-400', hexCode: '#06B6D4' },
    // { name: 'Amber', class: 'bg-amber-500', selectedClass: 'ring-amber-400', hexCode: '#F59E0B' },
    // { name: 'Emerald', class: 'bg-emerald-500', selectedClass: 'ring-emerald-400', hexCode: '#10B981' },
    // { name: 'Rose', class: 'bg-rose-500', selectedClass: 'ring-rose-400', hexCode: '#F43F5E' }
  ];

  const templates = [
    {
      key: "template1",
      imageUrl: template1,
      name: "Modern Clean",
      hasPhoto: true,
    },
    {
      key: "template3",
      imageUrl: template3,
      name: "Creative",
      hasPhoto: false,
    },
    {
      key: "template4",
      imageUrl: template4,
      name: "Executive",
      hasPhoto: false,
    },
    { key: "template5", imageUrl: template5, name: "Minimal", hasPhoto: true },
    { key: "template6", imageUrl: template6, name: "Classic", hasPhoto: false },
    {
      key: "template7",
      imageUrl: template7,
      name: "Contemporary",
      hasPhoto: false,
    },
    {
      key: "template8",
      imageUrl: template1,
      name: "Modern Clean",
      hasPhoto: false,
    },
    {
      key: "template9",
      imageUrl: template3,
      name: "Creative",
      hasPhoto: false,
    },
    {
      key: "template10",
      imageUrl: template4,
      name: "Executive",
      hasPhoto: false,
    },
    { key: "template11", imageUrl: template5, name: "Minimal", hasPhoto: true },
    { key: "template12", imageUrl: template6, name: "Classic", hasPhoto: true },
    {
      key: "template13",
      imageUrl: template7,
      name: "Contemporary",
      hasPhoto: false,
    },
    {
      key: "template14",
      imageUrl: template7,
      name: "Contemporary",
      hasPhoto: true,
    },
    {
      key: "template15",
      imageUrl: template1,
      name: "Modern Clean",
      hasPhoto: false,
    },
    {
      key: "template16",
      imageUrl: template3,
      name: "Creative",
      hasPhoto: true,
    },
    {
      key: "template17",
      imageUrl: template4,
      name: "Executive",
      hasPhoto: true,
    },
    { key: "template18", imageUrl: template5, name: "Minimal", hasPhoto: true },
    {
      key: "template19",
      imageUrl: template6,
      name: "Classic",
      hasPhoto: false,
    },
    {
      key: "template20",
      imageUrl: template7,
      name: "Contemporary",
      hasPhoto: false,
    },
  ];

  // Filter templates based on photo preference
  const filteredTemplates = templates.filter((template) => {
    if (value.hasPhoto === undefined) return true; // Show all templates if no filter selected
    return template.hasPhoto === value.hasPhoto;
  });

  // Set default color hex code if none selected
  useEffect(() => {
    if (!value.hexCode) {
      const defaultColor = colors.find((c) => c.name === "Blue");
      handleColorChange(defaultColor.hexCode, defaultColor.name);
    }
  }, []);

  // Handle color selection with hex code
  const handleColorChange = (hexCode, colorName) => {
    setSelectedHexCode(hexCode);
    onChange({
      ...value,
      color: colorName,
      hexCode: hexCode,
    });
  };

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const resumeId = router.query.id || localStorage.getItem("resumeId");
        if (!resumeId || !token) {
          toast.error("Resume ID or token not found");
          return;
        }

        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/resume-list/${resumeId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.code == 200 || response.data.status == "success") {
          const parsedAIData = response.data.data.ai_resume_parse_data;
          setResumeData(parsedAIData.templateData);

          if (parsedAIData.templateData.templateDetails) {
            const backgroundColor =
              parsedAIData.templateData.templateDetails.backgroundColor;
            const colorObj =
              colors.find((c) => c.hexCode === backgroundColor) ||
              colors.find((c) => c.name === "Blue");
            handleColorChange(colorObj.hexCode, colorObj.name);
          }

          // Set initial photo preference based on selected template
          if (parsedAIData.templateData.templateDetails?.templateId) {
            const selectedTemplate = templates.find(
              (t) =>
                t.key === parsedAIData.templateData.templateDetails.templateId
            );
            if (selectedTemplate) {
              onChange({ ...value, hasPhoto: selectedTemplate.hasPhoto });
            }
          }
        } else {
          toast.error(response.data.message || "Failed to fetch resume data");
        }
      } catch (error) {
        toast.error(error?.message || "Error fetching resume data");
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [router.query.id, token]);

  const handlePhotoPreferenceChange = (hasPhoto) => {
    // If current template doesn't match new photo preference, clear the selection
    const currentTemplate = templates.find((t) => t.key === value.template);
    if (currentTemplate && currentTemplate.hasPhoto !== hasPhoto) {
      onChange({ ...value, hasPhoto, template: undefined });
    } else {
      onChange({ ...value, hasPhoto });
    }
  };

  const formatResumeData = (data) => {
    return {
      name: data.name || "",
      position: data.position || "",
      contactInformation: data.contactInformation || "",
      email: data.email || "",
      address: data.address || "",
      profilePicture: value.hasPhoto ? data.profilePicture || "" : "", // Only include profile picture if hasPhoto is true
      socialMedia:
        data.socialMedia?.map((media) => ({
          socialMedia: media.socialMedia || "",
          link: media.link || "",
        })) || [],
      summary: data.summary || "",
      education:
        data.education?.map((edu) => ({
          school: edu.school || "",
          degree: edu.degree || "",
          startYear: edu.startYear || "",
          endYear: edu.endYear || "",
        })) || [],
      workExperience:
        data.workExperience?.map((exp) => ({
          company: exp.company || "",
          position: exp.position || "",
          description: exp.description || "",
          KeyAchievements: Array.isArray(exp.keyAchievements)
            ? exp.keyAchievements
            : [exp.keyAchievements || ""],
          startYear: exp.startYear || "",
          endYear: exp.endYear || "",
        })) || [],
      projects:
        data.projects?.map((project) => ({
          title: project.title || "",
          link: project.link || "",
          description: project.description || "",
          keyAchievements: Array.isArray(project.keyAchievements)
            ? project.keyAchievements
            : [project.keyAchievements || ""],
          startYear: project.startYear || "",
          endYear: project.endYear || "",
          name: project.name || "",
        })) || [],
      skills: Array.isArray(data.skills)
        ? data.skills.map((skill) => ({
            title: skill.title || "",
            skills: skill.skills || [],
          }))
        : [],
      languages: data.languages || [],
      certifications: data.certifications || [],
      templateDetails: {
        templateId: value.template,
        backgroundColor: selectedHexCode || "#2563EB",
        font: "Ubuntu",
      },
    };
  };

  const handleSaveTemplate = async () => {
    if (!resumeData) return;

    if (!value.template) {
      toast.error("Please select a template before proceeding");
      return;
    }

    const templateData = {
      templateData: formatResumeData(resumeData),
    };
    setIsLoading(true);
    try {
      const resumeId = router.query.id || localStorage.getItem("resumeId");
      if (!resumeId) {
        toast.error("Resume ID not found");
        return;
      }

      const response = await axios.put(
        `https://api.sentryspot.co.uk/api/jobseeker/resume-update/${resumeId}`,
        templateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        setIsSaved(true);
        localStorage.setItem("isSaved", "true");
        toast.success(response.data.message || "Resume saved Successfully");
        onNext();
      } else {
        toast.error(response.data.error || "Error while saving the Resume");
      }
    } catch (error) {
      toast.error(error?.message || "Error updating resume!");
      console.error("Error updating resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  const getHoverStyle = (templateKey) => {
    if (value.template === templateKey) {
      return {
        borderWidth: "4px",
        borderColor: selectedHexCode,
        boxShadow: `0 0 0 4px ${selectedHexCode}33`,
      };
    }
    return {
      borderWidth: "0px",
      borderColor: "transparent",
      boxShadow: "none",
      ":hover": {
        boxShadow: `0 0 0 2px ${selectedHexCode}33`,
      },
    };
  };

  return (
    <div className="min-h-screen py-12">
      <div className=" mx-auto px-2">
        <div className="text-center mb-12">
          <h2 className="text-h1 text-brand">Choose Your Perfect Template</h2>
          <p className="text-p text-brand-light">
            Select a design that best represents your professional style
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="app-card-bg rounded-xl shadow-lg p-4 h-fit sticky top-8">
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Color Theme
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {colors.map((color) => (
                  <div
                    key={color.name}
                    className="flex items-center justify-center"
                  >
                    <button
                      className={`
                        w-8 h-8 rounded-full ${color.class}
                        transform hover:scale-110 transition-all duration-200
                        ${
                          selectedHexCode === color.hexCode
                            ? `ring-2 ring-offset-2 ${color.selectedClass} outline-none focus:outline-none`
                            : "hover:ring-2 hover:ring-offset-2 hover:ring-gray-300"
                        }
                      `}
                      onClick={() =>
                        handleColorChange(color.hexCode, color.name)
                      }
                      title={color.name}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Photo Style
              </h3>
              <div className="space-y-4">
                {["With Photo", "Without Photo"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="photo"
                      checked={value.hasPhoto === (option === "With Photo")}
                      onChange={() =>
                        handlePhotoPreferenceChange(option === "With Photo")
                      }
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700 font-medium">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <button
                  key={template.key}
                  onClick={() => onChange({ ...value, template: template.key })}
                  className="group relative  rounded-xl overflow-hidden transition-all duration-300"
                  style={getHoverStyle(template.key)}
                >
                  <div className="w-full">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={template.imageUrl}
                        alt={template.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                        priority={templates.indexOf(template) < 6}
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      {/* <p className="text-white font-medium text-lg">{template.key}</p> */}
                      {/* <p className="text-white/80 text-sm">
                        {template.hasPhoto ? 'Supports profile photo' : 'No profile photo'}
                      </p> */}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-12">
          <Button
            onClick={onBack}
            variant="secondary"
            // className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700
            //   font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            Back
          </Button>
          <Button
            onClick={handleSaveTemplate}
            disabled={loading}
            style={{ backgroundColor: selectedHexCode }}
    //         className={`px-8 py-3 text-white rounded-xl font-medium transition-all shadow-lg 
    // ${
    //   loading
    //     ? "opacity-70 cursor-not-allowed"
    //     : "hover:opacity-90 hover:shadow-xl"
    // }`}
          >
            {isLoading ? <SaveLoader loadingText="Saving" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateStep;
