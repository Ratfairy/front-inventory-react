import api from "../axios";

export const getAllInvoices = () => api.get("/invoice");
export const getInvoiceById = (id) => api.get(`/invoice/${id}`);
export const getReceivedPOsForInvoice = () => api.get("/invoice/received-pos");
export const createInvoice = (data) => api.post("/invoice", data);
export const updateInvoiceStatus = (id, data) => api.patch(`/invoice/${id}/status`, data);
export const deleteInvoice = (id) => api.delete(`/invoice/${id}`);