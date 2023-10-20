import {createSlice} from "@reduxjs/toolkit";

const initialDepartment = '%';

const departmentSlice = createSlice({
    name: "department",
    initialState: {
        department: initialDepartment,
    },
    reducers: {
        setDepartment: (state, action) => {
            state.department = action.payload;
        },
    },
});

export const { setDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;