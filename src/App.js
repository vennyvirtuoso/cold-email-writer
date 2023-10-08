import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LOGOUT, UPLOAD_PDF, GENERATE } from "./routes/routes";
import Login from "./pages/Login/Login";
import Logout from "./components/Logout/Logout";
import UploadPDF from "./pages/UploadPDF/UploadPDF";
import EmailGenerator from "./pages/EmailGenerator/EmailGenerator";
function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path={LOGOUT} element={<Logout />} />
          <Route path={UPLOAD_PDF} element={<UploadPDF />} />
          <Route path={GENERATE} element={<EmailGenerator />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
