import axios from "axios";

const API_BASE = "http://localhost:8080/users";
const getAllTeacher = async () => {
  try {
    const result = await axios.get(`${API_BASE}/teachers`);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};
const getAllManagers = async () => {
  try {
    const result = await axios.get(`${API_BASE}/managers`);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
}
export { getAllTeacher,getAllManagers };
