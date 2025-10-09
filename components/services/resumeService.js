import axios from "axios";
export const createResume = async (selectedLang = "en") => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `https://api.sentryspot.co.uk/api/jobseeker/resume-create?lang=${selectedLang}`,
      {},
      {
        headers: {
          Authorization: `${token}`, // 👈 no extra space before token
        },
      }
    );

    return response.data; // return the full response data
  } catch (error) {
    console.error("Error creating resume:", error);
    throw error;
  }
};

export const resumeScan = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `https://api.sentryspot.co.uk/api/jobseeker/resume-create`,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return response.data; // always return data layer
  } catch (error) {
    console.error("Error scanning resume:", error);
    throw error;
  }
};

export const CreateCV = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `https://api.sentryspot.co.uk/api/jobseeker/coverletter?lang=${selectedLang}`,
      {},
      {
        headers: {
          Authorization: ` ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Error creating resume:", err);
    throw error;
  }
};

const token = () => localStorage.getItem("token");

export const getResumes = async (lang) => {
  return axios.get(
    `https://api.sentryspot.co.uk/api/jobseeker/resume-list?lang=${lang}`,
    {
      headers: { Authorization: token() },
    }
  );
};

export const deleteResume = async (id, lang) => {
  return axios.delete(
    `https://api.sentryspot.co.uk/api/jobseeker/resume-list/${id}?lang=${lang}`,
    {
      headers: { Authorization: token() },
    }
  );
};

export const updateResumeTitle = async (id, newTitle) => {
  return axios.put(
    `https://api.sentryspot.co.uk/api/jobseeker/resume-details/${id}`,
    { resume_title: newTitle },
    { headers: { Authorization: token() } }
  );
};

export const duplicateResume = async (id) => {
  return axios.post(
    `https://api.sentryspot.co.uk/api/jobseeker/resumes/${id}/duplicate`,
    {},
    { headers: { Authorization: token() } }
  );
};
