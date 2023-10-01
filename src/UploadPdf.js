// UploadPdf.js
import React, { useState } from "react";

function UploadPdf() {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const handleUpload = () => {
    // Here, you can implement the logic to upload the PDF to Firebase Storage or perform any other required operations.
    // You can use Firebase Storage for file uploads.
    // Example: Upload to Firebase Storage
    // const storageRef = ref(storage, "pdfs/" + pdfFile.name);
    // uploadBytes(storageRef, pdfFile).then(() => {
    //   console.log("File uploaded successfully!");
    // });
    // You'll need to import the necessary Firebase Storage functions.
  };

  return (
    <div className="wrapper">
      <div className="box">
        <h3>Upload PDF</h3>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload PDF</button>
      </div>
    </div>
  );
}

export default UploadPdf;
