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
    isLoading: true,
    error: null
};

const productsSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        requested(state) {
            state.isLoading = true;
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
        }
    }
});

const { name, actions, reducer: productsReducer } = productsSlice;
const { resived, requested, requestFailed } = actions;

// export const loadProducts = () => async (dispatch, getState) => {
//     dispatch(requested());
//     try {
//         const { pagination, query, sort } = getState().setting.config[name];

//         let params = {};
//         Object.keys(query).forEach((key) => {
//             const value = query[key];
//             if (value) {
//                 params[key] = value;
//             }
//         });

//         params = {
//             ...params,
//             page: pagination.currentPage,
//             limit: pagination.pageSize,
//             ...sort
//         };

//         const { content } = await Service.fetchAll(params);
//         dispatch(resived(content));
//     } catch (error) {
//         dispatch(requestFailed(error.message));
//     }
// };

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

// export const getProducts = () => (state) => state.products.docs;
export const getProduct = (id) => (state) =>
    state.products.docs.find((item) => item._id === id);
export const getProductLoading = () => (state) => state.products.isLoading;
export const getProductError = () => (state) => state.products.error;

export default productsReducer;
