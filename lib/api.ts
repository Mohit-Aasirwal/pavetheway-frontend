import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("token");

// Login function
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, {
      username,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Fetch resume data
export const fetchResumeData = async () => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  try {
    const response = await axios.get(`${API_BASE_URL}/resume/`, {
      headers: { Authorization: `Token ${token}` },
    });
    // Map work_experience to experience for frontend
    const data = response.data;
    if (data.work_experience) {
      data.experience = data.work_experience;
      delete data.work_experience;
    }
    return data;
  } catch (error) {
    console.error("Error fetching resume:", error);
    throw error;
  }
};

// Save resume data
export const saveResumeData = async (resume: any) => { /* eslint-disable-line @typescript-eslint/no-explicit-any */
  const token = getToken();
  if (!token) throw new Error("No token found");
  try {
    // Map experience to work_experience for backend
    const data = { ...resume };
    if (data.experience) {
      data.work_experience = data.experience;
      delete data.experience;
    }
    await axios.patch(`${API_BASE_URL}/resume/`, data, {
      headers: { Authorization: `Token ${token}` },
    });
  } catch (error) {
    console.error("Error saving resume:", error);
    throw error;
  }
};

// Export PDF
export const exportResumePDF = async () => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  try {
    const response = await axios.get(`${API_BASE_URL}/resume/export-pdf/`, {
      headers: { Authorization: `Token ${token}` },
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting PDF:", error);
    throw error;
  }
};
