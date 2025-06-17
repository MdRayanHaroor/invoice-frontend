import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const uploadInvoice = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${BASE_URL}/upload-invoice`, formData);
};

export const getInvoices = async () => {
  return axios.get(`${BASE_URL}/invoices`);
};
