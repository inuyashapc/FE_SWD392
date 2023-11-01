import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubjectList from "./Pages/SubjectList.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubjectList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
