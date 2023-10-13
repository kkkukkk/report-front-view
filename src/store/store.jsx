import { configureStore } from "@reduxjs/toolkit";
import startDateSlice from "./reportView/startDateSlice";
import endDateSlice from "./reportView/endDateSlice";
import reportCheckSlice from "./searchCondition/reportCheckSlice";

const store = configureStore({
    reducer: {
        startDate: startDateSlice,
        endDate: endDateSlice,
        reportCheck: reportCheckSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store;