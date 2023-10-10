import { configureStore } from "@reduxjs/toolkit";
import startDateSlice from "./reportView/startDateSlice";
import endDateSlice from "./reportView/endDateSlice";

const store = configureStore({
    reducer: {
        startDate: startDateSlice,
        endDate: endDateSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store;