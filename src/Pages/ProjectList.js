import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Project() {
  const nav = useNavigate();
  const projects = [
    { id: 1, name: "Project 1", description: "Description 1" },
    { id: 2, name: "Project 2", description: "Description 2" },
    { id: 3, name: "Project 3", description: "Description 3" },
  ];

 

  return (
    <div className="container mt-4">
      <h1>Project List</h1>
      <Button variant="light" onClick={() => nav("/projectList/create")}>Creat new project</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>
                <Button onClick={() => nav("/projectList/update")}>Update</Button>
                <Button onClick={() => nav("/projectList/members")}>Members</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Project;
