import React, { useEffect, useState } from "react";
import { getAllSubject } from "../Services/Subject.service";
import { getAllTeacher } from "../Services/User.service";
import { getAllSemester } from "../Services/Semester.service";
import { createClass, getClassDetail } from "../Services/Class.service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function ClassDetail() {
  const [subjectList, setSubjectList] = useState();
  const [teacherList, setTeacherList] = useState();
  const [semesterList, setSemesterList] = useState();
  const [classDetail, setClassDetail] = useState();
  const [formData, setFormData] = useState({
    class_name: "",
    subject_id: "",
    teacher_id: "",
    semester_id: "",
  });
  console.log("🚀 ========= formData:", formData);
  const { id } = useParams();
  console.log("🚀 ========= id:", id);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getSubjectList = async () => {
    const result = await getAllSubject();
    setSubjectList(result?.data);
  };
  const getTeacherList = async () => {
    const result = await getAllTeacher();
    console.log("🚀 ========= result:", result?.data);
    setTeacherList(result?.data);
  };
  const getSemesterList = async () => {
    const result = await getAllSemester();
    setSemesterList(result?.data);
  };

  const getClassDetailById = async () => {
    try {
      const result = await getClassDetail(id);
      console.log("🚀 ========= result1234:", result?.data);
      setClassDetail(result?.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    getSubjectList();
    getTeacherList();
    getSemesterList();
    getClassDetailById();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createClass(formData);
    toast.success("Create successfully !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Class Detail
        </label>
        <input
          type="text"
          className="form-control"
          id="class_name"
          name="class_name"
          defaultValue={classDetail?.class_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Subject</label>
        <select
          name="subject_id"
          value={formData.subject_id}
          onChange={handleInputChange}
          required
        >
          {subjectList?.map((subject) => (
            <option
              defaultValue={classDetail?.Subject?.subject_code}
              key={subject?.subject_id}
              value={subject?.subject_id}
            >
              {subject?.subject_code}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Teacher</label>
        <select
          name="teacher_id"
          value={formData.teacher_id}
          onChange={handleInputChange}
          required
        >
          {teacherList?.map((teacher) => (
            <option
              defaultValue={classDetail?.Teacher?.full_name}
              key={teacher?.user_id}
              value={teacher?.user_id}
            >
              {teacher?.full_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Semester</label>
        <select name="semester_id" onChange={handleInputChange} required>
          {semesterList?.map((semester) => (
            <option
              defaultValue={classDetail?.Semester?.semester_id}
              key={semester?.semester_id}
              value={semester?.semester_id}
            >
              {semester?.semester_id}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
}
