import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { createMilestone } from "../../Services/Milestone.service";
import { getAllClass } from "../../Services/Class.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateMilestone() {
  const [formData, setFormData] = useState();
  console.log("🚀 ========= formData:", formData);
  const [classes, setClasses] = useState();
  const navigate = useNavigate();
  const createMilestones = async () => {
    try {
      const result = await createMilestone(formData);
      console.log("🚀 ========= result:", result);
      return result;
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAddMileStone = async (e) => {
    e.preventDefault();
    const result = await createMilestones(formData);
    if (result) {
      toast.success("Create successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/milestoneList");
    }
  };
  const getAllClasses = async () => {
    try {
      const result = await getAllClass();
      console.log("🚀 ========= result:", result?.data);
      setClasses(result?.data);
    } catch (error) {}
  };
  useEffect(() => {
    getAllClasses();
  }, []);
  return (
    <div className="container">
      <Form onSubmit={handleAddMileStone}>
        <Form.Group className="mb-3">
          <Form.Label>Milestone name</Form.Label>
          <Form.Control
            type="text"
            id="milestone_name"
            name="milestone_name"
            placeholder="Enter milestone name"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Select
          aria-label="Default select example"
          name="class_id"
          onClick={handleInputChange}
        >
          <option>Select class</option>
          {classes?.map((item) => (
            <option
              value={item?.class_id} // Sử dụng class_id thay vì class_code
              key={item?.class_id}
            >
              {item?.class_name}
            </option>
          ))}
        </Form.Select>
        <Form.Group className="mb-3">
          <Form.Label>Milestone type</Form.Label>
          <Form.Control
            type="text"
            id="milestone_type"
            name="milestone_type"
            placeholder="Enter milestone type"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Milestone status</Form.Label>
          <Form.Control
            type="text"
            id="milestone_status"
            name="milestone_status"
            placeholder="Enter milestone status"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Start date</Form.Label>
          <Form.Control
            type="date"
            id="start_date"
            name="start_date"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End date</Form.Label>
          <Form.Control
            type="date"
            id="end_date"
            name="end_date"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Milestone description</Form.Label>
          <Form.Control
            as="textarea"
            id="milestone_description"
            name="milestone_description"
            placeholder="Enter milestone description"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}
