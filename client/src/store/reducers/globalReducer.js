import { createSlice } from "@reduxjs/toolkit";

const globalReducer = createSlice({
    name: "globalReducer",
    initialState: {
        alertLoading: false,
        alertSuccess: false,
        alertFailure: false
    },
    reducers: {
        sendSuccessAlert: (state, action) => {
            state.alertSuccess = true;
            state.alertFailure = false;
            state.alertLoading = false;
        },
        sendFailureAlert: (state, action) => {
            state.alertSuccess = false;
            state.alertFailure = true;
            state.alertLoading = false;
        },
        sendLoadingAlert: (state, action) => {
            state.alertLoading = true;
            state.alertSuccess = false;
            state.alertFailure = false;
        } 
    }
});

export const { sendFailureAlert, sendSuccessAlert, sendLoadingAlert } = globalReducer.actions;
export default globalReducer.reducer;