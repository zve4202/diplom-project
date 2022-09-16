import axios from "axios";
// import logger from "./log.service";
import configFile from "../config.json";
import { toast } from "react-toastify";
import {
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    setTokens,
    getValue
} from "./localStorage.service";
import authService from "./auth.service";

const http = axios.create({ baseURL: configFile.apiEndpoint });

const checkParams = ({ params }) => {
    if (params && params.paramsName) {
        try {
            const { paramsName } = params;
            delete params.paramsName;
            const key = String.prototype.concat("setting-", paramsName);
            const { pagination, query, sort } = JSON.parse(getValue(key));
            const newParams = {
                page: pagination.currentPage,
                limit: pagination.pageSize,
                ...sort,
                ...params
            };

            const queryArr = Object.keys(query);
            const testKey = "artist";
            if (queryArr.includes(testKey)) {
                const value = query[testKey];
                if (value) {
                    newParams[testKey] = value;
                }
            } else {
                queryArr.forEach((key) => {
                    if (key !== "show") {
                        const value = query[key];
                        if (value) {
                            newParams[key] = value;
                        }
                    }
                });
            }
            return newParams;
        } catch (error) {
            console.log({ error: error.message });
        }
    }

    return params;
};

http.interceptors.request.use(
    async function (config) {
        if (config.params) {
            config.params = checkParams(config);
        }
        if (config.url.endsWith("/")) {
            config.url = config.url.slice(0, -1);
        }
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            const expiresDate = getTokenExpiresDate();
            if (expiresDate < Date.now()) {
                const data = await authService.refresh(refreshToken);

                if (data) {
                    setTokens(data);
                }
            }
        }
        const token = getAccessToken();
        if (token) {
            config.headers = {
                ...config.headers,
                authorization: `Bearer ${token}`
            };
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (res) => {
        return res;
    },
    function (error) {
        const { response } = error;
        const expectedErrors =
            response && response.status >= 400 && response.status < 500;

        switch (response.status) {
            case 401:
                toast.info("Войдите в систему!!!");
                break;
            case 409:
                toast.warning(response.data.message);
                break;
            default:
                if (!expectedErrors) {
                    toast.error(response.message);
                }
                break;
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    patch: http.patch,
    delete: http.delete
};
export default httpService;
