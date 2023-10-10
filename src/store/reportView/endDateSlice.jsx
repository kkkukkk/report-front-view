import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialEndDate = moment().endOf("month");

const endDateSlice = createSlice({
    name: "endDate",
    initialState: {
        endDate: initialEndDate,
    },
    reducers: {
        setEndDate: (state, action) => {
            state.endDate = moment(action.payload);
        },
    },
})

export const { setEndDate } = endDateSlice.actions;
export default endDateSlice.reducer;