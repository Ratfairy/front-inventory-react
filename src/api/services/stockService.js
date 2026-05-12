import api from "../axios";

export const getAllStocks = async () => {
  return await api.get("/stock");
};

export const getStockById = async (id) => {
  return await api.get(`/stock/${id}`);
};

export const createStock = async (data) => {
  return await api.post("/stock", data);
};

export const updateStock = async (id, data) => {
  return await api.put(`/stock/${id}`, data);
};

export const deleteStock = async (id) => {
  return await api.delete(`/stock/${id}`);
};

export const getAllMovements = async () => {
  return await api.get("/stock/movement");
};

export const createMovement = async (data) => {
  return await api.post("/stock/movement", data);
};