
import { useEffect, useState } from "react";
import CoverLetterSection from "../../components/dashboard/CoverLetterSection";
import InterviewSection from "../../components/dashboard/InterviewSection";
import ResumeStrength from "../../components/dashboard/ResumeStrength";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import MyResume from "./MyResume";
import MyJobs from "./MyJobs";
import FullScreenLoader from "../../components/ResumeLoader/Loader";
import AbroadiumCommunity from "../../components/dashboard/AbroadiumCommunity";
import { Download, Edit, Trash, Plus, User } from "lucide-react";
export default function DashboardPage() {
  const [strength, setStrength] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const resumeStrength = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/resume-list/0?resume_default=true`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data?.code === 200 || response.data?.status === "success") {
        setStrength(response.data.data?.resume_strenght_details || null);
        setResumeId(response.data.data?.resume_id || null);
      } else {
        setStrength(null);
        setResumeId(null);
      }
    } catch (err) {
      setError(err.message);
      setStrength(null);
      setResumeId(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resumeStrength();
   
    // const interval = setInterval(resumeStrength, 300000);

    // // Cleanup interval on component unmount
    // return () => clearInterval(interval);
  }, []);
  // useEffect(() => {
  //   // Delay the first execution by 3 seconds
  //   const timeout = setTimeout(() => {
  //     resumeStrength();
  
  //     // Set an interval to call resumeStrength every 5 minutes (300000 ms)
  //     const interval = setInterval(resumeStrength, 300000);
  
  //     // Cleanup both timeout and interval on component unmount
  //     return () => clearInterval(interval);
  //   }, 3000);
  
  //   return () => clearTimeout(timeout);
  // }, []);
  

  // Show the loader while loading
  if (loading) {
    return <FullScreenLoader />;
  }

  // Show error message if there's an error
  // if (error) {
  //   return (
  //     <div className="bg-red-50 p-6 rounded-lg mb-6">
  //       <p className="text-red-600">Error loading resume strength: {error}</p>
  //     </div>
  //   );
  // }

  const handleCreateCoverLetter = () => {
    setTimeout(() => {
      router.push("/dashboard/cv-builder");
    }, 2000);
  };
  const handleCreateResume = () => {
    setTimeout(() => {
      router.push("/dashboard/resume-builder");
    }, 2000);
  };
  const handleMyDashboard = () => {
    setTimeout(() => {
      router.push("https://sentryspot.co.uk/candidates-dashboard/dashboard");
    }, 2000);
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col max-w-7xl mx-auto md:flex-row min-h-screen bg-white p-4">
        {/* Sidebar */}
        <Sidebar
          score={strength?.resume_strenght || 0}
          resumeId={resumeId || null}
        />

        {/* Main Content */}
        <main className="flex-1 p-2 md:p-6 overflow-y-auto">
          <div className="flex flex-col gap-2 w-full md:flex-row  justify-between items-center mb-8">
            <button
              onClick={handleCreateResume}
              className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" /> Create New Resume
            </button>
            <button
              onClick={handleCreateCoverLetter}
              className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800  transition-colors duration-200 font-medium shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" /> Create New Cover Letters
            </button>
            <button
              onClick={handleMyDashboard}
              className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800  transition-colors duration-200 font-medium shadow-sm "
             
            > 
            <User className="w-5 h-5 mr-2"/>
              My Profile Dashboard
            </button>
          </div>
          <h1 className="text-2xl font-bold mb-6">
            Your Recommended Next Steps
          </h1>
          <ResumeStrength
            score={strength?.resume_strenght || 0}
            strength={strength || {}}
            resumeId={resumeId || null}
          />
          {/* <InterviewSection /> */}
          <AbroadiumCommunity />
          <CoverLetterSection />
        </main>
      </div>
      <MyResume />
      <MyJobs />
    </>
  );
}
