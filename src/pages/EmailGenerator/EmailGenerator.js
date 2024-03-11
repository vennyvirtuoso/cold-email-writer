import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../configs/FirebaseConfig"; // Update the path accordingly
import "./emailGenerator.css";
import "firebase/auth";

function EmailGenerator() {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Check if a user is already authenticated
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
  }, []);

  const generateEmail = () => {
    if (companyName && role && userEmail) {
      const email = `${role.replace(/\s/g, "")}.${companyName.replace(
        /\s/g,
        ""
      )}@exam.result-container`;
      setGeneratedEmail(email);

      // debugging
      // console.log("Role:", role);
      // console.log("Company Name:", companyName);

      // Make a POST request to the server endpoint with the actual user ID
      axios
        .post("https://example.com/api/your-endpoint", {
          role,
          companyName,
          userEmail, // Send the authenticated user's email
        })
        .then((response) => {
          console.log("POST request successful:", response.data);

          // Handle the response data here
          // For example, you can set some state or perform additional actions

          // Set the generated email or perform any other actions based on the response
          setGeneratedEmail(response.data.generatedEmail);

          // Handle any success actions here
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
          // Handle errors here
        });
    } else {
      setGeneratedEmail("");
    }
  };

  const handleLogoutClick = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        window.location.href = "/logout";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        // Handle errors here
      });
  };

  return (
    <div className="email-generator-container">
      <header>
        <div>
          <h1>Email Generator</h1>
        </div>

        <button onClick={handleLogoutClick}>Logout</button>
      </header>
      <main>
        <div className="input-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <button className="generate-button" onClick={generateEmail}>
          Generate
        </button>
        {generatedEmail && (
          <div className="result-container">
            <h2>Generated Email:</h2>
            <p>{generatedEmail}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default EmailGenerator;
