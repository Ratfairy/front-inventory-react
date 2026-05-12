import api from "../axios";

export const getAllItems = async () => {
  return await api.get("/item");
};

export const getItemById = async (id) => {
  return await api.get(`/item/${id}`);
};

export const createItem = async (data) => {
  return await api.post("/item", data);
};

export const updateItem = async (id, data) => {
  return await api.put(`/item/${id}`, data);
};

export const deleteItem = async (id) => {
  return await api.delete(`/item/${id}`);
};

export const getApprovedItemsByCategory = async (
  categoryId
) => {
  return await api.get(
    `/item/approved-by-category/${categoryId}`
  );
};

export const updateItemStatus = async (
  id,
  data
) => {
  return await api.patch(
    `/item/${id}/status`,
    data
  );
};