import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../configs/FirebaseConfig";
import { checkIfUserExists } from "../../Functions/checkResume";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userId = user.uid;
      const userExists = await checkIfUserExists(userId);

      if (userExists) {
        // User exists in Firestore, navigate to the "generate-email" page
        navigate("/generate-email");
      } else {
        // User doesn't exist in Firestore, navigate to the "upload-pdf" page
        navigate(`/upload-pdf/${userId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <div className="heading-box">
        <h1 className="page-title">Cold Crafter</h1>
      </div>
      <div className="login-wrapper">
        <div className="login-box">
          <button
            className="login-btn btn-danger btn-md"
            onClick={handleGoogleSignIn}
          >
            Sign In With Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
