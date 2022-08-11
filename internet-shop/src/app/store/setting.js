import { createSlice } from "@reduxjs/toolkit";

import { getValue, setValue } from "../services/localStorage.service";

const pagination = {
    pageSize: 50,
    currentPage: 1
};

const query = {};

const sort = {
    sort: "name",
    order: 1
};

const settingConfig = {
    admin: {
        selectedMenu: {
            path: "users",
            name: "ПОЛЬЗОВАТЕЛИ",
            icon: "bi-people-fill"
        }
    },
    product: {
        query: { ...query },
        pagination: { ...pagination },
        sort: { ...sort }
    },
    users: {
        query: { ...query },
        pagination: { ...pagination },
        sort: { ...sort },
        selectedMenu: "orders"
    },
    orders: {
        query: { ...query },
        pagination: { ...pagination },
        sort: { ...sort },
        selectedTab: "current"
    },

    basket: {
        sort: { ...sort }
    }
};
const initialState = {
    config: { ...settingConfig },
    isLoading: true,
    error: null
};

const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        requested(state) {
            state = { ...initialState };
        },
        resived(state, action) {
            state.config = action.payload;
            state.isLoading = false;
        },
        update(state, action) {
            const { name, data } = action.payload;
            const oldConfig = { ...state.config[name] };
            let config = { ...oldConfig, ...data };
            console.log(oldConfig, config);

            if (data.query) {
                const { query } = data;
                const { query: oldQuery, pagination } = oldConfig;
                console.log(query, oldQuery);

                if (JSON.stringify(query) !== JSON.stringify(oldQuery)) {
                    config = {
                        ...config,
                        pagination: { ...pagination, currentPage: 1 }
                    };
                }
            }
            state.config[name] = config;
            const key = String().concat(settingSlice.name, "-", name);

            setValue(key, JSON.stringify(config));
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { actions, reducer: settingReducer } = settingSlice;
const { resived, requested, update, requestFailed } = actions;

export const loadSetting = () => async (dispatch) => {
    dispatch(requested());
    try {
        const content = {};
        Object.keys(settingConfig).forEach((name) => {
            const key = String().concat(settingSlice.name, "-", name);
            let config = JSON.parse(getValue(key));
            if (!config) {
                config = settingConfig[name];
                setValue(key, JSON.stringify(config));
            }
            content[name] = config;
        });
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const updateSetting = (name, data) => async (dispatch) => {
    dispatch(update({ name, data }));
};

export const getConfig = () => (state) => state.setting.config;
export const getConfigByName = (name) => (state) => state.setting.config[name];

export default settingReducer;
