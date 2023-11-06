import axios from "axios";

const API_BASE = "http://localhost:8080/classes";
const getAllClass = async () => {
  try {
    const result = await axios.get(API_BASE);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const createClass = async (formData) => {
  try {
    const result = await axios.post(`${API_BASE}/create`, formData);
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const getClassDetail = async (id) => {
  try {
    const result = await axios.get(`${API_BASE}/${id}`);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const updateClass = async (id, data) => {
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
const getAllClassSearch = async (search) => {
  console.log("🚀 ========= search:", search);
  try {
    const result = await axios.post(`${API_BASE}/search`, { search: search });
    console.log("🚀 ========= result:", result);
    return result;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};
export {
  getAllClass,
  createClass,
  getClassDetail,
  updateClass,
  changeStatus,
  getAllClassSearch,
};
