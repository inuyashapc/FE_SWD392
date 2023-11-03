import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { getAllClass } from "../../Services/Class.service";
import { getAllProject } from "../../Services/Project.service";
import { getAllSubject } from "../../Services/Subject.service";
import { getAllTypeAndStatusBySettingId } from "../../Services/Issue.Setting.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faPlusSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import NewTypeAndStatus from "./NewTypeAndStatus";

const DetailModal = ({
  issueSetting,
  isEditing,
  handleSubmitUpdateIssueSetting,
}) => {
  const [className, setClassName] = useState(issueSetting.Class.class_name);
  const [projectName, setProjectName] = useState(
    issueSetting.Project.project_name
  );
  const [subjectCode, setSubjectCode] = useState(
    issueSetting.Subject.subject_code
  );
  const [workProcess, setWorkProcess] = useState(issueSetting.work_process);
  const [gitlabSync, setGitlabSync] = useState(issueSetting.gitlab_sync);

  const [listClass, setListClass] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const [listTypeAndStatus, setListTypeAndStatus] = useState([]);
  const [updatedData, setUpdatedData] = useState({});

  const [showAddTypeAndStusModal, setShowAddTypeAndStusModal] = useState(false);
  const handleOpenAddTypeAndStusModal = () => setShowAddTypeAndStusModal(true);
  const handleCloseAddTypeAndStusModal = () =>
    setShowAddTypeAndStusModal(false);

  const [isType, setIsType] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const [classData, projectData, subjectData, typeAndStatusData] =
          await Promise.all([
            getAllClass(),
            getAllProject(),
            getAllSubject(),
            getAllTypeAndStatusBySettingId(issueSetting.setting_id),
          ]);
        setListClass(classData.data);
        setListProject(projectData);
        setListSubject(subjectData);
        setListTypeAndStatus(typeAndStatusData);
        console.log(
          "🚀 ~ file: DetailModel.jsx:43 ~ fetchData ~ typeAndStatusData:",
          typeAndStatusData
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };
  const handleUpdateIssueSetting = () => {
    const update = {
      ...updatedData,
      work_process: workProcess,
      gitlab_sync: gitlabSync,
      setting_id: issueSetting.setting_id,
    };

    handleSubmitUpdateIssueSetting(update);
  };
  const handleSelectDropdown = (eventKey, setStateFunction) => {
    const parse = JSON.parse(eventKey);
    const updated = { ...updatedData, ...parse.id };
    setUpdatedData(updated);
    setStateFunction(parse.name);
  };
  const handleAddNewTypeAndStatus = () => {
    handleOpenAddTypeAndStusModal();
  };
  const handleDeleteTypeAndStatus = () => {
    alert("are you want to delete");
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Issue Setting Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Issue Setting ID : </p>
            <FormControl
              placeholder="Issue Setting ID"
              aria-label="Issue Setting ID"
              aria-describedby="basic-addon1"
              value={issueSetting.setting_id}
              disabled
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Project Name : </p>
            {isEditing ? (
              <Dropdown
                onSelect={(eventKey) =>
                  handleSelectDropdown(eventKey, setProjectName)
                }
              >
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {projectName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {listProject.map((project, index) => {
                    return (
                      <Dropdown.Item
                        eventKey={JSON.stringify({
                          name: project.project_name,
                          id: { project_id: project.project_id },
                        })}
                        key={index}
                      >
                        {project.project_name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              projectName
            )}
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Class Name : </p>
            {isEditing ? (
              <Dropdown
                onSelect={(eventKey) =>
                  handleSelectDropdown(eventKey, setClassName)
                }
              >
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {className}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {listClass?.map((classMap, index) => {
                    return (
                      <Dropdown.Item
                        eventKey={JSON.stringify({
                          name: classMap.class_name,
                          id: { class_id: classMap.class_id },
                        })}
                        key={index}
                      >
                        {classMap.class_name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              className
            )}
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Subject Code : </p>
            {isEditing ? (
              <Dropdown
                onSelect={(eventKey) =>
                  handleSelectDropdown(eventKey, setSubjectCode)
                }
              >
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {subjectCode}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {listSubject?.map((subject, index) => {
                    return (
                      <Dropdown.Item
                        eventKey={JSON.stringify({
                          name: subject.subject_code,
                          id: { subject_id: subject.subject_id },
                        })}
                        key={index}
                      >
                        {subject.subject_code}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              subjectCode
            )}
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Work Process : </p>
            <FormControl
              placeholder="Work Process"
              aria-label="Work Process"
              aria-describedby="basic-addon2"
              value={workProcess}
              disabled={!isEditing}
              onChange={(e) => handleInputChange(e, setWorkProcess)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Gitlab Sync : </p>
            <FormControl
              placeholder="Gitlab Sync"
              aria-label="Gitlab Sync"
              aria-describedby="basic-addon2"
              value={gitlabSync}
              disabled={!isEditing}
              onChange={(e) => handleInputChange(e, setGitlabSync)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Issue Type : </p>
            <Dropdown
              onSelect={(eventKey) =>
                handleSelectDropdown(eventKey, setListTypeAndStatus)
              }
            >
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {"Issue Type"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {listTypeAndStatus.types?.map((type, index) => {
                  return (
                    <Dropdown.Item
                      eventKey={JSON.stringify({
                        types: { name: type.type_name },
                      })}
                      key={index}
                    >
                      {type.type_name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            {isEditing ? (
              <div>
                <FontAwesomeIcon
                  icon={faPlusSquare}
                  height="20px"
                  style={{ cursor: "pointer" }}
                  className="float-right"
                  onClick={(e) => handleAddNewTypeAndStatus(e)}
                />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  height="20px"
                  style={{ cursor: "pointer" }}
                  className="float-right"
                  onClick={(e) => handleDeleteTypeAndStatus(e)}
                />
              </div>
            ) : ""}
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Issue Status : </p>
            <Dropdown
              onSelect={(eventKey) =>
                handleSelectDropdown(eventKey, setListTypeAndStatus)
              }
            >
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {"Issue Status"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {listTypeAndStatus.statuses?.map((status, index) => {
                  return (
                    <Dropdown.Item
                      eventKey={JSON.stringify({
                        statuses: { name: status.status_name },
                      })}
                      key={index}
                    >
                      {status.status_name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            {isEditing ? (
              <div>
                <FontAwesomeIcon
                  icon={faPlusSquare}
                  height="20px"
                  style={{ cursor: "pointer" }}
                  className="float-right"
                  onClick={(e) => handleAddNewTypeAndStatus(e)}
                />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  height="20px"
                  style={{ cursor: "pointer" }}
                  className="float-right"
                  onClick={(e) => handleDeleteTypeAndStatus(e)}
                />
              </div>
            ) : ""}
          </InputGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {isEditing && (
          <Button variant="primary" onClick={handleUpdateIssueSetting}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>

      <Modal
        show={showAddTypeAndStusModal}
        onHide={handleCloseAddTypeAndStusModal}
        backdrop="static"
        keyboard={false}
      >
        <NewTypeAndStatus state={isType} />
      </Modal>
    </>
  );
};

export default DetailModal;
