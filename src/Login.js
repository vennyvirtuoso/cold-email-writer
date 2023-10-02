import React, { useState } from "react";
import { auth, provider } from "./FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Login({ setToken }) {
  const navigate = useNavigate(); // Get history from the hook

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userId = user.uid;
        setToken(userId); // Set the token (userId) in the parent component
        navigate("/upload-pdf"); // Redirect to the "Upload PDF" page after successful login
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="wrapper">
      <div className="box">
        <button className="btn btn-danger btn-md" onClick={handleGoogleSignIn}>
          Sign In With Google
        </button>
      </div>
    </div>
  );
}

export default Login;
