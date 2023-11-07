import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function UpdateProject() {
  const { projectId } = useParams();
  
  const projects = [
    { id: 1, name: "Project 1", description: "Description 1" },
    { id: 2, name: "Project 2", description: "Description 2" },
    { id: 3, name: "Project 3", description: "Description 3" },
  ];

  const projectToUpdate = projects.find((project) => project.id === Number(projectId));

  const [updatedProject, setUpdatedProject] = useState({ ...projectToUpdate });

  const handleUpdateProject = () => {
    // Thực hiện cập nhật dự án (có thể gửi dữ liệu cập nhật lên máy chủ ở đây)
    // Sau khi cập nhật thành công, bạn có thể điều hướng trở lại trang danh sách dự án
  };

  return (
    <Container>
      <h2>Update Project</h2>
      <Form>
        <Form.Group controlId="projectSelect">
          <Form.Label>Select Project</Form.Label>
          <Form.Control
            as="select"
            value={updatedProject.name}
            onChange={(e) => {
              const selectedProject = projects.find(
                (project) => project.name === e.target.value
              );
              setUpdatedProject(selectedProject);
            }}
          >
            {projects.map((project) => (
              <option key={project.id} value={project.name}>
                {project.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="projectDescription">
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter project description"
            value={updatedProject.description}
            onChange={(e) =>
              setUpdatedProject({
                ...updatedProject,
                description: e.target.value,
              })
            }
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleUpdateProject}>
          Update
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateProject;
