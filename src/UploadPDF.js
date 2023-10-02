import React from "react";

// Define a function to handle the click event
const handleLogoutClick = () => {
  // Call the Logout component or perform any other desired action
  // In this example, we're just redirecting to the "/logout" route
  window.location.href = "/logout";
};

function UploadPDF() {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    // Here, you can handle the uploaded file, e.g., send it to a server or process it in some way.
    console.log("Uploaded file:", file.name);
  };

  return (
    <div>
      <h1 onClick={handleLogoutClick}>Logout</h1>
      <h1>Upload PDF</h1>
      <p>Choose a PDF file to upload:</p>
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
    </div>
  );
}

export default UploadPDF;
