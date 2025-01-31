// import { useEffect, useState } from "react";
// import CoverLetterSection from "../../components/dashboard/CoverLetterSection";
// import InterviewSection from "../../components/dashboard/InterviewSection";
// import ResumeStrength from "../../components/dashboard/ResumeStrength";
// import Sidebar from "../../components/dashboard/Sidebar";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";
// import MyResume from "./MyResume";
// import MyJobs from "./MyJobs";
// import FullScreenLoader from "../../components/ResumeLoader/Loader";

// export default function DashboardPage() {
//   const [strength, setStrength] = useState(null);
//   const [resumeId, setResumeId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const resumeStrength = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `https://api.sentryspot.co.uk/api/jobseeker/resume-list/0?resume_default=true`,
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       if (response.data.code === 200 || response.data.status === "success") {
//         setStrength(response.data.data.resume_strenght_details);
//         setResumeId(response.data.data.resume_id);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     resumeStrength();
//     // Set up an interval to refresh data every 5 minutes
//     const interval = setInterval(resumeStrength, 300000);

//     // Cleanup interval on component unmount
//     return () => clearInterval(interval);
//   }, []); // Empty dependency array means this effect runs once on mount

//   // Show the loader while loading
//   if (loading) {
//     return <FullScreenLoader />;
//   }

//   // Show error message if there's an error
//   if (error) {
//     return (
//       <div className="bg-red-50 p-6 rounded-lg mb-6">
//         <p className="text-red-600">Error loading resume strength: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col max-w-7xl mx-auto md:flex-row min-h-screen bg-white p-4">
//         {/* Sidebar */}
//         <Sidebar score={strength.resume_strenght} resumeId={resumeId} />

//         {/* Main Content */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           <h1 className="text-2xl font-bold mb-6">Your Recommended Next Steps</h1>
//           <ResumeStrength score={strength.resume_strenght} strength={strength} resumeId={resumeId} />
//           <InterviewSection />
//           <CoverLetterSection />
//         </main>
//       </div>
//       <MyResume />
//       <MyJobs />
//     </>
//   );
// }

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
import { Download, Edit, Trash, Plus } from "lucide-react";
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
    // Set up an interval to refresh data every 5 minutes
    const interval = setInterval(resumeStrength, 300000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

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
      router.push("/dashboard");
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
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={handleCreateResume}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" /> Create New Resume
            </button>
            <button
              onClick={handleCreateCoverLetter}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600  transition-colors duration-200 font-medium shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" /> Create New Cover Letters
            </button>
            <button
              onClick={handleMyDashboard}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600  transition-colors duration-200 font-medium shadow-sm"
              disabled
            >
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
          {/* <AbroadiumCommunity /> */}
          <CoverLetterSection />
        </main>
      </div>
      <MyResume />
      <MyJobs />
    </>
  );
}
