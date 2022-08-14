import { createSlice } from "@reduxjs/toolkit";

import labelService from "../services/label.service";
import isOutdated from "../utils/isOutdated";

const initialState = {
    entities: [],
    isLoading: true,
    error: null
};

const labelSlice = createSlice({
    name: "labels",
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

const { actions, reducer: labelsReducer } = labelSlice;
const { resived, requested, requestFailed } = actions;

export const loadLabels = () => async (dispatch, getState) => {
    const { lastFetch } = getState().labels;
    if (isOutdated(lastFetch)) {
        dispatch(requested());
        try {
            const { content } = await labelService.fetchAll();
            dispatch(resived(content));
        } catch (error) {
            dispatch(requestFailed(error.message));
        }
    }
};

export const getLabels = () => (state) => state.labels.entities;
export const getLabel = (id) => (state) =>
    state.labels.entities.find((item) => item._id === id);
export const getLabelLoading = () => (state) => state.labels.isLoading;
export const getLabelError = () => (state) => state.labels.error;

export default labelsReducer;
