import { createSlice } from "@reduxjs/toolkit";

import userService from "../services/user.service";

const initialState = {
    docs: [],
    totalDocs: 0,
    isLoading: true,
    isUpdated: false,
    error: null
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        requested(state) {
            state.isLoading = true;
            state.isUpdated = false;
            state.error = null;
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
            const index = state.docs.findIndex(
                (item) => item.id === action.payload.id
            );
            state.docs[index] = {
                ...state.docs[index],
                ...action.payload
            };
            state.isUpdated = true;
        },
        removeUpdated(state, action) {
            state.isUpdated = false;
        }
    }
});

const { name, actions, reducer: usersReducer } = usersSlice;

const { update, resived, requested, requestFailed, removeUpdated } = actions;

export const loadUsers = (id) => async (dispatch, getState) => {
    dispatch(requested());
    try {
        const { content } = await userService.fetchAll({
            paramsName: name
        });

        if (id) {
            const user = content.docs.find((doc) => doc._id === id);
            if (!user) {
                const { content: user } = await userService.get(id);
                if (user) {
                    content.docs.push(user);
                    content.totalDocs += 1;
                }
            }
        }
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
        setTimeout(() => {
            dispatch(removeUpdated());
        }, 1500);
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getUsers = () => (state) => state.users.docs;
export const getUser = (id) => (state) => {
    return state.users.docs.find((doc) => doc._id === id);
};

export const getUsersState = () => (state) => {
    const { isLoading, isUpdated, error } = state.users;
    return { isLoading, isUpdated, error };
};

export const getUsersLoading = () => (state) => state.users.isLoading;
export const getUsersError = () => (state) => state.users.error;

export default usersReducer;
