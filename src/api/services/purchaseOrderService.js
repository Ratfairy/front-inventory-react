import api from "../axios";

export const getAllPOs = () => api.get("/purchaseorder");
export const getPOById = (id) => api.get(`/purchaseorder/${id}`);
export const getApprovedPRsForPO = () => api.get("/purchaseorder/approved-prs");
export const createPO = (data) => api.post("/purchaseorder", data);
export const updatePO = (id, data) => api.put(`/purchaseorder/${id}`, data);
export const updatePOStatus = (id, data) => api.patch(`/purchaseorder/${id}/status`, data);
export const deletePO = (id) => api.delete(`/purchaseorder/${id}`);