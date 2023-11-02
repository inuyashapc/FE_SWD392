import React, { useState } from "react";
import { Dropdown, FormControl, InputGroup } from "react-bootstrap";

const SubjectListModalShow = ({ subjectData, isEditing }) => {
  console.log(
    "🚀 ~ file: SubjectListModalShow.jsx:5 ~ SubjectListModalShow ~ isEditing:",
    isEditing
  );
  const [subjectId, setSubjectId] = useState(subjectData.subject_id);
  const [subjectCode, setSubjectCode] = useState(subjectData.subject_code);
  const [subjectName, setSubjectName] = useState(subjectData.subject_name);
  const [subjectDescription, setSubjectDescription] = useState(
    subjectData.subject_description
  );
  const [manager, setManager] = useState(subjectData?.Manager?.full_name);
  const [selectedItem, setSelectedItem] = useState(subjectData?.isActived);

  const handleSelect = (eventKey) => {
    
    setSelectedItem( parseInt(eventKey, 10));
    console.log("🚀 ~ file: SubjectListModalShow.jsx:22 ~ handleSelect ~ parseInt(selectedItem, 10):", parseInt(eventKey, 10))
  };
  function handleInputChange(event, setStateFunction) {
    setStateFunction(event.target.value);
  }

  return (
    <>
      <InputGroup className="mb-3">
        <p style={{ paddingRight: "5px" }}>Subject ID</p>
        <FormControl
          placeholder="Subject ID"
          aria-label="Subject ID"
          aria-describedby="basic-addon1"
          value={subjectId}
          disabled={!isEditing}
          onChange={(e) => handleInputChange(e, setSubjectId)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <p style={{ paddingRight: "5px" }}>Subject Code</p>
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
        <p style={{ paddingRight: "5px" }}>Subject Name</p>
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
        <p style={{ paddingRight: "5px" }}>Subject Description</p>
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
        <p style={{ paddingRight: "5px" }}>Subject Manger</p>
        <FormControl
          placeholder="Manager"
          aria-label="Manager"
          aria-describedby="basic-addon2"
          value={manager}
          disabled={!isEditing}
          onChange={(e) => handleInputChange(e, setManager)}
        />
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
    </>
  );
};

export default SubjectListModalShow;
