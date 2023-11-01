import axios from "axios";

const API_BASE = "http://localhost:8080/users";
const getAllTeacher = async () => {
  try {
    const result = await axios.get(`${API_BASE}/teacher`);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

export { getAllTeacher };
