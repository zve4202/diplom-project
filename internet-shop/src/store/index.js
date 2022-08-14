import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth";
import categoriesReducer from "./categories";
import formatsReducer from "./formats";
import logger from "./middleware/logger";
import productsReducer from "./products";
import rolesReducer from "./roles";
import settingReducer from "./setting";
import basketReducer from "./basket";
import usersReducer from "./users";
import labelsReducer from "./labels";
import originsReducer from "./origin";
import stylesReducer from "./style";
import remindersReducer from "./reminders";

const rootReducer = combineReducers({
    auth: authReducer,
    roles: rolesReducer,
    users: usersReducer,
    categories: categoriesReducer,
    formats: formatsReducer,
    labels: labelsReducer,
    origins: originsReducer,
    styles: stylesReducer,
    products: productsReducer,
    setting: settingReducer,
    basket: basketReducer,
    reminder: remindersReducer
});

function createStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== "production"
    });
}

export default createStore;
