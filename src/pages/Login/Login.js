import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../configs/FirebaseConfig";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
import "./Login.css";
import { checkIfUserExists } from "../../Functions/checkResume";

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
  );
}

export default Login;
