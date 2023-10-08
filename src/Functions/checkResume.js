import { doc, getFirestore, getDoc } from "firebase/firestore";

// Function to check if a user document exists in Firestore
export async function checkIfUserExists(userId) {
  try {
    const db = getFirestore();
    const resumeDoc = doc(db, "resume", userId);
    const docSnapshot = await getDoc(resumeDoc);
    return docSnapshot.exists();
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return false; // Return false in case of an error
  }
}
