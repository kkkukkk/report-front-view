import { configureStore } from "@reduxjs/toolkit";
import startDateSlice from "./reportView/startDateSlice";
import endDateSlice from "./reportView/endDateSlice";
import reportCheckSlice from "./searchCondition/reportCheckSlice";
import departmentSlice from "./searchCondition/departmentSlice";

import planStartDateSlice from "./reportView/planStartDateSlice";
import planEndDateSlice from "./reportView/planEndDateSlice";
import planReportCheckSlice from "./searchCondition/planReportCheckSlice";
import planDepartmentSlice from "./searchCondition/planDepartmentSlice";

import pageSlice from "./pageSlice";

const store = configureStore({
    reducer: {
        startDate: startDateSlice,
        endDate: endDateSlice,
        reportCheck: reportCheckSlice,
        department: departmentSlice,
        planStartDate: planStartDateSlice,
        planEndDate: planEndDateSlice,
        planReportCheck: planReportCheckSlice,
        planDepartment: planDepartmentSlice,
        page: pageSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store;