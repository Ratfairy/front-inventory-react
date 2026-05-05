import api from "../axios";

export const getAllReceiveGoods = () => api.get("/receivegoods");
export const getReceiveGoodsById = (id) => api.get(`/receivegoods/${id}`);
export const confirmReceive = (id, data) => api.post(`/receivegoods/${id}/confirm`, data);