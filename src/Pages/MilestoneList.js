import React, { useEffect, useState } from "react";
import {
  deleteMilestone,
  getAllMilestone,
} from "../Services/Milestone.service";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export default function MilestoneList() {
  const [milestoneList, setMilestoneList] = useState();
  const getAllMilestones = async () => {
    try {
      const result = await getAllMilestone();
      setMilestoneList(result?.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };

  useEffect(() => {
    getAllMilestones();
  }, []);

  const deleteMilestones = async (id) => {
    try {
      const result = await deleteMilestone(id);
      if (result) {
        getAllMilestones();
      }
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  return (
    <div className="container">
      <h4>Milestone List</h4>
      <Link to={"create"} className="btn btn-primary">
        Create milestone
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Milestone Title</th>
            <th scope="col">Type</th>
            <th scope="col">Class</th>
            <th scope="col">Project</th>
            <th scope="col">Start date</th>
            <th scope="col">End at</th>
            <th scope="col">Created At</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {milestoneList?.map((milestone) => (
            <tr key={milestone?.milestone_id}>
              <th scope="row">{milestone?.milestone_id}</th>
              <td>
                <Link to={`${milestone?.milestone_id}`}>
                  {milestone?.milestone_name}
                </Link>
              </td>
              <td>{milestone?.milestone_type}</td>
              <td>{milestone?.Class?.class_name}</td>
              <td>{milestone?.Project?.project_name}</td>
              <td>{dayjs(milestone?.start_date).format("DD-MM-YYYY")}</td>
              <td>{dayjs(milestone?.end_date).format("DD-MM-YYYY")}</td>
              <td>{dayjs(milestone?.created_at).format("DD-MM-YYYY")}</td>
              <td>{milestone?.milestone_status}</td>
              <td>
                <button
                  onClick={() => deleteMilestones(milestone?.milestone_id)}
                  className="btn btn-primary"
                >
                  Delete milestone
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
