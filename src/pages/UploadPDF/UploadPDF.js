import React, { useState } from "react";
import { pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";
import { saveresume } from "../../Functions/saveResume";
import { useNavigate } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
function UploadPDF() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    console.log(userId);
    try {
      const text = await extractTextFromPDF(file);
      console.log(text);
      try {
        await saveresume(text, userId);
        navigate("/generate-email");
      } catch (error) {
        console.error("Error saving resume:", error);
      }
      // saveresume(text, userId);
      // navigate("/generate-email");
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

  return (
    <div>
      <h1>Upload PDF</h1>
      <p>Choose a PDF file to upload:</p>
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
    </div>
  );
}
export default UploadPDF;
