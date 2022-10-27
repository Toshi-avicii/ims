// import { configureStore } from '@reduxjs/toolkit';
// import authService from './services/authService';
// import authReducer from './reducers/authReducer';

// const store = configureStore({
//     reducer: {
//         [authService.reducerPath]: authService.reducer,
//         "authReducer": authReducer
//     }
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import authService from './services/authService';
import authReducer from './reducers/authReducer';
import leadService from './services/leadService';
import leadReducer from './reducers/leadReducer';
import counselorReducer from './reducers/counselorReducer';
import counselorService from './services/counselorService';
import globalReducer from "./reducers/globalReducer";

const store = configureStore({
    reducer: {
        [authService.reducerPath]: authService.reducer,
        [leadService.reducerPath]: leadService.reducer,
        [counselorService.reducerPath]: counselorService.reducer,
        "authReducer": authReducer,
        "leadReducer": leadReducer,
        "counselorReducer": counselorReducer,
        "appGlobalReducer": globalReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([leadService.middleware, counselorService.middleware])
    }
});

export default store;