import {
  faEye,
  faPencilAlt,
  faSortDown,
  faSortUp,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row, Table } from "react-bootstrap";
import {
  changeStatusIssueSetting,
  createNewIssueSetting,
  getAllIssueSettings,
  getIssueSettingById,
  updateIssueSetting,
} from "../Services/Issue.Setting.service";
import AddModal from "../Components/IssueSettingMgmt/AddModal";
import DetailModal from "../Components/IssueSettingMgmt/DetailModal";

const IssueSetting = () => {
  const [issueSettings, setIssueSettings] = useState([]);
  const [issueSettingDetail, setIssueSettingDetail] = useState({});
  const [sortColumn, setSortColumn] = useState("setting_id");
  const [sortDirection, setSortDirection] = useState("asc");

  const [isEditing, setIsEditing] = useState(false);
  const [render, setRender] = useState(true);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseDetailModal = () => setShowDetailModal(false);
  const handleOpenDetailModal = () => setShowDetailModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleOpenAddModal = () => setShowAddModal(true);
  useEffect(() => {
    async function fetchData() {
      const issueSettingList = await getAllIssueSettings(
        sortColumn,
        sortDirection
      );
      setIssueSettings(issueSettingList);
    }
    fetchData();
  }, [sortDirection, sortColumn, render]);

  const columns = [
    { field: "setting_id", label: "ID", sortable: true },
    { field: "project_id", label: "Project", sortable: true },
    { field: "class_id", label: "Class", sortable: true },
    { field: "subject_id", label: "Subject", sortable: true },
    { field: "work_process", label: "Work Process", sortable: true },
    { field: "is_actived", label: "Actived", sortable: true },
    // { field: "gitlab_sync", label: "Gitlab Sync", sortable: true },
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
    handleChangeBooleanSate(false, setIsEditing);
    const subjectData = await getIssueSettingById(subject_id);
    setIssueSettingDetail(subjectData);
    handleOpenDetailModal();
  };
  const handleClickIconEdit = async (subject_id) => {
    handleChangeBooleanSate(true, setIsEditing);
    const subjectData = await getIssueSettingById(subject_id);
    setIssueSettingDetail(subjectData);
    handleOpenDetailModal();
  };
  const handleClickIconChangeActiveStatus = async (setting_id) => {
    const confirm = window.confirm(
      "Are you sure you want to change the active status"
    );
    if (confirm) {
      await changeStatusIssueSetting(setting_id);
      handleChangeBooleanSate(!render, setRender);
    }
  };
  const handleSearch = () => {
    alert("Searching...");
  };
  const handleChangeBooleanSate = (state, setStateFunction) => {
    setStateFunction(state);
  };
  const handleSubmitUpdateIssueSetting = async (data) => {
    console.log(
      "🚀 ~ file: IssueSetting.jsx:88 ~ handleSubmitUpdateIssueSetting ~ data:",
      data
    );

    await updateIssueSetting(data);
    handleChangeBooleanSate(!render, setRender);
    handleCloseDetailModal();
  };
  const handleAddNewIssueSetting = async (data) => {
     await createNewIssueSetting(data);
     handleChangeBooleanSate(!render, setRender);
    handleCloseAddModal();
  };
  return (
    <div className="container border-0" style={{ marginTop: "17px" }}>
      <Card>
        <Card.Header>
          <Row>
            <Col sm={6}>
              <h2>Manager Issue Setting </h2>
            </Col>
            <Col sm={6}>
              <Button variant="info" onClick={()=>handleOpenAddModal()}>
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
                {issueSettings?.map((issueSetting, index) => {
                  return (
                    <tr
                      key={index}
                      className={
                        issueSetting.is_actived ? "actived" : "inactived"
                      }
                    >
                      <td>{issueSetting.setting_id}</td>
                      <td>{issueSetting.Project.project_name}</td>
                      <td>{issueSetting.Class.class_name}</td>
                      <td>{issueSetting.Subject.subject_code}</td>
                      <td>{issueSetting.work_process}</td>
                      <td>
                        {issueSetting.is_actived ? "Actived" : "InActived"}
                      </td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                          style={{ cursor: "pointer" }}
                          onClick={(e) =>
                            handleClickIconEye(issueSetting.setting_id)
                          }
                        />
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          style={{ cursor: "pointer" }}
                          onClick={(e) =>
                            handleClickIconEdit(issueSetting.setting_id)
                          }
                        />
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          style={{ cursor: "pointer" }}
                          onClick={(e) =>
                            handleClickIconChangeActiveStatus(
                              issueSetting.setting_id
                            )
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
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

      <Modal
        show={showDetailModal}
        onHide={handleCloseDetailModal}
        backdrop="static"
        keyboard={false}
      >
        <DetailModal
          issueSetting={issueSettingDetail}
          isEditing={isEditing}
          handleSubmitUpdateIssueSetting={handleSubmitUpdateIssueSetting}
        />
      </Modal>
      <Modal
        show={showAddModal}
        onHide={handleCloseAddModal}
        ackdrop="static"
        keyboard={false}
      >
        <AddModal handleAddNewIssueSetting={handleAddNewIssueSetting}/>
      </Modal>
    </div>
  );
};

export default IssueSetting;
