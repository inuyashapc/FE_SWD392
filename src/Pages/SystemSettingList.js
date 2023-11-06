import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function SystemSetting() {
  const systems = [
    { name: "Fall23", type: "1", status: "Active" },
    { name: "Summer23", type: "2", status: "DeActive" },
    { name: "Spring23", type: "3", status: "Active" },
  ];

  return (
    <div className="container mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Setting Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {systems.map((system) => (
            <tr key={system.id}>
              <td>{system.name}</td>
              <td>{system.type}</td>
              <td>{system.status}</td>
              <td>
                <Button>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SystemSetting;
