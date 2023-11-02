import { async } from "q";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router";
import { getDetailMilestone } from "../Services/Milestone.service";
import dayjs from "dayjs";

export default function MilestoneDetail() {
  const [milestoneDetail, setMilestoneDetail] = useState();
  console.log("🚀 ========= milestoneDetail:", milestoneDetail);
  const { id } = useParams();
  console.log("🚀 ========= id:", id);

  const getMilestoneDetail = async () => {
    try {
      const result = await getDetailMilestone(id);
      console.log("🚀 ========= result:", result?.data);
      setMilestoneDetail(result?.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };

  useEffect(() => {
    getMilestoneDetail();
  }, [id]);
  return (
    <div className="container">
      <h4>Milestone detail</h4>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Milestone name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter milestone name"
            defaultValue={milestoneDetail?.milestone_name}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Milestone type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter milestone name"
            defaultValue={milestoneDetail?.milestone_type}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Milestone status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter milestone name"
            defaultValue={milestoneDetail?.milestone_status}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Start date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter milestone name"
            defaultValue={dayjs(milestoneDetail?.start_date).format(
              "YYYY-MM-DD"
            )}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>End date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter milestone name"
            defaultValue={dayjs(milestoneDetail?.end_date).format("YYYY-MM-DD")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Milestone description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            defaultValue={milestoneDetail?.milestone_description}
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
