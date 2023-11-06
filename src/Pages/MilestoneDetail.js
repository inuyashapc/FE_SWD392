import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  getDetailMilestone,
  updateMilestone,
} from "../Services/Milestone.service";
export default function MilestoneDetail() {
  const [milestoneDetail, setMilestoneDetail] = useState();
  console.log("🚀 ========= milestoneDetail:", milestoneDetail);
  const [formData, setFormData] = useState();
  console.log("🚀 ========= formData:", formData) ;
  const { id } = useParams();
  const navigate = useNavigate();
  const getMilestoneDetail = async () => {
    try {
      const result = await getDetailMilestone(id);
      console.log("🚀 ========= result:", result);
      setMilestoneDetail(result?.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };

  const updateDetailMilestone = async (e) => {
    e.preventDefault();
    try {
      const result = await updateMilestone(id, formData);
      if (result) {
        toast.success("Update successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate(`/classList/${id}`);
      } else {
        toast.warning("Update do not successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    getMilestoneDetail();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="container">
      <h4>Milestone detail</h4>
      <Form onSubmit={updateDetailMilestone}>
        <Form.Group className="mb-3">
          <Form.Label>Milestone name</Form.Label>
          <Form.Control
            type="text"
            id="milestone_name"
            name="milestone_name"
            placeholder="Enter milestone name"
            defaultValue={milestoneDetail?.milestone_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Milestone type</Form.Label>
          <Form.Control
            type="text"
            id="milestone_type"
            name="milestone_type"
            placeholder="Enter milestone type"
            defaultValue={milestoneDetail?.milestone_type}
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
            defaultValue={milestoneDetail?.milestone_status}
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
            value={dayjs(milestoneDetail?.start_date).format("YYYY-MM-DD")}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End date</Form.Label>
          <Form.Control
            type="date"
            id="end_date"
            name="end_date"
            value={dayjs(milestoneDetail?.end_date).format("YYYY-MM-DD")}
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
            defaultValue={milestoneDetail?.milestone_description}
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
