import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../configs/FirebaseConfig";

function Logout() {
  const navigate = useNavigate();

  signOut(auth)
    .then(() => {
      navigate("/");
    })
    .catch((err) => {
      console.error("Logout error: ", err);
    });
}

export default Logout;
