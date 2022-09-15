import { createSlice } from "@reduxjs/toolkit";

import Service from "../services/order.service";

const initialState = {
    docs: [],
    docsItems: [],
    docsLoading: true,
    docsItemsLoading: false,
    error: null
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        requested(state) {
            state.docsLoading = true;
            state.error = null;
        },
        resived(state, action) {
            if (action.payload) {
                state.docs = [...action.payload];
            }
            state.docsLoading = false;
            state.saveInfo = null;
        },
        update(state, action) {
            const { docs } = state;
            const index = docs.findIndex(
                (doc) => doc._id === action.payload._id
            );
            if (index >= 0) {
                docs[index] = action.payload;
            }
            state.docs = { ...docs };
            state.docsLoading = false;
        },
        requestedItems(state) {
            state.docsItemsLoading = true;
            state.error = null;
        },
        itemsResived(state, action) {
            if (action.payload) {
                state.docsItems = [...action.payload];
            }
            state.docsItemsLoading = false;
        },
        requestFailed(state, action) {
            state.docsLoading = false;
            state.docsItemsLoading = false;
            state.error = action.payload;
        }
    }
});

const { actions, reducer: orderReducer } = orderSlice;
const {
    requested,
    resived,
    // update,
    requestedItems,
    itemsResived,
    requestFailed
} = actions;

// types = current, archive
export const loadOrder = (type) => async (dispatch) => {
    dispatch(requested());
    try {
        const { content } = await Service.get(type);
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const loadOrderItems = (type) => async (dispatch, getState) => {
    try {
        dispatch(requestedItems());
        const { content } = await Service.getItems(type);
        dispatch(itemsResived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getOrdersInfo = () => (state) => {
    return {
        docs: state.order.docs,
        docsItems: state.order.docsItems
    };
};

export const getOrderError = () => (state) => state.order.error;

export default orderReducer;
