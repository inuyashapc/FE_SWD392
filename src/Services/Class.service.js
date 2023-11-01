import axios from "axios";

const API_BASE = "http://localhost:8080/classes";
const getAllClass = async () => {
  try {
    const result = await axios.get(API_BASE);
    console.log("🚀 ========= result:", result);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const createClass = async (formData) => {
  try {
    const result = await axios.post(`${API_BASE}/create`, formData);
    console.log("🚀 ========= result:", result);
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

export { getAllClass, createClass };
