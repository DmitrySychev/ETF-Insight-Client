import http from "./http.common";

const getAll = () => {
  return http.get("/etfs");
};

const get = id => {
  return http.get(`/etfs/${id}`);
};

const create = data => {
  return http.post("/etfs", data);
};

const update = (id, data) => {
  return http.put(`/etfs/${id}`, data);
};

const remove = id => {
  return http.delete(`/etfs/${id}`);
};

const removeAll = () => {
  return http.delete(`/etfs`);
};

const findBySymbol = symbol => {
  return http.get(`/etfs?symbol=${symbol}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findBySymbol
};