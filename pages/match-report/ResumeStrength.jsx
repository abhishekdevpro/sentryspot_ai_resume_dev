"use client";
import { Loader2, GitCompare } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AnalysisSection from "../../components/ResumeComparison/AnaLysisSection";
import TipsList from "../../components/ResumeComparison/TipList";
import { Button } from "../../components/ui/Button";
import FullPageLoader from "../../components/ResumeLoader/Loader";

const ResumeStrength = ({ strengths }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // console.log(strengths, "strengths in chkk");

  // Extract data
  const analysisDetails = strengths?.resume_analysis_details || {};
  const searchabilityAnalysis = analysisDetails.searchability_analysis || {};
  const skillsAnalysis = analysisDetails.skills_analysis || {};
  const recruiterTipsAnalysis = analysisDetails.recruiter_tips_analysis || {};
  const formattingAnalysis = analysisDetails.formatting_analysis || {};
  const hasPreviousData = strengths?.resume_analysis_details_prev;
  const isPrevDataEmpty = hasPreviousData?.match_score?.percentage === 0;

  // console.log(isPrevDataEmpty, "isPrevDataEmpty");
  // Helpers
  const getMessages = (tips) =>
    Array.isArray(tips) ? tips.filter(Boolean) : [];
  // console.log(hasPreviousData.match_score.percentage, "hasPreviousData");

  if (!strengths) {
    return <div>Loading resume analysis...</div>;
  }

  // console.log(hasPreviousData, "strengths in hasPreviousData");
  return (
    <>
      {isLoading && <FullPageLoader isLoading={isLoading} mode="comparing" />}
      <aside className="w-full space-y-6">
        {/* Compare Button */}
        {!isPrevDataEmpty && (
          <div className="flex justify-center mb-6">
            <Button
              disabled={isLoading}
              className="rounded-full"
              onClick={() => {
                const resumeId = strengths?.id || strengths?.resume_id;
                if (resumeId) {
                  setIsLoading(true);
                  setTimeout(() => {
                    router.push(`/match-report/compare/${resumeId}`);
                  }, 2000);
                }
              }}
            >
              {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <GitCompare className="w-5 h-5" />
                )
              }
              {isLoading ? "Comparing..." : "Compare with Previous Version"}
            </Button>
          </div>
        )}

        {/* Searchability */}
        <AnalysisSection
          title="Searchability"
          badgeText="IMPORTANT"
          badgeColor="bg-blue-100 text-blue-700"
          description="An ATS (Applicant Tracking System) is used by 90% of companies to parse resumes. Fix red issues so recruiters and ATS can easily read your resume."
        >
          <TipsList
            title="ATS Tips"
            tips={getMessages(searchabilityAnalysis.ats_tips?.tips)}
            tipsStatus={searchabilityAnalysis.ats_tips?.tips_status}
            type="warn"
          />
          <TipsList
            title="Contact Information"
            tips={getMessages(searchabilityAnalysis.contact_information?.tips)}
            tipsStatus={searchabilityAnalysis.contact_information?.tips_status}
          />
          <TipsList
            title="Summary"
            tips={getMessages(searchabilityAnalysis.summary?.tips)}
            tipsStatus={searchabilityAnalysis.summary?.tips_status}
          />
          <TipsList
            title="Section Headings"
            tips={searchabilityAnalysis.section_headings?.tips}
            tipsStatus={searchabilityAnalysis.section_headings?.tips_status}
          />

          <TipsList
            title="Job Title Match"
            tips={searchabilityAnalysis.job_title_match?.tips}
            tipsStatus={searchabilityAnalysis.job_title_match?.tips_status}
          />
          <TipsList
            title="Job Description Match"
            tips={getMessages(
              searchabilityAnalysis.job_description_match?.tips
            )}
            tipsStatus={
              searchabilityAnalysis.job_description_match?.tips_status
            }
          />
          <TipsList
            title="Date Formatting"
            tips={getMessages(searchabilityAnalysis.dates_formatting?.tips)}
            tipsStatus={searchabilityAnalysis.dates_formatting?.tips_status}
          />
          <TipsList
            title="Education Match"
            tips={getMessages(searchabilityAnalysis.education_match?.tips)}
            tipsStatus={searchabilityAnalysis.education_match?.tips_status}
          />
        </AnalysisSection>

        {/* Skills */}
        <AnalysisSection
          title="Skills"
          badgeText="MEDIUM IMPACT"
          badgeColor="bg-gray-100 text-gray-700"
          description="Skills help demonstrate your abilities. Focus on adding hard skills for ATS, and showcase soft skills in interviews."
        >
          <TipsList
            title="Skills Match"
            tips={getMessages(skillsAnalysis.skills_match?.tips)}
            tipsStatus={skillsAnalysis.skills_match?.tips_status}
            showInRow={true}
          />
          {console.log(
            skillsAnalysis.skills_match?.tips,
            skillsAnalysis.skills_match?.tips_status,
            "skillsAnalysis.skills_match?.tips"
          )}{" "}
        </AnalysisSection>

        {/* Recruiter Tips */}
        <AnalysisSection
          title="Recruiter Tips"
          badgeText="IMPORTANT"
          badgeColor="bg-blue-100 text-blue-700"
        >
          <TipsList
            title="Job Level Match"
            tips={getMessages(recruiterTipsAnalysis.job_level_match?.tips)}
            tipsStatus={recruiterTipsAnalysis.job_level_match?.tips_status}
          />
          <TipsList
            title="Measurable Results"
            tips={getMessages(recruiterTipsAnalysis.measurable_results?.tips)}
            tipsStatus={recruiterTipsAnalysis.measurable_results?.tips_status}
          />
          <TipsList
            title="Resume Tone"
            tips={getMessages(recruiterTipsAnalysis.resume_tone?.tips)}
            tipsStatus={recruiterTipsAnalysis.resume_tone?.tips_status}
          />
          <TipsList
            title="Web Presence"
            tips={getMessages(recruiterTipsAnalysis.web_presence?.tips)}
            tipsStatus={recruiterTipsAnalysis.web_presence?.tips_status}
          />
          <TipsList
            title="Word Count"
            tips={getMessages(recruiterTipsAnalysis.word_count?.tips)}
            tipsStatus={recruiterTipsAnalysis.word_count?.tips_status}
          />
        </AnalysisSection>

        {/* Formatting */}
        <AnalysisSection
          title="Formatting"
          badgeText="IMPORTANT"
          badgeColor="bg-blue-100 text-blue-700"
        >
          <TipsList
            title="Layout"
            tips={getMessages(formattingAnalysis.layout?.tips)}
            tipsStatus={formattingAnalysis.layout?.tips_status}
          />
          <TipsList
            title="Font Check"
            tips={getMessages(formattingAnalysis.font_check?.tips)}
            tipsStatus={formattingAnalysis.font_check?.tips_status}
          />
          <TipsList
            title="Page Setup"
            tips={getMessages(formattingAnalysis.page_setup?.tips)}
            tipsStatus={formattingAnalysis.page_setup?.tips_status}
          />
        </AnalysisSection>
      </aside>
    </>
  );
};

export default ResumeStrength;
