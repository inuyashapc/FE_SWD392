import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button } from "react-bootstrap";

function ProjectMemberList() {
  const members = [
    { id: 1, name: "Member 1", role: "Role 1" },
    { id: 2, name: "Member 2", role: "Role 2" },
    { id: 3, name: "Member 3", role: "Role 3" },
    // Thêm thành viên giả lập khác nếu cần
  ];

  return (
    <div className="container mt-4">
      <h1>Project Member List</h1>
      <Button variant="light">Add New Member</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProjectMemberList;
