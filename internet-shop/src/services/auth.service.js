import axios from "axios";
import httpService from "./http.service";

import configFile from "../config.json";

const httpAuth = axios.create({
    baseURL: configFile.apiEndpoint + "auth/"
});

const AuthService = {
    signUp: async (content) => {
        const { data } = await httpAuth.post("signUp", content);
        return data;
    },
    signIn: async (content) => {
        const { data } = await httpAuth.post("signIn", content);
        return data;
    },
    refresh: async (refreshToken) => {
        const { data } = await httpAuth.post("token", {
            refreshToken
        });
        return data;
    },
    getAuthUser: async () => {
        const { data } = await httpService.get("user/auth");
        return data;
    }
};
export default AuthService;
