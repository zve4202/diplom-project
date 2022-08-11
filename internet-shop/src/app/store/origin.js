import { createSlice } from "@reduxjs/toolkit";

import originService from "../services/origin.service";
import isOutdated from "../utils/isOutdated";

const initialState = { entities: [], isLoading: true, error: null };

const originSlice = createSlice({
    name: "origins",
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

const { actions, reducer: originsReducer } = originSlice;
const { resived, requested, requestFailed } = actions;

export const loadOrigins = () => async (dispatch, getState) => {
    const { lastFetch } = getState().origins;
    if (isOutdated(lastFetch)) {
        dispatch(requested());
        try {
            const { content } = await originService.fetchAll();
            dispatch(resived(content));
        } catch (error) {
            dispatch(requestFailed(error.message));
        }
    }
};

export const getOrigins = () => (state) => state.origins.entities;
export const getOrigin = (id) => (state) =>
    state.origins.entities.find((item) => item._id === id);
export const getOriginLoading = () => (state) => state.origins.isLoading;
export const getOriginError = () => (state) => state.origins.error;

export default originsReducer;
