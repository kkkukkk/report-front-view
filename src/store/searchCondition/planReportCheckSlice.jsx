import {createSlice} from "@reduxjs/toolkit";

const initialPlanReportCheck = true;

const planReportCheckSlice = createSlice({
	name: "planReportCheck",
	initialState: {
		planReportCheck: initialPlanReportCheck,
	},
	reducers: {
		setPlanReportCheck: (state, action) => {
			state.planReportCheck = action.payload;
		},
	},
});

export const { setPlanReportCheck } = planReportCheckSlice.actions;
export default planReportCheckSlice.reducer;