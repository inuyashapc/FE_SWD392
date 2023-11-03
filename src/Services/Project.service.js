import axios from "axios";

const API_BASE = "http://localhost:8080/projects";
const getAllProject = async () => {
  try {
    const response = await axios.get(`${API_BASE}/getAll`);
    return response.data;
  } catch (error) {
    console.log(
      "🚀 ~ file: Project.service.js:5 ~ getAllProject ~ error:",
      error
    );
  }
};
export { getAllProject };
