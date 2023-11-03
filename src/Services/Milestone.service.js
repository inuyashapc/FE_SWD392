import axios from "axios";

const API_BASE = "http://localhost:8080/milestones";
const getAllMilestone = async () => {
  try {
    const result = await axios.get(API_BASE);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const getAllMilestoneById = async (id) => {
  try {
    const result = await axios.get(`${API_BASE}/class/${id}`);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const getDetailMilestone = async (id) => {
  try {
    const result = await axios.get(`${API_BASE}/${id}`);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const updateMilestone = async (id, data) => {
  try {
    const result = await axios.put(`${API_BASE}/${id}`, data);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};
export {
  getAllMilestone,
  getAllMilestoneById,
  getDetailMilestone,
  updateMilestone,
};
