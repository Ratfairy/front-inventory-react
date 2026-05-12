import api from "../axios";

export const getAllCategories = async () => {
  return await api.get("/category");
};

export const getCategoryById = async (id) => {
  return await api.get(`/category/${id}`);
};

export const createCategory = async (data) => {
  return await api.post("/category", data);
};

export const updateCategory = async (id, data) => {
  return await api.put(`/category/${id}`, data);
};

export const deleteCategory = async (id) => {
  return await api.delete(`/category/${id}`);
};