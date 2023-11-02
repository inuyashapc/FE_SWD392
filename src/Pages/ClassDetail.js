import React from "react";
import { Tabs } from "antd";
import FormUpdate from "./Milestones/FormUpdate.js";
import { useParams } from "react-router-dom";
import MilestoneListByProject from "./Milestones/MilestoneListByproject.js";

export default function ClassDetail() {
  const { id } = useParams();
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "General",
      children: <FormUpdate id={id} />,
    },
    {
      key: "2",
      label: "Student",
      children: "Content of students",
    },
    {
      key: "3",
      label: "Milestone",
      children: <MilestoneListByProject id={id} />,
    },
    {
      key: "4",
      label: "Setting",
      children: "Content of setting",
    },
  ];
  return (
    <div className="container">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}
