import React from "react";
import { auth, provider } from "./FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // Define the handleGoogleSignIn function outside of useEffect
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userId = user.uid;
        navigate(`/upload-pdf/${userId}`);
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
