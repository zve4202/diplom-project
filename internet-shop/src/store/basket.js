import { createSlice } from "@reduxjs/toolkit";
import { getDeliveryBy } from "../components/page/basketPage/applyForm/deliveries";

import Service from "../services/basket.service";
import history from "../utils/history";

const initialState = {
    data: {
        _id: null,
        userId: null,
        status: null,
        deliveryInfo: null,
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
            if (action.payload) {
                const totals = calcTotals(action.payload);
                state.data = { ...action.payload, ...totals };
            }
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
            const products = [];
            const totals = { totalQty: 0, totalPrice: 0 };
            state.data = { ...state.data, docs, products, ...totals };
            state.docsLoading = false;
        },
        updateInfo(state, action) {
            state.data.deliveryInfo = action.payload;
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
    updateInfo,
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

export const updateDlvInfo = (deliveryInfo) => async (dispatch, getState) => {
    dispatch(updateInfo(deliveryInfo));
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
    const { data } = getState().basket;
    try {
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

export const checkBasket = () => async (dispatch, getState) => {
    const { data } = getState().basket;
    const authUser = getState().auth.authUser;
    if (!authUser) {
        history.push({
            pathname: "/login",
            state: {
                from: {
                    pathname: "/basket/check"
                }
            }
        });
        return;
    }

    const basketData = { ...data, userId: authUser._id };
    try {
        dispatch(requested());
        const { content } = await Service.check(basketData);
        dispatch(resived(content));
        dispatch(loadBasket());
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const applyBasket = () => async (dispatch, getState) => {
    const { data } = getState().basket;
    const authUser = getState().auth.authUser;
    if (!authUser) {
        history.push({
            pathname: "/login",
            state: {
                from: {
                    pathname: "/basket/apply"
                }
            }
        });
        return;
    }
    const basketData = { ...data, userId: authUser._id };

    try {
        dispatch(requested());
        const { content } = await Service.apply(basketData);
        dispatch(resived(content));
        dispatch(loadBasket());
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const payOrder = (sumOfPay) => async (dispatch, getState) => {
    const authUser = getState().auth.authUser;
    if (!authUser) {
        history.push({
            pathname: "/login",
            state: {
                from: {
                    pathname: "/basket/topay"
                }
            }
        });
        return;
    }
    const { data } = getState().basket;

    const basketData = { ...data, sumOfPay, userId: authUser._id };

    try {
        dispatch(requested());
        const { content } = await Service.topay(basketData);
        dispatch(resived(content));
        setTimeout(() => dispatch(loadBasket()), [5000]);
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const disassemble = () => async (dispatch, getState) => {
    const authUser = getState().auth.authUser;
    if (!authUser) {
        history.push({
            pathname: "/login",
            state: {
                from: {
                    pathname: "/basket/topay"
                }
            }
        });
        return;
    }
    const { data } = getState().basket;

    try {
        dispatch(requested());
        const { content } = await Service.disassemble(data);
        dispatch(resived(content));
        setTimeout(() => () => dispatch(loadBasket()), [5000]);
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
export const getTotals = () => (state) => {
    const { deliveryInfo, totalQty, totalPrice } = state.basket.data;
    if (!deliveryInfo) {
        return {
            totalQty,
            totalPrice,
            deliveryPrice: 0,
            fullPrice: 0
        };
    }

    const { delivery } = deliveryInfo;
    const { deliveryPrice } = getDeliveryBy(delivery);
    return {
        totalQty,
        totalPrice,
        deliveryPrice,
        fullPrice: totalPrice + deliveryPrice
    };
};

export const getBasketError = () => (state) => state.basket.error;

export default basketReducer;
