"use client";
import { useRouter } from "next/router";
import React from "react";
import CircularGauge from "../../components/ResumeComparison/CircularGauge";
import ProgressBar from "../../components/ResumeComparison/ProgressBar";
import { Button } from "../../components/ui/Button";

export default function SidebarStrength({ resumeId, strengths }) {
  const router = useRouter();

  // Calculate issue counts and progress for each section
  const getSectionData = (sectionKey) => {
    const strengthDetails = strengths?.resume_strenght_details || {};
    const searchabilityAnalysis =
      strengths?.resume_analysis_details?.searchability_analysis || {};
    const recruiterTipsAnalysis =
      strengths?.resume_analysis_details?.recruiter_tips_analysis || {};
    const formattingAnalysis =
      strengths?.resume_analysis_details?.formatting_analysis || {};
    const skillsAnalysis =
      strengths?.resume_analysis_details?.skills_analysis || {};

    switch (sectionKey) {
      case "Searchability":
        return {
          issues: Number(searchabilityAnalysis.match_score?.total_issues || 0),
          progress: Number(searchabilityAnalysis.match_score?.percentage || 0),
        };

      case "Skills":
        return {
          issues: Number(skillsAnalysis.match_score?.total_issues || 0),
          progress: Number(skillsAnalysis.match_score?.percentage || 0),
        };

      case "Recruiter Tips":
        return {
          issues: Number(recruiterTipsAnalysis.match_score?.total_issues || 0),
          progress: Number(recruiterTipsAnalysis.match_score?.percentage || 0),
        };

      case "Formatting":
        return {
          issues: Number(formattingAnalysis.match_score?.total_issues || 0),
          progress: Number(formattingAnalysis.match_score?.percentage || 0),
        };

      default:
        return { issues: 0, progress: 0 };
    }
  };
  const sections = [
    { key: "Searchability", label: "Searchability" },
    { key: "Skills", label: "Skills" },
    { key: "Recruiter Tips", label: "Recruiter Tips" },
    { key: "Formatting", label: "Formatting" },
  ];

  const overall = Number(
    strengths?.resume_analysis_details?.match_score?.percentage ??
    strengths?.resume_strenght_details?.resume_strenght ??
    0
  );
  console.log("Button", Button)
  return (
    <aside className="w-full bg-white shadow-lg rounded-2xl p-4 space-y-6">
      {/* Match Rate Circular Gauge */}
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Match Rate</h2>
        <div className="flex justify-center">
          <CircularGauge
            percent={overall}
            size={120}
            stroke={10}
            version="prev"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2">
        <Button
          onClick={() =>
            router.push(`/dashboard/aibuilder/${resumeId}?improve=true`)
          }
          className=" w-full"
        >
          Improve with AI
        </Button>
        <Button
          variant="success"
          disabled={true}
          className=" w-full "
        >
          Match with Job Description
        </Button>
      </div>

      {/* Progress bars with issue counts */}
      <div className="space-y-4">
        {sections.map((sec) => {
          const { issues, progress } = getSectionData(sec.key);
          return (
            <ProgressBar
              key={sec.key}
              label={sec.label}
              issues={issues}
              progress={progress}
            />
          );
        })}
      </div>
    </aside>
  );
}
