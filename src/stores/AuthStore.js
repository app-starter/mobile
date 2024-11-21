import { makeAutoObservable, runInAction } from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMyPermission } from "../data";

class AuthStore {
  isLogin = false;
  token = "";
  permissions = [];
  user = {};

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  async init() {
    await this.loadToken();
    await this.loadPermissions();
  }

  async isHaveTokenLogin() {
    const token = await AsyncStorage.getItem("token");
    return token !== null && token !== "";
  }

  async isHavePermission(permissionName) {
    const permissionList = await this.getPermissions();
    if (permissionList == null) {
      return false;
    }

    console.log("permissionList", permissionList.length);
    const isHaveAdmin = permissionList.some((x) => x == "ADMIN");

    console.log("isHaveAdmin", isHaveAdmin);
    const isHavePermission = permissionList.some(
      (x) => x == permissionName || x == "ADMIN"
    );

    console.log("isHavePermission", isHavePermission);
    return isHavePermission;
  }

  async setUser(token) {
    console.log("token", token)
    
    await AsyncStorage.setItem("token", token);
    runInAction(() => {
      this.token = token;
      this.isLogin = true;
    });
  }

  setProfile(user) {
    this.user = user;
    this.setPermissions(user.permissions);
    console.log("permissions", user.permissions);
  }

  async setPermissions(permissions) {
    await AsyncStorage.setItem("permissions", JSON.stringify(permissions));
    runInAction(() => {
      this.permissions = permissions;
    });
  }

  async getPermissions() {
    if (this.permissions.length === 0) {
      console.log("getMyPermission");
      const localPermission = await AsyncStorage.getItem("permissions");
      if (localPermission != null && localPermission != "") {
        runInAction(() => {
          this.permissions = JSON.parse(localPermission);
        });
      }
    }

    return this.permissions;
  }

  async logout() {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("permissions");
    runInAction(() => {
      this.reset();
    });
  }

  reset() {
    this.isLogin = false;
    this.token = "";
    this.permissions = [];
    this.user = {};
  }

  async loadToken() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      runInAction(() => {
        this.token = token;
        this.isLogin = true;
      });
    }
  }

  async loadPermissions() {
    const permissions = await AsyncStorage.getItem("permissions");
    if (permissions) {
      runInAction(() => {
        this.permissions = JSON.parse(permissions);
      });
    }
  }
}

export default new AuthStore();
