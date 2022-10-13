import { createSlice } from '@reduxjs/toolkit';

const counselorSlice = createSlice({
    name: 'counselorInfo',
    initialState: {
        counselorCount: 0
    },
    reducers: {
        fetchCounselorData: (state, action) => {
            state.counselorCount = action.payload.counselorCount;
        }
    }
});

export const { fetchCounselorData } = counselorSlice.actions;
export default counselorSlice.reducer;