import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Modal, Row, Table } from "react-bootstrap";
import SubjectListModalShow from "../Components/SubjectMgmt/SubjectListModalShow.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEye,
  faPencilAlt,
  faTimesCircle,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  changeActiveSubject,
  createNewSubject,
  getAllSubject,
  getSubjectById,
  softDeleteSubject,
  updateSubject,
} from "../Services/Subject.service.js";
import AddNewSubjectModel from "../Components/SubjectMgmt/AddNewSubjectModel.jsx";
const SubjectList = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [subjectData, setSubjectData] = useState({});
  const [sortColumn, setSortColumn] = useState("subject_id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [handleCallAllSubject, setHandleCallAllSubject] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllSubject(sortColumn, sortDirection);
        setSubjects(response);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    }
    fetchData();
  }, [sortColumn, sortDirection, handleCallAllSubject]);

  const columns = [
    { field: "subject_id", label: "ID", sortable: true },
    { field: "subject_code", label: "Code", sortable: true },
    { field: "subject_name", label: "Name", sortable: true },
    { field: "subject_description", label: "Description", sortable: true },
    { field: "manager_id", label: "Manager", sortable: true },
    { field: "isActived", label: "Status", sortable: true },
    { field: "action", label: "Action" },
  ];
  const handleSort = (field) => {
    if (field === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(field);
      setSortDirection("asc");
    }
  };

  const handleClickIconEye = async (subject_id) => {
    try {
      setIsEditing(false);
      const data = await getSubjectById(subject_id);
      setSubjectData(data);
      handleShowModal();
      console.log(subject_id);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  const handleClickIconEdit = async (subject_id) => {
    try {
      setIsEditing(true);
      const data = await getSubjectById(subject_id);
      setSubjectData(data);
      handleShowModal();
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  const handleClickIconChangeActiveStatus = async (subject_id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to change the active status"
      );
      if (confirm) {
        const data = await changeActiveSubject(
          subject_id,
          sortColumn,
          sortDirection
        );
        setSubjects(data);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  const handleClickIconSoftDelete = async (subject_id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to soft delete this"
      );
      if (confirm) {
        const data = await softDeleteSubject(
          subject_id,
          sortColumn,
          sortDirection
        );
        setSubjects(data);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  const handleSubmitAddNewSubjectData = async (data) => {
    console.log(
      "🚀 ~ file: SubjectList.jsx:122 ~ handleSubjectData ~ data:",
      data
    );
    await createNewSubject(data);
    callAllSubject();
    handleCloseAddModal();
  };
  const handleSubmitUpdateSubjectData = async (data) => {
     await updateSubject(data);
    callAllSubject();
    handleCloseModal();
    return;
  }
   
  const callAllSubject = () => {
    setHandleCallAllSubject(!handleCallAllSubject);
  };
  const handleSearch = (e) => {
    alert("Searching...");
  };
  return (
    <div className="container border-0" style={{ marginTop: "17px" }}>
      <Card>
        <Card.Header>
          <Row>
            <Col sm={6}>
              <h2>Manager Subject </h2>
            </Col>
            <Col sm={6}>
              <Button variant="info" onClick={() => handleShowAddModal()}>
                Mới
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => {
                  window.history.back(-1);
                }}
                style={{ marginLeft: "70%" }}
              >
                Quay lại
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm={4}></Col>
            <Col sm={4} className="m-2">
              <div className="d-flex">
                <input
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => handleSearch(e)}
                />
                {/* {errorMessage && (
                      <div className="error-message" style={{ color: "red" }}>
                        {errorMessage}
                      </div>
                    )} */}
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <div className="scrollable-area" style={{ overflow: "auto" }}>
            <Table bordered>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  {columns.map((column) => (
                    <th
                      key={column.field}
                      onClick={
                        column.sortable ? () => handleSort(column.field) : null
                      }
                      style={{
                        width: `${column.field == "action" ? "18%" : ""}`,
                      }}
                    >
                      <div
                        className={`d-flex ${
                          column.sortable ? "" : "flex-column"
                        } justify-content-between align-items-center`}
                      >
                        <span>{column.label}</span>
                        {column.sortable && (
                          <FontAwesomeIcon
                            icon={
                              sortColumn === column.field &&
                              sortDirection === "asc"
                                ? faSortDown
                                : faSortUp
                            }
                            style={{ paddingRight: "1px" }}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <tr
                    key={subject.subject_id}
                    className={subject.isActived ? "actived" : "inactived"}
                  >
                    <td>{subject.subject_id}</td>
                    <td>{subject.subject_code}</td>
                    <td>{subject.subject_name}</td>
                    <td>{subject.subject_description}</td>
                    <td>{subject.Manager.full_name}</td>
                    <td>{subject.isActived ? "Actived" : "InActived"}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        style={{ cursor: "pointer" }}
                        onClick={(e) => handleClickIconEye(subject.subject_id)}
                      />
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        style={{ cursor: "pointer" }}
                        onClick={(e) => handleClickIconEdit(subject.subject_id)}
                      />
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        style={{ cursor: "pointer" }}
                        onClick={(e) =>
                          handleClickIconChangeActiveStatus(subject.subject_id)
                        }
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ cursor: "pointer" }}
                        onClick={(e) =>
                          handleClickIconSoftDelete(subject.subject_id)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          {/* <Pagination
                totalPages={totalPages}
                onPageChange={handlePageChange}
              /> */}
        </Card.Footer>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <SubjectListModalShow
          subjectData={subjectData}
          isEditing={isEditing}
          handleSubmitUpdateSubjectData={handleSubmitUpdateSubjectData}
        />
      </Modal>
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <AddNewSubjectModel
          onSubjectData={handleSubmitAddNewSubjectData}
          handleCloseAddModal={handleCloseAddModal}
        />
      </Modal>
    </div>
  );
};

export default SubjectList;
