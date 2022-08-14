import { createSlice } from "@reduxjs/toolkit";

import userService from "../services/user.service";

const initialState = {
    docs: [],
    totalDocs: 0,
    isLoading: true,
    error: null
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        requested(state) {
            state = { ...initialState };
        },
        resived(state, action) {
            const { docs, totalDocs } = action.payload;
            state.docs = docs;
            state.totalDocs = totalDocs;
            state.isLoading = false;
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        update(state, action) {
            const index = state.entities.findIndex(
                (item) => item.id === action.payload.id
            );
            state.entities[index] = {
                ...state.entities[index],
                ...action.payload
            };
        }
    }
});

const { name, actions, reducer: usersReducer } = usersSlice;

const { update, resived, requested, requestFailed } = actions;

export const loadUsers = () => async (dispatch, getState) => {
    dispatch(requested());
    try {
        const { content } = await userService.fetchAll({
            paramsName: name
        });
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const updateUser = (user) => async (dispatch, getState) => {
    dispatch(requested());
    try {
        const { content } = await userService.update(user._id, user);
        dispatch(update(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getUsers = () => (state) => state.users.docs;
export const getUser = (id) => (state) =>
    state.users.docs.find((doc) => doc._id === id);
export const getUsersLoading = () => (state) => state.users.isLoading;
export const getUsersError = () => (state) => state.users.error;

export default usersReducer;
