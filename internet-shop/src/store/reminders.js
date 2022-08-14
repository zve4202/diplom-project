import { createSlice } from "@reduxjs/toolkit";

import Service from "../services/reminder.service";
import isOutdated from "../utils/isOutdated";

// docs = ["1","2" ...]
const initialState = {
    docs: [],
    isLoading: true,
    error: null
};

const basketSlice = createSlice({
    name: "reminder",
    initialState,
    reducers: {
        requested(state) {
            state.isLoading = true;
            state.error = null;
        },
        resived(state, action) {
            state.docs = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        update(state, action) {
            const { titleId } = action.payload;
            const index = state.docs.findIndex(
                (doc) => doc.titleId === titleId
            );
            if (index < 0) {
                state.docs.push(action.payload);
            } else {
                state.docs[index] = action.payload;
            }
            state.isLoading = false;
        },
        remove(state, action) {
            const docs = state.docs.filter(
                (item) => item.titleId !== action.payload
            );
            state.docs = docs;
            console.log("remove state.docs ", state.docs);
            state.isLoading = false;
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { actions, reducer: remindersReducer } = basketSlice;
const { update, remove, resived, requested, requestFailed } = actions;

export const loadReminders = () => async (dispatch, getState) => {
    const { lastFetch, docs } = getState().reminder;
    const { currentUser } = getState().auth;
    const needRefresh = isOutdated(lastFetch) || docs.length === 0;

    if (currentUser && needRefresh) {
        dispatch(requested());
        try {
            const { content } = await Service.fetchAll();
            dispatch(resived(content));
        } catch (error) {
            dispatch(requestFailed(error.message));
        }
    }
};

export const updateReminder = (payload) => async (dispatch, getState) => {
    dispatch(requested());
    try {
        const { content } = await Service.update(payload.titleId, payload);
        dispatch(update(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const addReminder = (payload) => async (dispatch, getState) => {
    dispatch(requested());
    try {
        const { content } = await Service.create(payload);
        dispatch(update(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const removeReminder = (id) => async (dispatch, getState) => {
    dispatch(requested());
    try {
        await Service.delete(id);
        dispatch(remove(id));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const clearReminders = () => async (dispatch, getState) => {
    dispatch(requested());
    try {
        await Service.deleteAll();
        dispatch(resived([]));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getReminders = () => (state) => state.reminder.docs;
export const getReminder = (id) => (state) => {
    return state.reminder.docs.find((item) => item.titleId === id);
};

export const getReminderLoading = () => (state) => state.reminder.isLoading;
export const getReminderError = () => (state) => state.reminder.error;

export default remindersReducer;
