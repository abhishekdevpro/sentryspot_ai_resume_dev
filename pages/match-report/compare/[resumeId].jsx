import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import axios from "axios";
import PDFViewer from "../../../components/ResumeComparison/PDFViewer";
import VersionCard from "../../../components/ResumeComparison/VersionCard";
import AnalysisSection from "../../../components/ResumeComparison/AnaLysisSection";
import TipsList from "../../../components/ResumeComparison/TipList";
import ResumeComparisonModal from "../../../components/ResumeComparison/ResumeComparisonModal";
import { Button } from "../../../components/ui/Button";
import { ArrowLeft, ArrowLeftIcon, Eye } from "lucide-react";
import Navbar from "../../Navbar/Navbar";

// Import reusable components
// import CircularGauge from "./components/CircularGauge";
// import PDFViewer from "./components/PDFViewer";
// import VersionCard from "./components/VersionCard";
// import AnalysisSection from "./components/AnalysisSection";
// import TipsList from "./components/TipsList";

const ResumeComparison = () => {
  const router = useRouter();
  const { resumeId } = router.query;
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPreviousPdf, setShowPreviousPdf] = useState(false);
  const [showCurrentPdf, setShowCurrentPdf] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [currentVerionImage, setCurrentVersionImage] = useState(null);
  const [prevVerionImage, setPrevVersionImage] = useState(null);
  const [isDownloadingPrevious, setIsDownloadingPrevious] = useState(false);
  const BASE_URL = "https://api.sentryspot.co.uk";
  useEffect(() => {
    if (!resumeId) return;

    const fetchResumeData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login2");
          return;
        }

        console.log("Fetching resume data for ID:", resumeId);
        console.log("Using token:", token.substring(0, 20) + "...");

        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/resume-list/${resumeId}?lang=en`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log("Response status:", response.status);
        console.log("Response data:", response.data);

        if (!response.data || !response.data.data) {
          throw new Error("Invalid response format from API");
        }

        setResumeData(response.data.data);
        setCurrentVersionImage(response.data.data?.resume_image_path);
        setPrevVersionImage(response.data.data?.resume_image_path_prev);

        // Debug logging
        console.log("Current resume data:", response.data.data);
        console.log(
          "Current analysis details:",
          response.data.data?.resume_analysis_details
        );
        console.log(
          "Previous analysis details:",
          response.data.data?.resume_analysis_details_prev
        );
        console.log(
          "Strength details:",
          response.data.data?.resume_strenght_details
        );

        // Debug current version percentage sources
        // console.log("Current version percentage sources:", {
        //   "resume_analysis_details.match_score.percentage":
        //     response.data.data?.resume_analysis_details?.match_score
        //       ?.percentage,
        //   "resume_strenght_details.resume_strenght":
        //     response.data.data?.resume_strenght_details?.resume_strenght,
        //   "Final calculated percentage":
        //     response.data.data?.resume_analysis_details?.match_score
        //       ?.percentage ||
        //     response.data.data?.resume_strenght_details?.resume_strenght ||
        //     0,
        // });
      } catch (err) {
        console.error("Error in fetchResumeData:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [resumeId, router]);

  // Calculate issue counts and progress for each section based on data
  const getSectionData = (sectionKey, analysisData) => {
    // Handle both current and previous data structures
    let searchabilityAnalysis,
      recruiterTipsAnalysis,
      skillsAnalysis,
      formattingAnalysis;

    if (analysisData?.resume_analysis_details) {
      // Current data structure
      searchabilityAnalysis =
        analysisData.resume_analysis_details?.searchability_analysis || {};
      recruiterTipsAnalysis =
        analysisData.resume_analysis_details?.recruiter_tips_analysis || {};
      skillsAnalysis =
        analysisData.resume_analysis_details?.skills_analysis || {};
      formattingAnalysis =
        analysisData?.resume_analysis_details?.formatting_analysis || {};
    } else {
      // Previous data structure (direct access)
      searchabilityAnalysis = analysisData?.searchability_analysis || {};
      recruiterTipsAnalysis = analysisData?.recruiter_tips_analysis || {};
      skillsAnalysis = analysisData?.skills_analysis || {};
      formattingAnalysis =
        analysisData?.resume_analysis_details?.formatting_analysis || {};
    }

    switch (sectionKey) {
      case "Searchability":
        const searchabilityPercentage = Number(
          searchabilityAnalysis.match_score?.percentage || 0
        );
        const searchabilityIssues = Number(
          searchabilityAnalysis.match_score?.total_issues || 0
        );
        return {
          issues: searchabilityIssues,
          progress: searchabilityPercentage,
        };

      case "Skills":
        const skillsPercentage = Number(
          skillsAnalysis.match_score?.percentage || 0
        );
        const skillsIssues = Number(
          skillsAnalysis.match_score?.total_issues || 0
        );
        return {
          issues: skillsIssues,
          progress: skillsPercentage,
        };

      case "Recruiter Tips":
        const recruiterTipsPercentage = Number(
          recruiterTipsAnalysis.match_score?.percentage || 0
        );
        const recruiterTipsIssues = Number(
          recruiterTipsAnalysis.match_score?.total_issues || 0
        );
        return {
          issues: recruiterTipsIssues,
          progress: recruiterTipsPercentage,
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

  // Function to download previous version PDF
  const downloadPreviousVersion = async () => {
    if (!resumeData?.file_path) {
      console.error("No file path found for previous version");
      return;
    }

    setIsDownloadingPrevious(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      // Get the file path from previous version
      const filePath = resumeData.file_path;

      // Create download link
      const downloadUrl = `${BASE_URL}${filePath}`;
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `resume-previous-version.pdf`);

      // Add authorization header if needed
      link.setAttribute("data-token", token);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("Previous version download initiated");
    } catch (error) {
      console.error("Error downloading previous version:", error);
    } finally {
      setIsDownloadingPrevious(false);
    }
  };

  // Common function to handle PDF viewing
  const handlePDFView = (type) => {
    if (type === "previous") {
      if (!resumeData?.file_path) {
        console.error("No file path found for previous version");
        return;
      }
      setShowPreviousPdf(true);
    } else if (type === "current") {
      // Add current PDF path logic here when available
      setShowCurrentPdf(true);
    }
  };

  const handleShowComparison = () => {
    setShowComparison(true);
  };

  // Create section analysis component
  const renderAnalysisSection = (analysisData, title) => {
    const analysis = analysisData?.resume_analysis_details || analysisData;

    return (
      <div className="space-y-6">
        {/* Searchability */}
        <AnalysisSection
          title="Searchability"
          badgeText="IMPORTANT"
          badgeColor="bg-blue-100 text-blue-700"
          description="An ATS (Applicant Tracking System) is a software used by 90% of companies and recruiters to search for resumes and manage the hiring process."
        >
          <div className="rounded-lg border overflow-hidden">
            <TipsList
              title="ATS Tips"
              tips={analysis?.searchability_analysis?.ats_tips?.tips}
              type="warning"
            />
            <TipsList
              title="Contact Information"
              tips={analysis?.searchability_analysis?.contact_information?.tips}
              tipsStatus={
                analysis?.searchability_analysis?.contact_information
                  ?.tips_status
              }
            />
            <TipsList
              title="Summary"
              tips={analysis?.searchability_analysis?.summary?.tips}
              tipsStatus={
                analysis?.searchability_analysis?.summary?.tips_status
              }
            />
          </div>
        </AnalysisSection>

        {/* Skills */}
        <AnalysisSection
          title="Skills"
          badgeText="MEDIUM SCORE IMPACT"
          badgeColor="bg-gray-100 text-gray-700"
          description="Skills are your traits and abilities that are not unique to any job."
        >
          <div className="rounded-lg border overflow-hidden">
            <TipsList
              title="Skills Match"
              tips={analysis?.skills_analysis?.skills_match?.tips}
              tipsStatus={analysis?.skills_analysis?.skills_match?.tips_status}
            />
          </div>
        </AnalysisSection>

        {/* Recruiter Tips */}
        <AnalysisSection
          title="Recruiter Tips"
          badgeText="IMPORTANT"
          badgeColor="bg-blue-100 text-blue-700"
          description="Tips to make your resume more appealing to recruiters."
        >
          <div className="rounded-lg border overflow-hidden">
            <TipsList
              title="Job Level Match"
              tips={analysis?.recruiter_tips_analysis?.job_level_match?.tips}
              tipsStatus={
                analysis?.recruiter_tips_analysis?.job_level_match?.tips_status
              }
            />
            <TipsList
              title="Measurable Results"
              tips={analysis?.recruiter_tips_analysis?.measurable_results?.tips}
              tipsStatus={
                analysis?.recruiter_tips_analysis?.measurable_results
                  ?.tips_status
              }
            />
          </div>
        </AnalysisSection>

        {/* Formatting */}
        <AnalysisSection
          title="Formatting"
          badgeText="IMPORTANT"
          badgeColor="bg-blue-100 text-blue-700"
        >
          <TipsList
            title="Layout"
            tips={analysis.formatting_analysis.layout?.tips}
            tipsStatus={analysis.formatting_analysis.layout?.tips_status}
          />
          <TipsList
            title="Font Check"
            tips={analysis.formatting_analysis.font_check?.tips}
            tipsStatus={analysis.formatting_analysis.font_check?.tips_status}
          />
          <TipsList
            title="Page Setup"
            tips={analysis.formatting_analysis.page_setup?.tips}
            tipsStatus={analysis.formatting_analysis.page_setup?.tips_status}
          />
        </AnalysisSection>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading comparison data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="text-sm text-gray-500 mb-4">
            Please check the browser console for more details.
          </div>
          <button
            onClick={() => router.back()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 text-xl mb-4">No data found</div>
          <button
            onClick={() => router.back()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const previousAnalysis = resumeData.resume_analysis_details_prev || {};
  const sections = [
    { key: "Searchability", label: "Searchability" },
    { key: "Skills", label: "Skills" },
    { key: "Recruiter Tips", label: "Recruiter Tips" },
    { key: "Formatting", label: "Formatting" },
  ];

  const previousOverall = Number(previousAnalysis.match_score?.percentage ?? 0);
  const currentOverall = Number(
    resumeData?.resume_analysis_details?.match_score.percentage
  );

  // Get section data for both versions
  const previousSections = sections.map((sec) => ({
    ...sec,
    ...getSectionData(sec.key, previousAnalysis),
  }));

  const currentSections = sections.map((sec) => ({
    ...sec,
    ...getSectionData(sec.key, resumeData),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-col md:flex-row ">
            <div className=" flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Resume Comparison
              </h1>
              <p className="text-gray-600">
                Compare current vs previous resume strength analysis
              </p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Button
                onClick={() => handleShowComparison()}
                className="bg-blue-800 text-white px-4 py-1 rounded-full transition duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <Eye size={20} />
                View Comparison
              </Button>

              <Button
                onClick={() => router.back()}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded-full transition duration-300 hover:scale-[1.02] hover:shadow-lg "
              >
                <ArrowLeftIcon size={20} />
                Back to Resume Strength
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        {/* Previous Version */}
        <VersionCard
          title="Previous Version"
          version="previous"
          matchRate={previousOverall}
          sections={previousSections}
          onDownload={downloadPreviousVersion}
          onView={() => handleShowComparison()}
          isDownloading={isDownloadingPrevious}
          canDownload={false}
          canView={!!resumeData?.file_path}
        >
          {renderAnalysisSection(previousAnalysis, "Previous")}
        </VersionCard>

        {/* Current Version */}
        <VersionCard
          title="Current Version"
          version="current"
          matchRate={currentOverall}
          sections={currentSections}
          onView={() => handlePDFView("current")}
          canDownload={false} // Set to true when current PDF download is available
          canView={false} // Set to true when current PDF viewing is available
        >
          {renderAnalysisSection(resumeData, "Current")}
        </VersionCard>
      </div>

      {/* PDF Viewers */}
      <PDFViewer
        isOpen={showPreviousPdf}
        onClose={() => setShowPreviousPdf(false)}
        filePath={resumeData?.file_path}
        title="Previous Version PDF"
      />

      <PDFViewer
        isOpen={showCurrentPdf}
        onClose={() => setShowCurrentPdf(false)}
        filePath={resumeData?.current_file_path} // Add current PDF path when available
        title="Current Version PDF"
      />

      {showComparison && (
        <ResumeComparisonModal
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
          beforeData={{
            imageUrl: prevVerionImage,
            score: previousOverall,
          }}
          afterData={{
            imageUrl: currentVerionImage,
            score: currentOverall,
          }}
        />
      )}
    </div>
  );
};

export default ResumeComparison;
