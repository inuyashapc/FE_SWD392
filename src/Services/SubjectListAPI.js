// api.js
import axios from "axios";

const callAPISubjectListData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/subjects/");
    return response.data;
  } catch (error) {
    throw error;
  }
};
const callAPISubjectListDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/subjects/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
const callAPISubjectListUpdateActive = async (id) => {
  try {
    const response = await axios.patch(`http://localhost:8080/subjects/active/`,{
      subject_id:id
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
const callAPISubjectListDeleteSubject = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/subjects/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export  { callAPISubjectListData ,callAPISubjectListDetail ,callAPISubjectListUpdateActive,callAPISubjectListDeleteSubject};
