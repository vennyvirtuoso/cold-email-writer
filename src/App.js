import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import UploadPDF from "./UploadPDF";
import Logout from "./Logout";

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/upload-pdf" element={<UploadPDF />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
