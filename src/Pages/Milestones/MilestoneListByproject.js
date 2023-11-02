import React, { useEffect, useState } from "react";
import { getAllMilestoneById } from "../../Services/Milestone.service";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export default function MilestoneListByProject({ id }) {
  console.log("🚀 ========= id1234:", id);
  const [milestoneList, setMilestoneList] = useState();

  const getAllMilestoneByClassId = async () => {
    try {
      const result = await getAllMilestoneById(id);
      console.log("🚀 ========= result1111:", result?.data);
      setMilestoneList(result?.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };

  useEffect(() => {
    getAllMilestoneByClassId();
  }, []);

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
