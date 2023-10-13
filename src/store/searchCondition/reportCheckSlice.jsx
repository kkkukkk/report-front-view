import {createSlice} from "@reduxjs/toolkit";

const initialReportCheck = true;

const reportCheckSlice = createSlice({
    name: "reportCheck",
    initialState: {
        reportCheck: initialReportCheck,
    },
    reducers: {
        setReportCheck: (state, action) => {
            state.reportCheck = action.payload;
        },
    },
});

export const { setReportCheck } = reportCheckSlice.actions;
export default reportCheckSlice.reducer;