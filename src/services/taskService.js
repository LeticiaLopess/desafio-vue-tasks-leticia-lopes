import api from "../api/api";

export const getAll = () => api.get("/tasks");
export const create = (task) => api.post("/tasks", task);
export const update = (id, updates) => api.put(`/tasks/${id}`, updates);
export const remove = (id) => api.delete(`/tasks/${id}`);