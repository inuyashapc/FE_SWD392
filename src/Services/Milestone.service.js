import axios from "axios";

const API_BASE = "http://localhost:8080/milestones";
const getAllMilestone = async () => {
  try {
    const result = await axios.get(API_BASE);
    console.log("🚀 ========= result:", result);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

export { getAllMilestone };
