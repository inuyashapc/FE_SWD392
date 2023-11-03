import axios from "axios";

const API_BASE = "http://localhost:8080/issueSettings";
const createNewIssueSetting = async (data) => {
  try {
    const result = await axios.post(`${API_BASE}/create`, data);
    return result.data;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};
const getAllIssueSettings = async (sortColumn, sortDirection) => {
  try {
    const result = await axios.get(`${API_BASE}/getAll`, {
      params: {
        sortColumn,
        sortDirection,
      },
    });
    return result.data;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const changeStatusIssueSetting = async (setting_id) => {
  try {
    const result = await axios.put(`${API_BASE}/changeStatus/${setting_id}`);
    return result.data;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};
const getIssueSettingById = async (setting_id) => {
  try {
    const result = await axios.get(`${API_BASE}/get/${setting_id}`);
    return result.data;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};
const updateIssueSetting = async (data) => {
  try {
    const result = await axios.put(
      `${API_BASE}/update/${data.setting_id}`,
      data
    );
    return result.data;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const getAllTypeAndStatusBySettingId = async (setting_id) => {
  try {
    const result = await axios.get(
      `${API_BASE}/getTypeAndStatus/${setting_id}`
    );
    return result.data;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};
export {
  getAllIssueSettings,
  changeStatusIssueSetting,
  getIssueSettingById,
  updateIssueSetting,
  getAllTypeAndStatusBySettingId,
  createNewIssueSetting,
};
