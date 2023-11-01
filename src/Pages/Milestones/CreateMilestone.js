import React from "react";
import { Dropdown, Form } from "react-bootstrap";

export default function CreateMilestone() {
  return (
    <div className="container">
      <Form>
        <Form.Group className="mb-3" controlId="milestoneName">
          <Form.Label>Milestone name</Form.Label>
          <Form.Control type="text" placeholder="Enter milestone name" />
        </Form.Group>
        <Form.Group className="mb-3 d-flex" controlId="project">
          <Form.Label>Project</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Project
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>1</Dropdown.Item>
              <Dropdown.Item>2</Dropdown.Item>
              <Dropdown.Item>3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group className="mb-3 d-flex" controlId="project">
          <Form.Label>Milestone</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Milestone
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>1</Dropdown.Item>
              <Dropdown.Item>2</Dropdown.Item>
              <Dropdown.Item>3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group className="mb-3" controlId="milestoneDescription">
          <Form.Label>Milestone description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
          />
        </Form.Group>
      </Form>
    </div>
  );
}
