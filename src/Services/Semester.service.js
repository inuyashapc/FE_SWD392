import axios from "axios";

const API_BASE = "http://localhost:8080/semesters";
const getAllSemester = async () => {
  try {
    const result = await axios.get(API_BASE);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

export { getAllSemester };
