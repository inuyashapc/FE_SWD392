import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { getAllManagers } from "../../Services/User.service";

const SubjectListModalShow = ({
  subjectData,
  isEditing,
  handleSubmitUpdateSubjectData,
}) => {
  const [subjectId, setSubjectId] = useState(subjectData.subject_id);
  const [subjectCode, setSubjectCode] = useState(subjectData.subject_code);
  const [subjectName, setSubjectName] = useState(subjectData.subject_name);
  const [subjectDescription, setSubjectDescription] = useState(
    subjectData.subject_description
  );
  const [selectManager, setSelectManager] = useState(subjectData?.Manager);
  const [selectedItem, setSelectedItem] = useState(subjectData?.isActived);
  const [listManager, setListManager] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllManagers();
        setListManager(response.data);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    }
    fetchData();
  }, []);

  const handleSelect = (eventKey) => {
    setSelectedItem(parseInt(eventKey, 10));
  };
  function handleInputChange(event, setStateFunction) {
    setStateFunction(event.target.value);
  }
  const handleSelectManager = (eventKey) => {
    const selectedManager = JSON.parse(eventKey);
    setSelectManager(selectedManager);
  };
  const handleUpdateSubject = () => {
    handleSubmitUpdateSubjectData({
      subject_id: subjectId,
      subject_code: subjectCode,
      subject_name: subjectName,
      subject_description: subjectDescription,
      isActived: selectedItem,
      manager_id: selectManager.user_id,
    });
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Subject Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Subject ID : </p>
            <FormControl
              placeholder="Subject ID"
              aria-label="Subject ID"
              aria-describedby="basic-addon1"
              value={subjectId}
              disabled
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Subject Code : </p>
            <FormControl
              placeholder="Subject code"
              aria-label="Subject code"
              aria-describedby="basic-addon2"
              value={subjectCode}
              disabled={!isEditing}
              onChange={(e) => handleInputChange(e, setSubjectCode)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Subject Name : </p>
            <FormControl
              placeholder="Subject Name"
              aria-label="Subject Name"
              aria-describedby="basic-addon2"
              value={subjectName}
              disabled={!isEditing}
              onChange={(e) => handleInputChange(e, setSubjectName)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Subject Description : </p>
            <FormControl
              as="textarea"
              placeholder="Subject Description"
              aria-label="Subject Description"
              aria-describedby="basic-addon2"
              rows={4}
              value={subjectDescription}
              disabled={!isEditing}
              onChange={(e) => handleInputChange(e, setSubjectDescription)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Subject Manger : </p>
            {isEditing ? (
              <Dropdown onSelect={handleSelectManager}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {selectManager.full_name || "Manager"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {listManager.map((manager, index) => {
                  return (
                    <Dropdown.Item
                      eventKey={JSON.stringify(manager)}
                      key={index}
                    >
                      {manager.full_name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            ) : (
              selectManager.full_name || "Manager"
            )}
            
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Status : </p>
            {isEditing ? (
              <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {selectedItem ? "Actived" : "InActived"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey={1}>Actived</Dropdown.Item>
                  <Dropdown.Item eventKey={0}>InActived</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              selectedItem ? "Actived" : "InActived"
            )}
          </InputGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {isEditing && (
          <Button variant="primary" onClick={handleUpdateSubject}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </>
  );
};

export default SubjectListModalShow;
