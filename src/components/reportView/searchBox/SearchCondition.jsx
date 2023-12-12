import React, { useState } from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setEndDate } from "../../../store/reportView/endDateSlice";
import { setStartDate } from "../../../store/reportView/startDateSlice";
import { setPlanEndDate } from "../../../store/reportView/planEndDateSlice";
import { setPlanStartDate } from "../../../store/reportView/planStartDateSlice";
import Calendar from 'react-calendar';
import '../../../css/Calendar.css';
import moment from "moment";
import ExcelSet from "../excelDownload/ExcelSet";
import ReportCheckBox from "./ReportCheckBox";
import Department from "./Department";
import { setReportCheck } from "../../../store/searchCondition/reportCheckSlice";
import { setPlanReportCheck } from "../../../store/searchCondition/planReportCheckSlice";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    width: 'fit-contents',
    timer: 1500,
    timerProgressBar: true,
})

const SearchCondition = ({ ...res }) => {
    const [searchOn, setSearchOn] = useState(false);
    const startDate = useSelector((state) => state.startDate);
    const endDate = useSelector((state) => state.endDate);
    const planStartDate = useSelector((state) => state.planStartDate);
    const planEndDate = useSelector((state) => state.planEndDate);
    const reportCheck = useSelector((state) => state.reportCheck);
    const planReportCheck = useSelector((state) => state.planReportCheck);

    const startDateString = startDate.startDate.format("YYYYMMDD");
    const endDateString = endDate.endDate.format("YYYYMMDD");
    const planStartDateString = planStartDate.planStartDate.format("YYYYMMDD");
    const planEndDateString = planEndDate.planEndDate.format("YYYYMMDD");

    const page = useSelector((state) => state.page).page;
    //...ing
    const dispatch = useDispatch();

    return (
        <StyledSearchCondition
            {...res}
        >
            <ChangeSearchCondition
                type={"button"}
                onClick={() => setSearchOn(searchOn => !searchOn)}
            >기간 선택</ChangeSearchCondition>
            {searchOn && <SearchBox>
                <div>
                    <DateBox>FROM : {page === 'report' ? startDate.startDate.format("YYYY-MM-DD") : planStartDate.planStartDate.format("YYYY-MM-DD")}</DateBox>
                    <Calendar
                        onChange={e => {
                            //setSearchOn(false);
                            if (parseInt(moment(e).format("YYYYMMDD")) > (page === 'report' ? parseInt(endDateString) : parseInt(planEndDateString))) {
                                Toast.fire({
                                    icon: "warning",
                                    title: "<div style='text-align:center; font-size:14px;'>시작일이 종료일을 초과합니다!</div>"
                                })
                            } else {
                                page === 'report'
                                    ? dispatch(setStartDate(e))
                                    : dispatch(setPlanStartDate(e))
                            }
                        }}
                        value={ page === 'report' ? startDate.startDate.toDate() : planStartDate.planStartDate.toDate()}
                        formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
                        calendarType={"gregory"}
                    />
                </div>
                <div>
                    <DateBox>TO : {page === 'report' ? endDate.endDate.format("YYYY-MM-DD") : planEndDate.planEndDate.format("YYYY-MM-DD")}</DateBox>
                    <Calendar
                        onChange={e => {
                            if (parseInt(moment(e).format("YYYYMMDD")) < (page === 'report' ? parseInt(startDateString) : parseInt(planStartDateString))) {
                                Toast.fire({
                                    icon: "warning",
                                    title: "<div style='text-align:center; font-size:14px;'>종료일이 시작일 미만입니다!</div>"
                                })
                            } else {
                                setSearchOn(false);
                                page === 'report'
                                    ? dispatch(setEndDate(e))
                                    : dispatch(setPlanEndDate(e))
                            }
                        }}
                        value={ page === 'report' ? endDate.endDate.toDate() : planEndDate.planEndDate.toDate()}
                        formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
                        calendarType={"gregory"}
                    />
                </div>
            </SearchBox>}
            <PresentSearchCondition>
                { page === 'report' ? startDate.startDate.format("YYYY년 MM월 DD일") : planStartDate.planStartDate.format("YYYY년 MM월 DD일")} ~ { page === 'report' ? endDate.endDate.format("YYYY년 MM월 DD일") : planEndDate.planEndDate.format("YYYY년 MM월 DD일") }
            </PresentSearchCondition>
            <Department />
            <ReportCheckBox
                id={"reportCheck"}
                text={"보고"}
                chainChecked={ page === 'report' ? reportCheck.reportCheck : planReportCheck.planReportCheck }
                onChange={() => {
                    page === 'report'
                        ? dispatch(setReportCheck(!reportCheck.reportCheck))
                        : dispatch(setPlanReportCheck(!planReportCheck.planReportCheck))
                }}
            />
            <ExcelSet />
        </StyledSearchCondition>
    );
};


const StyledSearchCondition = styled.div`
    position: relative;
    display: flex;
    grid-area: searchCondition;
    align-items: center;
    padding: 0 10px;
    //color: white;
    gap: 10px;
`;
const ChangeSearchCondition = styled.button`
    width: 10%;
    height: 30px;
    color: white;
    font-weight: bold;
    background: #ff4c4c;
`;

const SearchBox = styled.div`
    position: absolute;
    top: 38px;
    left: 10px;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    padding: 0 10px 10px;
    color: white;
    border-radius: 5px;
    background: #9c9c9c;
    box-shadow: rgba(0,0,0,.5) 1px 1px 3px;
    z-index: 1;
`;

const DateBox = styled.div`
    padding: 10px 0;
`;

const PresentSearchCondition = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

export default SearchCondition;