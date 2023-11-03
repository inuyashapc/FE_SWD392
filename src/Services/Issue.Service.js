import axios from "axios";

const API_BASE = "http://localhost:8080/issues";
const getAllIssue = async () => {
  try {
    const result = await axios.get(API_BASE);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};
const createNewIssue = async (formData) => {
  try {
    const result = await axios.post(`${API_BASE}/create`, formData);
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};
const getIssueById = async (id) => {
  try {
    const result = await axios.get(`${API_BASE}/${id}`);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const batchUpdate = async (id, updateData) => {
  try {
    const result = await axios.put(`${API_BASE}/${id}/update`, updateData);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

export { getAllIssue, createNewIssue, getIssueById, batchUpdate };
