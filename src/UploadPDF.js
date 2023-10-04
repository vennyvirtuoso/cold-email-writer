import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { db } from "./FirebaseConfig";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const handleLogoutClick = () => {
  window.location.href = "/logout";
};

function UploadPDF() {
  const { userId } = useParams();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfText, setPdfText] = useState("");

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    console.log(userId);
    try {
      const text = await extractTextFromPDF(file);
      console.log(text);

      setPdfText(text);
      // saveresume();
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
    }
  };

  const extractTextFromPDF = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;

        pdfjs.getDocument(arrayBuffer).promise.then((pdf) => {
          const textArray = [];
          for (let page = 1; page <= pdf.numPages; page++) {
            pdf.getPage(page).then((pdfPage) => {
              pdfPage.getTextContent().then((textContent) => {
                textArray.push(
                  textContent.items.map((item) => item.str).join(" ")
                );
                if (page === pdf.numPages) {
                  const text = textArray.join("\n");
                  resolve(text);
                }
              });
            });
          }
        });
      };
      reader.readAsArrayBuffer(file);
    });
  };

  //   return (
  //     <div>
  //       <h1 onClick={handleLogoutClick}>Logout</h1>
  //       <h1>Upload PDF</h1>
  //       <p>Choose a PDF file to upload:</p>
  //       <input type="file" accept=".pdf" onChange={handleFileUpload} />
  //     </div>
  //   );
  // }

  // export default UploadPDF;

  //testing
  // save resume is not working currectly so handlefileupload is giving error
  function saveresume() {
    console.log("hello");
    if (pdfText != null) {
      db.collection("resume")
        .doc(userId)
        .set({
          text: pdfText,
        })
        .then(() => {
          console.log("Text saved to Firebase Firestore");
        })
        .catch((error) => {
          console.error("Error saving text to Firebase Firestore:", error);
        });
    }
  }
  return (
    <div>
      <h1>Upload PDF</h1>
      <p>Choose a PDF file to upload:</p>
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
    </div>
  );
}
export default UploadPDF;
