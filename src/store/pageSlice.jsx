import { createSlice } from "@reduxjs/toolkit";

const initialPage = "report";

const pageSlice = createSlice({
	name: "page",
	initialState: {
		page: initialPage,
	},
	reducers: {
		setPage: (state, action) => {
			state.page = action.payload;
		},
	},
})

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;