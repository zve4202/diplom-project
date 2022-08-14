import { createSlice } from "@reduxjs/toolkit";

import categoryService from "../services/category.service";
import isOutdated from "../utils/isOutdated";

const initialState = { entities: [], isLoading: true, error: null };

const categorySlice = createSlice({
    name: "categories",
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

const { actions, reducer: categoriesReducer } = categorySlice;
const { resived, requested, requestFailed } = actions;

export const loadCategories = () => async (dispatch, getState) => {
    const { lastFetch } = getState().categories;
    if (isOutdated(lastFetch)) {
        dispatch(requested());
        try {
            const { content } = await categoryService.fetchAll();
            dispatch(resived(content));
        } catch (error) {
            dispatch(requestFailed(error.message));
        }
    }
};

export const getCategories = () => (state) => state.categories.entities;
export const getCategory = (id) => (state) =>
    state.categories.entities.find((role) => role._id === id);
export const getCategoryLoading = () => (state) => state.categories.isLoading;
export const getCategoryError = () => (state) => state.categories.error;

export default categoriesReducer;
