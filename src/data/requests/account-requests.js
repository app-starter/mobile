import api from "../api";

const login = (data) => {
  return api.getApiWithoutToken().post(api.getBaseUrl() + "login", data);
};
const register = (data) => {
  return api.getApiWithoutToken().post(api.getBaseUrl() + "register", data);
};

const changePassword = (data) => {
  return api.getApi().post(api.getBaseUrl() + "change-password", data);
};
const getProfile = () => {
  return api.getApi().get(api.getBaseUrl() + "profile");
};

const updateProfile = (data) => {
  return api.getApi().put(api.getBaseUrl() + "profile", data);
};
const forgotPassword = (data) => {
  return api
    .getApiWithoutToken()
    .post(api.getBaseUrl() + "forgot-password", data);
};

export {
  login,
  register,
  changePassword,
  getProfile,
  updateProfile,
  forgotPassword,
};
