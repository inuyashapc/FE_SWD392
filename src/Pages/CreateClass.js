import React, { useEffect, useState } from "react";
import { getAllSubject } from "../Services/Subject.service";
import { getAllTeacher } from "../Services/User.service";
import { getAllSemester } from "../Services/Semester.service";
import { createClass } from "../Services/Class.service";
import { toast } from "react-toastify";

export default function CreateClass() {
  const [subjectList, setSubjectList] = useState();
  const [teacherList, setTeacherList] = useState();
  const [semesterList, setSemesterList] = useState();
  const [formData, setFormData] = useState({
    class_name: "",
    subject_id: "",
    teacher_id: "",
    semester_id: "",
  });
  console.log("🚀 ========= formData:", formData);

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
    setTeacherList(result?.data);
  };
  const getSemesterList = async () => {
    const result = await getAllSemester();
    setSemesterList(result?.data);
  };
  useEffect(() => {
    getSubjectList();
    getTeacherList();
    getSemesterList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createClass(formData);
    toast.success("Create successfully !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Class name
        </label>
        <input
          type="text"
          className="form-control"
          id="class_name"
          name="class_name"
          value={formData.class_name}
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
          <option value="" className="btn btn-primary">
            Subject
          </option>
          {subjectList?.map((subject) => (
            <option key={subject?.subject_id} value={subject?.subject_id}>
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
          <option value="" className="btn btn-primary">
            Choose Teacher
          </option>
          {teacherList?.map((teacher) => (
            <option key={teacher?.user_id} value={teacher?.user_id}>
              {teacher?.full_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Semester</label>
        <select
          name="semester_id"
          value={formData.semester_id}
          onChange={handleInputChange}
          required
        >
          <option value="" className="btn btn-primary">
            Choose Semester
          </option>
          {semesterList?.map((semester) => (
            <option key={semester?.semester_id} value={semester?.semester_id}>
              {semester?.semester_name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
