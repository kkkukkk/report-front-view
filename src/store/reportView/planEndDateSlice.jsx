import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialPlanEndDate = moment().endOf("month");

const planEndDateSlice = createSlice({
	name: "planEndDate",
	initialState: {
		planEndDate: initialPlanEndDate,
	},
	reducers: {
		setPlanEndDate: (state, action) => {
			//console.log(state.endDate.format("YYYY-MM-DD") === moment(action.payload).format("YYYY-MM-DD");
			state.planEndDate = moment(action.payload);
		},
	},
})

export const { setPlanEndDate } = planEndDateSlice.actions;
export default planEndDateSlice.reducer;