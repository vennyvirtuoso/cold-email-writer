import React, { useState } from "react";

function EmailGenerator() {
  const [companyName, setCompanyName] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");

  const generateEmail = () => {
    // Simple email generation logic
    if (companyName) {
      const email = `${companyName.replace(/\s/g, "")}@example.com`;
      setGeneratedEmail(email);
    } else {
      setGeneratedEmail("");
    }
  };
  const handleLogoutClick = () => {
    window.location.href = "/logout";
  };
  return (
    <div>
      <button onClick={handleLogoutClick}>Logout</button>
      <h1>Email Generator</h1>
      <div>
        <label htmlFor="companyName">Company Name:</label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <div>
        <button onClick={generateEmail}>Generate</button>
      </div>
      {generatedEmail && (
        <div>
          <h2>Generated Email:</h2>
          <p>{generatedEmail}</p>
        </div>
      )}
    </div>
  );
}

export default EmailGenerator;
