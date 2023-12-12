import {createSlice} from "@reduxjs/toolkit";

const initialPlanDepartment = '%';

const planDepartmentSlice = createSlice({
	name: "planDepartment",
	initialState: {
		planDepartment: initialPlanDepartment,
	},
	reducers: {
		setPlanDepartment: (state, action) => {
			state.planDepartment = action.payload;
		},
	},
});

export const { setPlanDepartment } = planDepartmentSlice.actions;
export default planDepartmentSlice.reducer;