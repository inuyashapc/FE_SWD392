import axios from "axios";

const API_BASE = "http://localhost:8080/subjects";
const getAllSubject = async (sortColumn, sortOrder) => {
  try {
    const result = await axios.get(API_BASE, {
      params: {
        sortColumn,
        sortOrder,
      },
    });
    return result.data;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const createNewSubject = async (newSubjectData) => {
  try {
    const result = await axios.post(`${API_BASE}/create`, newSubjectData);
    return result.data;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const getSubjectById = async (subject_id) => {
  try {
    const result = await axios.get(`${API_BASE}/${subject_id}`);
    return result.data;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const changeActiveSubject = async (subject_id, sortColumn, sortOrder) => {
  try {
    const result = await axios.patch(
      `${API_BASE}/active`,
      { subject_id },
      {
        params: {
          sortColumn,
          sortOrder,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const softDeleteSubject = async (subject_id, sortColumn, sortOrder) => {
  try {
    const result = await axios.delete(`${API_BASE}/delete/${subject_id}`, {
      params: {
        sortColumn,
        sortOrder,
      },
    });
    return result.data;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};

const getAllSubjects = async () => {
  try {
    const result = await axios.get(`${API_BASE}/all`);
    return result.data;
  } catch (error) {
    console.log("🚀 ========= error:", error);
  }
};
export {
  getAllSubject,
  changeActiveSubject,
  softDeleteSubject,
  createNewSubject,
  getSubjectById,
  getAllSubjects,
};
