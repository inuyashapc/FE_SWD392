import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const CreateProject = () => {
  return (
    <Container>
      <h2>Create Project</h2>
      <Form>
        <Form.Group controlId="projectName">
          <Form.Label>Project Name</Form.Label>
          <Form.Control type="text" placeholder="Enter project name" />
        </Form.Group>

        <Form.Group controlId="projectDescription">
          <Form.Label>Project Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter project description" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default CreateProject;