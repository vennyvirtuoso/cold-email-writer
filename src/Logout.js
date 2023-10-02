import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig";

function Logout() {
  const navigate = useNavigate(); // Get the navigate function

  signOut(auth)
    .then(() => {
      navigate("/"); // Use the navigate function to redirect after logout
    })
    .catch((err) => {
      console.error("Logout error: ", err);
    });
}

export default Logout;
