import api from "../axios";

export const getAllAdjustments = () => api.get("/adjustment");
export const getAdjustmentById = (id) => api.get(`/adjustment/${id}`);
export const createAdjustment = (data) => api.post("/adjustment", data);
export const updateAdjustmentStatus = (id, data) => api.patch(`/adjustment/${id}/status`, data);
export const deleteAdjustment = (id) => api.delete(`/adjustment/${id}`);