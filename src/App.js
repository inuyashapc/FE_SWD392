import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ClassList from "./Pages/ClassList";
import Home from "./Pages/Home";
import CreateClass from "./Pages/CreateClass";
import SubjectList from "./Pages/SubjectList";
import ClassDetail from "./Pages/ClassDetail";
import IssueList from "./Pages/Issues/IssueList.js";
import NewIssue from "./Pages/Issues/NewIssue.js";
import IssueDetail from "./Pages/Issues/IssueDetail.js"
import UpdateBatch from "./Pages/Issues/UpdateBatch.js"
import MilestoneList from "./Pages/MilestoneList";
import MilestoneDetail from "./Pages/MilestoneDetail";
import CreateMilestone from "./Pages/Milestones/CreateMilestone";
import SignIn from "./Pages/Login/SignIn.jsx";
import SignUp from "./Pages/Register/SignUp.jsx";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import IssueSetting from "./Pages/IssueSetting.jsx";
import Project from "./Pages/ProjectList"
import CreateProject from "./Pages/CreateProject";
import ProjectMemberList from "./Pages/ProjectMemberList";
import SystemSettingList from "./Pages/SystemSettingList"
import UpdateProject from "./Pages/UpdateProject.js";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/subjects" element={<SubjectList />} />
        <Route path="/issueSetting" element={<IssueSetting />} />
        <Route path="/classList" element={<ClassList />}></Route>
        <Route path="/classList/create" element={<CreateClass />}></Route>
        <Route path="/classList/:id" element={<ClassDetail />}></Route>
        <Route path="/issue" element={<IssueList />}></Route>
        <Route path="/issue/create" element={<NewIssue />}></Route>
        <Route path="/issue/:id" element={<IssueDetail />}></Route>
        <Route path="/issue/edit/:id" element={<UpdateBatch />}></Route>
        <Route path="/milestoneList" element={<MilestoneList />}></Route>
        <Route path="/milestoneList/:id" element={<MilestoneDetail />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route
          path="/milestoneList/create"
          element={<CreateMilestone />}
        ></Route>
        <Route path="/milestoneList/:id" element={<MilestoneList />}></Route>
        
        <Route path="/projectList" element={<Project />}></Route>
        <Route path="/projectList/create" element={<CreateProject />}></Route>
        <Route path="/projectList/members" element={<ProjectMemberList />}></Route>
        <Route path="/projectList/update" element={<UpdateProject />}></Route>
        <Route path="/systemSetting" element={<SystemSettingList />}></Route>

      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
