import React, { useState } from "react";
import { uploadInvoice } from "../api/invoices";

function UploadForm() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Choose a file!");
    try {
      await uploadInvoice(file);
      alert("Uploaded successfully");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload Invoice</button>
    </form>
  );
}

export default UploadForm;
