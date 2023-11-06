import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Button } from "antd";

import { getAllSubject } from "../Services/Subject.service";
import {
  changeStatus,
  getAllClass,
  getAllClassSearch,
} from "../Services/Class.service";

export default function ClassList() {
  const [subjectList, setSubjectList] = useState();
  const [classList, setClassList] = useState();
  const [search, setSearch] = useState("");
  const getSubjectList = async () => {
    const result = await getAllSubject();
    setSubjectList(result?.data);
  };
  const getClassList = async () => {
    const result = await getAllClassSearch(search);
    setClassList(result?.data);
  };

  const changeStatusClass = async (id) => {
    const result = await changeStatus(id);
    getClassList();
  };

  useEffect(() => {
    getSubjectList();
    getClassList();
  }, [search]);

  const handleSearch = () => {};
  return (
    <div className="container">
      <h4>Class List</h4>
      <div>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          // value={searchTerm}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <Link to={"create"} className="btn btn-primary">
        Create class
      </Link>
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
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {classList?.map((item) => (
            <tr key={item?.class_id}>
              <th scope="row">{item?.class_id}</th>
              <td>
                <Link to={`${item?.class_id}`}>{item?.class_name}</Link>
              </td>
              <td
                className={`${
                  item?.class_status ? "text-success" : "text-danger"
                }`}
              >
                {item?.class_status ? "Active" : "UnActive"}
              </td>
              <td>{item?.Subject?.subject_code}</td>
              <td>{dayjs(item?.created_at).format("DD-MM-YYYY")}</td>
              <td>{item?.Semester?.semester_name}</td>
              <td>{item?.Teacher?.full_name}</td>
              <td>
                <Button
                  type="primary"
                  onClick={() => changeStatusClass(item?.class_id)}
                >
                  Change status
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
