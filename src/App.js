import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import UploadPDF from "./UploadPDF";
import Logout from "./Logout";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/upload-pdf/:userId" element={<UploadPDF />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
