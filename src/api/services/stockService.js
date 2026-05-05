import api from "../axios";

// STOCK
export const getAllStocks = () => api.get("/stock");
export const getStockById = (id) => api.get(`/stock/${id}`);
export const createStock = (data) => api.post("/stock", data);
export const updateStock = (id, data) => api.put(`/stock/${id}`, data);
export const deleteStock = (id) => api.delete(`/stock/${id}`);

// STOCK MOVEMENT
export const getAllMovements = () => api.get("/stock/movement");
export const getMovementsByStockId = (stockId) => api.get(`/stock/${stockId}/movement`);
export const createMovement = (data) => api.post("/stock/movement", data);