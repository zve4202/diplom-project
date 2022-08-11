import { createSlice } from "@reduxjs/toolkit";

import roleService from "../services/role.service";
import isOutdated from "../utils/isOutdated";

const initialState = {
    entities: [],
    isLoading: true,
    error: null
};

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        requested(state) {
            state = initialState;
        },
        resived(state, action) {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { actions, reducer: rolesReducer } = rolesSlice;
const { resived, requested, requestFailed } = actions;

export const loadRoles = () => async (dispatch, getState) => {
    const { lastFetch } = getState().roles;
    if (isOutdated(lastFetch)) {
        dispatch(requested());
        try {
            const { content } = await roleService.fetchAll();
            dispatch(resived(content));
        } catch (error) {
            dispatch(requestFailed(error.message));
        }
    }
};

export const getRoles = () => (state) => state.roles.entities;
export const getRole = (id) => (state) =>
    state.roles.entities.find((role) => role._id === id);
export const getRolesLoading = () => (state) => state.roles.isLoading;
export const getRolesError = () => (state) => state.roles.error;

export default rolesReducer;
