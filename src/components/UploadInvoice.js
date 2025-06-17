// src/pages/UploadInvoice.js
import React, { useState } from 'react';
import api from '../api/axios';

export default function UploadInvoice() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    await api.post('/upload-invoice', formData);
    alert('Uploaded!');
  };

  return (
    <div>
      <h2>Upload Invoice</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Submit</button>
    </div>
  );
}
