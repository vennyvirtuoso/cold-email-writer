import React, { useState } from "react";
import { pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";
import { saveresume } from "../../Functions/saveResume";
import { useNavigate } from "react-router-dom";
import "./UploadPDF.css"; // Create this file
import { useEffect } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function UploadPDF() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  useEffect(() => {
    // Remove opacity for subsequent renders
    const container = document.querySelector(".upload-pdf-container");
    container.style.opacity = 1;
  }, []);
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    try {
      const text = await extractTextFromPDF(file);

      try {
        // Use saveresume function to append the new resume
        await saveresume(text, userId);
        navigate("/generate-email");
      } catch (error) {
        console.error("Error saving resume:", error);
      }
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
    <div className="upload-pdf-container">
      <h1>Upload PDF</h1>
      <p>Choose a PDF file to upload:</p>
      <label htmlFor="file" className="custom-file-upload">
        Browse
      </label>
      <input type="file" id="file" accept=".pdf" onChange={handleFileUpload} />
    </div>
  );
}

export default UploadPDF;
