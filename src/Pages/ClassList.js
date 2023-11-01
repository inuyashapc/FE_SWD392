import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { getAllSubject } from "../Services/Subject.service";
import { getAllClass } from "../Services/Class.service";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
export default function ClassList() {
  const [subjectList, setSubjectList] = useState();
  const [classList, setClassList] = useState();

  const getSubjectList = async () => {
    const result = await getAllSubject();
    setSubjectList(result?.data);
  };
  const getClassList = async () => {
    const result = await getAllClass();
    console.log("🚀 ========= result:", result?.data);
    setClassList(result?.data);
  };

  useEffect(() => {
    getSubjectList();
    getClassList();
  }, []);
  const handleSearch = () => {};
  return (
    <div>
      <h4>Class List</h4>
      <div>
        <input
          type="text"
          placeholder="Search..."
          // value={searchTerm}
          // onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="d-flex justify-content-around">
        <div className="d-flex align-items-center">
          <h6 className="mr-2">Semester</h6>
          <DropdownButton id="dropdown-basic-button" title="Semester">
            {subjectList?.map((subject) => (
              <Dropdown.Item key={subject?.subject_id} href="#/action-1">
                {subject?.subject_code}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <div className="d-flex align-items-center">
          <h6 className="mr-2">Major</h6>
          <DropdownButton id="dropdown-basic-button" title="Major">
            <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Action 3</Dropdown.Item>
          </DropdownButton>
        </div>
        <div>
          <Link to={"create"} className="btn btn-primary">
            Create class
          </Link>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Class name</th>
            <th scope="col">Status</th>
            <th scope="col">Subject</th>
            <th scope="col">Created At</th>
            <th scope="col">Semester</th>
            <th scope="col">Teacher</th>
          </tr>
        </thead>
        <tbody>
          {classList?.map((item) => (
            <tr key={item?.class_id}>
              <th scope="row">{item?.class_id}</th>
              <td>{item?.class_name}</td>
              <td className="text-success">
                {item?.class_status ? "Active" : "UnActive"}
              </td>
              <td>{item?.Subject?.subject_code}</td>
              <td>{dayjs(item?.created_at).format("DD-MM-YYYY")}</td>
              <td>{item?.semester_id}</td>
              <td>{item?.Teacher?.full_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
