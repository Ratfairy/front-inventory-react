import api from "../axios";

export const getAllPRs = () => api.get("/purchaserequest");
export const getPRById = (id) => api.get(`/purchaserequest/${id}`);
export const createPR = (data) => api.post("/purchaserequest", data);
export const updatePR = (id, data) => api.put(`/purchaserequest/${id}`, data);
export const updatePRStatus = (id, data) => api.patch(`/purchaserequest/${id}/status`, data);
export const deletePR = (id) => api.delete(`/purchaserequest/${id}`);