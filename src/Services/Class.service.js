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

const getClassDetail = async (id) => {
  try {
    const result = await axios.get(`${API_BASE}/${id}`);
    console.log("🚀 ========= result1111:", result);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const updateClass = async (id, data) => {
  console.log("🚀 ========= data:", data);
  console.log("api", `${API_BASE}/${id}`);
  try {
    const result = await axios.put(`${API_BASE}/${id}`, data);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const changeStatus = async (id) => {
  try {
    const result = await axios.put(`${API_BASE}/changeStatus/${id}`);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};
export { getAllClass, createClass, getClassDetail, updateClass, changeStatus };
