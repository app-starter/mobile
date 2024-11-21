import api from "../api";

export const getUsers = (data) => {
  return api.getApi().get(api.getBaseUrl() + "users");
};
export const getUser = (id) => {
  return api.getApi().get(api.getBaseUrl() + "users/" + id);
};
export const createUser = (data) => {
  return api.getApi().post(api.getBaseUrl() + "users", data);
};

export const updateUser = (id, data) => {
  console.log("data", id);
  return api.getApi().put(api.getBaseUrl() + "users/" + id, data);
};
export const getProfile = () => {
  return api.getApi().get(api.getBaseUrl() + "profile");
};

export const deleteUser = (id) => {
  return api.getApi().delete(api.getBaseUrl() + "users/" + id);
};
