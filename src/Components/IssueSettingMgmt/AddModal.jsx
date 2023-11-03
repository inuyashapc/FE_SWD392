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

const AddModal = ({handleAddNewIssueSetting}) => {
  const [className, setClassName] = useState();
  const [projectName, setProjectName] = useState();
  const [subjectCode, setSubjectCode] = useState();
  const [workProcess, setWorkProcess] = useState();
  const [gitlabSync, setGitlabSync] = useState();

  const [listClass, setListClass] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const [classData, projectData, subjectData] = await Promise.all([
          getAllClass(),
          getAllProject(),
          getAllSubject(),
        ]);
        setListClass(classData.data);
        setListProject(projectData);
        setListSubject(subjectData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };
  const handleSaveIssueSetting = () => {
    const data = {
      ...updatedData,
      work_process: workProcess,
      gitlab_sync: gitlabSync,
    };
    handleAddNewIssueSetting(data)
  };
  const handleSelectDropdown = (eventKey, setStateFunction) => {
    const parse = JSON.parse(eventKey);
    const updated = { ...updatedData, ...parse.id };
    setUpdatedData(updated);
    setStateFunction(parse.name);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add New Issue Setting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Project Name : </p>
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
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Class Name : </p>
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
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Subject Code : </p>
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
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Work Process : </p>
            <FormControl
              placeholder="Work Process"
              aria-label="Work Process"
              aria-describedby="basic-addon2"
              value={workProcess}
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
              onChange={(e) => handleInputChange(e, setGitlabSync)}
            />
          </InputGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveIssueSetting}>
          Save Changes
        </Button>
      </Modal.Footer>
    </>
  );
};

export default AddModal;
