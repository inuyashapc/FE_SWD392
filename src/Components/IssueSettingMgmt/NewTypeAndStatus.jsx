import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const NewTypeAndStatus = ({ state }) => {
  const [category, setCategory] = useState();

  useEffect(() => {
    if (state == true) {
      setCategory("Type");
    } else {
      setCategory("Status");
    }
  }, []);
  return (
    <div className="custom-modal ">
      <Modal.Header closeButton>
        <Modal.Title>Add New {category}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Lmeo</div>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="primary" >
            Save Changes
          </Button>
      </Modal.Footer>
    </div>
  );
};

export default NewTypeAndStatus;
