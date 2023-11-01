import React, { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";

const SubjectListModalShow = ({subjectData,isEditing}) => {
  const [inputData,setInputData] = useState({})
  return (
    <>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Subject ID"
          aria-label="Subject ID"
          aria-describedby="basic-addon1"
          value={subjectData.subject_id}
          { ...isEditing ? "" :"disabled"}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Subject code"
          aria-label="Subject code"
          aria-describedby="basic-addon2"
          value={subjectData.subject_code}
          { ...isEditing ? "" :"disabled"}

        />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Subject Name"
          aria-label="Subject Name"
          aria-describedby="basic-addon2"
          value={subjectData.subject_name}
          { ...isEditing ? "" :"disabled"}

        />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          as="textarea"
          placeholder="Subject Description"
          aria-label="Subject Description"
          aria-describedby="basic-addon2"
          rows={4}
          value={subjectData.subject_description}
          { ...isEditing ? "" :"disabled"}

        />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Manager"
          aria-label="Manager"
          aria-describedby="basic-addon2"
          value={subjectData?.Manager?.full_name}
          { ...isEditing ? "" :"disabled"}
        />
      </InputGroup>
    </>
  );
};

export default SubjectListModalShow;
