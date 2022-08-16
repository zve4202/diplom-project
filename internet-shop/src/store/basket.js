import { createSlice } from "@reduxjs/toolkit";

import Service from "../services/basket.service";

const initialState = {
    data: {
        _id: null,
        userId: null,
        docs: [],
        products: [],
        totalQty: 0,
        totalPrice: 0
    },

    docsLoading: true,
    productsLoading: false,
    error: null
};

const calcTotals = ({ docs }) => {
    const totals = { totalQty: 0, totalPrice: 0 };
    docs.forEach((item) => {
        const { qty, price } = item;
        totals.totalQty += qty;
        totals.totalPrice += qty * price;
    });
    return totals;
};

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        requested(state) {
            state.docsLoading = true;
            state.error = null;
        },
        resived(state, action) {
            const totals = calcTotals(action.payload);
            state.data = { ...action.payload, ...totals };
            state.docsLoading = false;
        },
        requestedItems(state) {
            state.productsLoading = true;
            state.error = null;
        },
        itemsResived(state, action) {
            state.data.products = action.payload;
            state.productsLoading = false;
        },
        update(state, action) {
            const { docs } = state.data;
            const index = docs.findIndex(
                (doc) => doc._id === action.payload._id
            );
            if (index < 0) {
                docs.push(action.payload);
            } else {
                docs[index] = action.payload;
            }
            const totals = calcTotals({ docs });
            state.data = { ...state.data, docs, ...totals };
            state.docsLoading = false;
        },
        remove(state, action) {
            const { docs, products } = state.data;
            const newdocs = docs.filter(
                (item) => item.product !== action.payload
            );
            const newprods = products.filter(
                (item) => item.product._id !== action.payload
            );
            const totals = calcTotals({ docs: newdocs });
            state.data = {
                ...state.data,
                docs: newdocs,
                products: newprods,
                ...totals
            };
            state.docsLoading = false;
        },
        clear(state, action) {
            const docs = [];
            const totals = { totalQty: 0, totalPrice: 0 };
            state.data = { ...state.data, docs, ...totals };
            state.docsLoading = false;
        },
        requestFailed(state, action) {
            state.docsLoading = false;
            state.error = action.payload;
        }
    }
});

const { actions, reducer: basketReducer } = basketSlice;
const {
    update,
    remove,
    clear,
    resived,
    requestedItems,
    itemsResived,
    requested,
    requestFailed
} = actions;

export const loadBasket = () => async (dispatch) => {
    dispatch(requested());
    try {
        const { content } = await Service.get();
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const loadBasketItems = (id) => async (dispatch, getState) => {
    dispatch(requestedItems());
    try {
        const { content } = await Service.getItems(id);
        dispatch(itemsResived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const updateBasket = (payload) => async (dispatch, getState) => {
    try {
        const { _id, docs } = getState().basket.data;

        const doc = docs.find((doc) => doc.product === payload._id);
        dispatch(requested());
        if (doc) {
            const { content } = await Service.update({
                ...doc,
                qty: payload.qty,
                price: payload.price
            });
            console.log("add basket old content", content);
            dispatch(update(content));
        } else {
            const { content } = await Service.update({
                orderId: _id,
                product: payload._id,
                qty: payload.qty,
                price: payload.price
            });

            dispatch(update(content));
        }
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const clearBasket = () => async (dispatch, getState) => {
    dispatch(requested());
    try {
        const { data } = getState().basket;
        dispatch(requested());
        const { content } = await Service.deleteAll(data._id);
        dispatch(clear(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const removeBasket = (id) => async (dispatch, getState) => {
    dispatch(requested());
    try {
        const { docs } = getState().basket.data;
        const doc = docs.find((item) => item.product === id);
        dispatch(remove(id));
        await Service.delete(doc._id);
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const removeBasketItem = (id) => async (dispatch, getState) => {
    dispatch(requested());
    try {
        const { docs } = getState().basket.data;
        const doc = docs.find((item) => item.product === id);
        dispatch(remove(id));
        await Service.delete(doc._id);
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getBasket = () => (state) => state.basket.data;
export const getBasketQty = (id) => (state) => {
    const { docs } = state.basket.data;
    if (docs) {
        const doc = docs.find((item) => item.product === id);
        if (doc) return doc.qty;
    }
    return null;
};

export const getBasketError = () => (state) => state.basket.error;

export default basketReducer;
