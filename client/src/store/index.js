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

const store = configureStore({
    reducer: {
        [authService.reducerPath]: authService.reducer,
        "authReducer": authReducer
    }
});

export default store;