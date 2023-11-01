import axios from "axios";

const API_BASE = "http://localhost:8080/subjects";
const getAllSubject = async () => {
  try {
    const result = await axios.get(API_BASE);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

export { getAllSubject };
