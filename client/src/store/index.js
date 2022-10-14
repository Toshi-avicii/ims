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

const store = configureStore({
    reducer: {
        [authService.reducerPath]: authService.reducer,
        [leadService.reducerPath]: leadService.reducer,
        [counselorService.reducerPath]: counselorService.reducer,
        "authReducer": authReducer,
        "leadReducer": leadReducer,
        "counselorReducer": counselorReducer
    }
});

export default store;