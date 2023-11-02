import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Modal, Row, Table } from "react-bootstrap";
import SubjectListModalShow from "../Components/SubjectListComponent/SubjectListModalShow.jsx";
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
  getAllSubject,
  getSubjectById,
  softDeleteSubject,
} from "../Services/Subject.service.js";
const SubjectList = () => {
  const [showModal, setShowModal] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [subjectData, setSubjectData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [sortColumn, setSortColumn] = useState('subject_id');
  const [sortDirection, setSortDirection] = useState('asc');
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllSubject(sortColumn,sortDirection);
        setSubjects(response);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    }
    fetchData();
  }, [sortColumn,sortDirection]);

  const columns = [
    { field: 'subject_id', label: 'ID', sortable: true  },
    { field: 'subject_code', label: 'Code', sortable: true },
    { field: 'subject_name', label: 'Name', sortable: true },
    { field: 'subject_description', label: 'Description', sortable: true },
    { field: 'manager_id', label: 'Manager', sortable: true  },
    { field: 'isActived', label: 'Status' , sortable: true },
    { field: 'action', label: 'Action' }
  ];
  const handleSort = (field) => {
    if (field === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(field);
      setSortDirection('asc');
    }
  };

  const handleClickIconEye = async (subject_id) => {
    try {
      setIsEditing(false)
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
      setIsEditing(true)
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
        const data = await changeActiveSubject(subject_id, sortColumn, sortDirection);
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
        const data = await softDeleteSubject(subject_id, sortColumn, sortDirection);
        setSubjects(data);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  return (
    <div className="container border-0" style={{ marginTop: "17px" }}>
      <Card>
        <Card.Header>
          <Row>
            <Col sm={6}>
              <h2>Manager Product </h2>
            </Col>
            <Col sm={6}>
              <Button
                variant="info"
                onClick={() => {
                  //   setShowModal(true);
                }}
              >
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
                  //   onChange={(e) => setSearchName(e.target.value)}
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
                <tr style={{textAlign:'center'}}>
                {columns.map((column) => (
                  <th key={column.field} onClick={column.sortable ? () => handleSort(column.field) : null} style={{ width:`${column.field == 'action' ? '18%' : ''}`}}>
                    <div className={`d-flex ${column.sortable ? '' : 'flex-column'} justify-content-between align-items-center`}>
                      <span>{column.label}</span>
                      {column.sortable && (
                        <FontAwesomeIcon icon={sortColumn === column.field  && sortDirection ==='asc'? faSortUp : faSortDown } style={{paddingRight:'1px'}}/>
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
        <Modal.Header closeButton>
          <Modal.Title>Subject Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <SubjectListModalShow
              subjectData={subjectData}
              isEditing={isEditing}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubjectList;
