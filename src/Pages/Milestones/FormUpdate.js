import React, { useEffect, useState } from "react";
import { getAllSubjects } from "../../Services/Subject.service";
import { getAllTeacher } from "../../Services/User.service";
import { getAllSemester } from "../../Services/Semester.service";
import { getClassDetail, updateClass } from "../../Services/Class.service";
import { toast } from "react-toastify";
export default function FormUpdate({ id }) {
  const [subjectList, setSubjectList] = useState();
  const [teacherList, setTeacherList] = useState();
  const [semesterList, setSemesterList] = useState();
  const [classDetail, setClassDetail] = useState();
  const [formData, setFormData] = useState();
  console.log("🚀 ========= formData:", formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getSubjectList = async () => {
    const result = await getAllSubjects();
    setSubjectList(result);
  };

  const getTeacherList = async () => {
    const result = await getAllTeacher();
    setTeacherList(result?.data);
  };

  const getSemesterList = async () => {
    const result = await getAllSemester();
    setSemesterList(result?.data);
  };

  const getClassDetailById = async () => {
    try {
      const result = await getClassDetail(id);
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

  const handleUpdateDetailClass = async (e) => {
    e.preventDefault();
    const result = await updateClass(id, formData);
    toast.success("Create successfully !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <form onSubmit={handleUpdateDetailClass}>
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
          onChange={handleInputChange}
          defaultValue={classDetail?.Subject?.subject_id}
          required
        >
          {subjectList?.map((subject) => (
            <option
              defaultValue={classDetail?.Subject?.subject_id}
              value={subject?.subject_id} // Sử dụng subject_id thay vì subject_code
              key={subject?.subject_id}
            >
              {console.log("a", classDetail?.Subject?.subject_id)}
              {subject?.subject_code}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Teacher</label>
        <select name="teacher_id" onChange={handleInputChange} required>
          {teacherList?.map((teacher) => (
            <option
              defaultValue={classDetail?.Teacher?.full_name}
              key={teacher?.user_id}
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
