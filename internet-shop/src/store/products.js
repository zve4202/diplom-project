import { createSlice } from "@reduxjs/toolkit";

import Service from "../services/product.service";

// const initialSearch = {
//     category: null,
//     text: ""
// };

const initialState = {
    // search: { ...initialSearch },
    docs: [],
    totalDocs: 0,
    productLoading: true,
    productLoaded: false,
    error: null
};

const productsSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        requested(state) {
            state.productLoaded = false;
            state.productLoading = true;
        },
        resived(state, action) {
            const { docs, totalDocs } = action.payload;
            state.docs = docs;
            state.totalDocs = totalDocs;
            state.productLoading = false;
            state.productLoaded = true;
        },
        requestFailed(state, action) {
            state.productLoading = false;
            state.productLoaded = false;

            state.error = action.payload;
        }
    }
});

const { name, actions, reducer: productsReducer } = productsSlice;
const { resived, requested, requestFailed } = actions;

export const loadProducts = () => async (dispatch, getState) => {
    dispatch(requested());
    try {
        const { content } = await Service.fetchAll({
            paramsName: name
        });
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getProduct = (id) => (state) =>
    state.products.docs.find((item) => item._id === id);
export const getProducts = () => (state) => state.products;
export const getProductError = () => (state) => state.products.error;

export default productsReducer;
