import React, { useEffect, useState } from "react";
import { getAllSubject } from "../Services/Subject.service";

export default function CreateClass() {
  const [subjectList, setSubjectList] = useState();
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

  useEffect(() => {
    getSubjectList();
  }, []);
  return (
    <form>
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
          value={formData.id}
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
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Teacher
        </label>
        <input type="text" className="form-control" id="subject" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Semester
        </label>
        <input type="text" className="form-control" id="subject" />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
