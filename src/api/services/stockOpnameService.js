import api from "../axios";

export const getAllOpnames = () => api.get("/stockopname");
export const getOpnameById = (id) => api.get(`/stockopname/${id}`);
export const createOpname = (data) => api.post("/stockopname", data);
export const updateOpnameStatus = (id, data) => api.patch(`/stockopname/${id}/status`, data);
export const deleteOpname = (id) => api.delete(`/stockopname/${id}`);