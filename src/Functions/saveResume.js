import { doc, getFirestore, setDoc } from "firebase/firestore";
export function saveresume(Text, userId) {
  if (Text != null && userId) {
    const db = getFirestore();
    const resumeDoc = doc(db, "resume", userId);

    setDoc(resumeDoc, {
      text: Text,
    })
      .then(() => {
        console.log("Text saved to Firebase Firestore");
      })
      .catch((error) => {
        console.error("Error saving text to Firebase Firestore:", error);
      });
  }
}
