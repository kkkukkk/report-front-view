import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialPlanStartDate = moment().startOf("month");

const planStartDateSlice = createSlice({
	name: "planStartDate",
	initialState: {
		planStartDate: initialPlanStartDate,
	},
	reducers: {
		setPlanStartDate: (state, action) => {
			//console.log(state.endDate.format("YYYY-MM-DD") === moment(action.payload).format("YYYY-MM-DD");
			state.planStartDate = moment(action.payload);
		},
	},
})

export const { setPlanStartDate } = planStartDateSlice.actions;
export default planStartDateSlice.reducer;