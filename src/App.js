import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClassList from "./Pages/ClassList";
import Home from "./Pages/Home";
import "./App.css";
import CreateClass from "./Pages/CreateClass";
import SubjectList from "./Pages/SubjectList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/subjects" element={<SubjectList />}/>
        <Route path="/classList" element={<ClassList />}></Route>
        <Route path="/classList/create" element={<CreateClass />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
