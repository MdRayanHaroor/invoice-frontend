import React, { useEffect, useState } from "react";
import { getInvoices } from "../api/invoices";

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getInvoices().then((res) => setInvoices(res.data));
  }, []);

  return (
    <ul>
      {invoices.map((inv) => (
        <li key={inv.id}>
          {inv.filename} - <a href={inv.blob_url} target="_blank" rel="noreferrer">View</a>
        </li>
      ))}
    </ul>
  );
}

export default InvoiceList;
