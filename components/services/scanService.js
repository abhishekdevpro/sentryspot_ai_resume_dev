import axios from "axios";

const getAuthHeaders = () => ({
  Authorization: localStorage.getItem("token"),
});

export const getJobTitle = async () => {
  const res = await axios.get(
    `https://api.sentryspot.co.uk/api/jobseeker/job-title`
  );
  return res.data;
};

export const getLocations = async () => {
  const res = await axios.get(
    `https://api.sentryspot.co.uk/api/jobseeker/locations`
  );
  return res.data;
};

export const getScanHistory = async () => {
  const res = await axios.get(
    `https://api.sentryspot.co.uk/api/jobseeker/resume-list?is_resume_analysis=true`,
    {
      headers: getAuthHeaders(), // ✅ fixed
    }
  );

  return res?.data?.data || [];
};

export const handleDuplicateScan = async (resumeId) => {
  const res = await axios.post(
    `https://api.sentryspot.co.uk/api/jobseeker/resumes/${resumeId}/duplicate?is_resume_analysis=true`,
    {},
    {
      headers: getAuthHeaders(), // ✅ fixed
    }
  );

  return res;
};

export const resumeAnalysis = async (id, jobDescription) => {
  const res = await axios.post(
    `https://api.sentryspot.co.uk/api/jobseeker/resumes/${id}/scan`,
    {
      job_description: jobDescription,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return res; // return full response payload
};
