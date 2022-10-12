import { configureStore } from '@reduxjs/toolkit';
import authService from './services/authService';
import authReducer from './reducers/authReducer';
import leadService from './services/leadService';

const store = configureStore({
    reducer: {
        [authService.reducerPath]: authService.reducer,
        [leadService.reducerPath]: leadService.reducer,
        "authReducer": authReducer
    }
});

export default store;