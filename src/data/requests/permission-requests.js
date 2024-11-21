import api from "../api";

export const getMyPermission = (data) => {
  return api.getApi().get(api.getBaseUrl() + "getMyPermission");
};


export const getPermissions = (data) => {
  return api.getApi().get(api.getBaseUrl() + "permissions");
};
