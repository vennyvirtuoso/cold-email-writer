import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../configs/FirebaseConfig";
import "./emailGenerator.css";
import "firebase/auth";

function EmailGenerator() {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
  }, []);

  const generateEmail = () => {
    if (companyName && role && userEmail) {
      setIsLoading(true); // Set loading to true when starting the request

      const email = `${role.replace(/\s/g, "")}.${companyName.replace(
        /\s/g,
        ""
      )}`;

      // setGeneratedEmail(email);

      axios
        .post("https://example.com/api/your-endpoint", {
          role,
          companyName,
          userEmail,
        })
        .then((response) => {
          console.log("POST request successful:", response.data);
          setGeneratedEmail(response.data.generatedEmail);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false regardless of success or failure
        });
    } else {
      setGeneratedEmail("");
    }
  };

  const handleLogoutClick = () => {
    auth
      .signOut()
      .then(() => {
        window.location.href = "/logout";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
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
        <button
          className="generate-button"
          onClick={generateEmail}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate"}
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
