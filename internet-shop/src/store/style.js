import { createSlice } from "@reduxjs/toolkit";

import styleService from "../services/style.service";
import isOutdated from "../utils/isOutdated";

const initialState = { entities: [], isLoading: true, error: null };

const styleSlice = createSlice({
    name: "styles",
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

const { actions, reducer: stylesReducer } = styleSlice;
const { resived, requested, requestFailed } = actions;

export const loadStyles = () => async (dispatch, getState) => {
    const { lastFetch } = getState().styles;
    if (isOutdated(lastFetch)) {
        dispatch(requested());
        try {
            const { content } = await styleService.fetchAll();
            dispatch(resived(content));
        } catch (error) {
            dispatch(requestFailed(error.message));
        }
    }
};

export const getStyles = () => (state) => state.styles.entities;
export const getStyle = (id) => (state) =>
    state.styles.entities.find((item) => item._id === id);
export const getStyleLoading = () => (state) => state.styles.isLoading;
export const getStyleError = () => (state) => state.styles.error;

export default stylesReducer;
