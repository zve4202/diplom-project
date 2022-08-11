import { createSlice } from "@reduxjs/toolkit";

import Service from "../services/auth.service";
import {
    getAccessToken,
    removeAuthData,
    setTokens
} from "../services/localStorage.service";

const initialState = {
    currentUser: null,
    isAdmin: false,
    isLoading: true,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        requested(state) {
            state = initialState;
        },
        resived(state, action) {
            state.currentUser = action.payload;
            state.isAdmin =
                state.currentUser && state.currentUser.role === "admin";
            state.isLoading = false;
        },
        requestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        update(state, action) {
            state.currentUser = action.payload;
        }
    }
});

const { actions, reducer: authReducer } = authSlice;
const { update, resived, requested, requestFailed } = actions;

export const loadAuthUser = () => async (dispatch) => {
    dispatch(requested());
    const token = getAccessToken();
    if (token) {
        try {
            const { content } = await Service.getAuthUser();
            dispatch(resived(content));
        } catch (error) {
            dispatch(requestFailed(error.message));
        }
    } else {
        dispatch(resived(null));
    }
};

export const signIn =
    ({ email, password }) =>
    async (dispatch, getState) => {
        dispatch(requested());
        try {
            const data = await Service.signIn({
                email,
                password
            });
            setTokens(data);
            dispatch(resived(data.content));
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                switch (message) {
                    case "EMAIL_NOT_FOUND":
                    case "INVALID_PASSWORD":
                        dispatch(
                            requestFailed(
                                "Email или пароль введены некорректно"
                            )
                        );
                        break;
                    default:
                        dispatch(
                            requestFailed(
                                "Слишком много попыток входа. Попробуйте позже"
                            )
                        );
                        break;
                }
            } else dispatch(requestFailed(message));
        }
    };

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch, getState) => {
        dispatch(requested());
        try {
            const data = await Service.signUp({
                email,
                password,
                ...rest
            });
            setTokens(data);
            dispatch(resived(data.content));
        } catch (error) {
            const { code, message } = error.response.data.error || error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    dispatch(
                        requestFailed(
                            "Пользователь с таким Email уже существует"
                        )
                    );
                }
            } else dispatch(requestFailed(message));
        }
    };

export const signOut = () => (dispatch, getState) => {
    removeAuthData();
    dispatch(update(null));
};

export const getAuth = () => (state) => ({
    currentUser: state.auth.currentUser,
    isAdmin: state.auth.isAdmin
});
export const getAuthLoading = () => (state) => state.auth.isLoading;
export const getAuthError = () => (state) => state.auth.error;

export default authReducer;
