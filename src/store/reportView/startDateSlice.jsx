import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialStartDate = moment().startOf("month");

const startDateSlice = createSlice({
    name: "fromDate",
    initialState: {
        startDate: initialStartDate,
    },
    reducers: {
        setStartDate: (state, action) => {
            state.startDate = moment(action.payload);
        },
    },
});

export const { setStartDate } = startDateSlice.actions;
export default startDateSlice.reducer;