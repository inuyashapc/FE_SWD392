import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { getAllManagers } from "../../Services/User.service.js";
const AddNewSubjectModel = ({ onSubjectData , handleCloseAddModal }) => {
  const [subject, setSubject] = useState({});
  const [listManager, setListManager] = useState([]);
  const [selectManager, setSelectManager] = useState({name:"Manager"});
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllManagers();
        console.log(
          "🚀 ~ file: AddNewSubjectModel.jsx:12 ~ fetchData ~ response:",
          response.data
        );
        setListManager(response.data);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    }
    fetchData();
  }, []);

  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [selectedItem, setSelectedItem] = useState(true);
  const handleSelect = (eventKey) => {
    setSelectedItem(parseInt(eventKey, 10));
  };
  const handleSelectManager = (eventKey) => {
    const selectedManager = JSON.parse(eventKey);
  setSelectManager(selectedManager);
  };
  function handleInputChange(event, setStateFunction) {
    setStateFunction(event.target.value);
  }
  const handleSaveSubject = () => {
    onSubjectData({
      subject_code:subjectCode,
      subject_name:subjectName,
      subject_description:subjectDescription,
      isActived: selectedItem,
      manager_id: selectManager.user_id,
    });
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add New Subject</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Subject Code</p>
            <FormControl
              placeholder="Subject code"
              aria-label="Subject code"
              aria-describedby="basic-addon2"
              value={subjectCode}
              onChange={(e) => handleInputChange(e, setSubjectCode)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Subject Name</p>
            <FormControl
              placeholder="Subject Name"
              aria-label="Subject Name"
              aria-describedby="basic-addon2"
              value={subjectName}
              onChange={(e) => handleInputChange(e, setSubjectName)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Subject Description</p>
            <FormControl
              as="textarea"
              placeholder="Subject Description"
              aria-label="Subject Description"
              aria-describedby="basic-addon2"
              rows={4}
              value={subjectDescription}
              onChange={(e) => handleInputChange(e, setSubjectDescription)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Subject Manger</p>
            <Dropdown onSelect={handleSelectManager}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {selectManager.full_name || "Manager"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {listManager.map((manager, index) => {
                  return (
                    <Dropdown.Item eventKey={JSON.stringify(manager)} key={index}>
                      {manager.full_name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
          <InputGroup className="mb-3">
            <p style={{ paddingRight: "5px" }}>Status</p>

            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {selectedItem ? "Actived" : "InActived"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey={1}>Actived</Dropdown.Item>
                <Dropdown.Item eventKey={0}>InActived</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseAddModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveSubject}>
          Save
        </Button>
      </Modal.Footer>
    </>
  );
};

export default AddNewSubjectModel;
