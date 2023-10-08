import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../configs/FirebaseConfig";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
import "./Login.css";
import { checkIfUserExists } from "../../Functions/checkResume";
function Login() {
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
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
