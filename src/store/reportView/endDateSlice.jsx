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
            //console.log(state.endDate.format("YYYY-MM-DD") === moment(action.payload).format("YYYY-MM-DD");
            state.endDate = moment(action.payload);
        },
    },
})

export const { setEndDate } = endDateSlice.actions;
export default endDateSlice.reducer;