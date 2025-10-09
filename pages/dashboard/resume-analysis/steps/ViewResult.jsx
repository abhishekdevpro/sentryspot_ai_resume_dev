import { useState } from "react";
import { useRouter } from "next/navigation";

// import ScaningLoader from "../../ui/ScaningLoader";
import axios from "axios";
import ScaningLoader from "../../../../components/ui/ScaningLoader";

export default function ViewResults({ onBack, formData, scanId }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const router = useRouter();

  // const handleSubmit = async () => {
  //   setLoading(true);

  //   try {
  //     // common payload
  //     const payload = new FormData();
  //     payload.append("job_title", formData.job_title || "");
  //     payload.append("experience", formData.experience?.toString() || "");
  //     payload.append("job_description", formData.job_description);
  //     payload.append("location", formData.location);

  //     if (formData.resume_upload && scanId) {
  //       payload.append("files", formData.resume_upload);
  //     } else {
  //       payload.append("resume_upload", formData.resume_upload);
  //     }

  //     let response;

  //     if (scanId) {
  //       // ✅ Update API (PUT)
  //       response = await axios.post(
  //         `https://api.sentryspot.co.uk/api/jobseeker/resume-upload/${scanId}`,
  //         payload,
  //         {
  //           headers: {
  //             Authorization: localStorage.getItem("token"),
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       console.log("Update API response:", response.data.data[0].id);
  //       if (response.data.code === 200 || response.data.status === "success") {
  //         router.push(`/match-report/${response.data.data[0].id}`);
  //       }
  //     } else {
  //       // ✅ Guest API (POST)
  //       response = await axios.post(
  //         "https://api.sentryspot.co.uk/api/jobseeker/guest-user",
  //         payload,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       if (response.data.code === 200 || response.data.status === "success") {
  //         setResult(response.data.data);
  //         localStorage.setItem("guestId", response.data.data);
  //         router.push("/login2"); // only for guest
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async () => {
    setLoading(true);

    try {
      // common payload
      const payload = new FormData();
      payload.append("job_title", formData.job_title || "");
      payload.append("experience", formData.experience?.toString() || "");
      payload.append("job_description", formData.job_description);
      payload.append("location", formData.location);

      if (formData.resume_upload && scanId) {
        payload.append("files", formData.resume_upload);
      } else {
        payload.append("resume_upload", formData.resume_upload);
      }

      let response;

      if (scanId) {
        // ✅ Update API (POST instead of PUT in your code)
        response = await axios.post(
          `https://api.sentryspot.co.uk/api/jobseeker/resume-upload/${scanId}`,
          payload,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Update API response:", response.data.data[0].id);

        if (response.data.code === 200 || response.data.status === "success") {
          router.push(`/match-report/${response.data.data[0].id}`);
        }
      } else {
        // ✅ Guest API (POST)
        response = await axios.post(
          `https://api.sentryspot.co.uk/api/jobseeker/guest-user`,
          payload,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.code === 200 || response.data.status === "success") {
          setResult(response.data.data);
          localStorage.setItem("guestId", response.data.data);
          router.push("/login2"); // only for guest
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="text-center">
      {/* ✅ Loader overlay */}
      {loading && <ScaningLoader isLoading={loading} />}

      <h2 className="text-lg font-semibold mb-4">Your Resume Match Results</h2>
      <p className="text-gray-600 mb-6">
        Click below to analyze your resume and job description.
      </p>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Analyzing..." : "Scan"}
        </button>
      </div>
    </div>
  );
}
