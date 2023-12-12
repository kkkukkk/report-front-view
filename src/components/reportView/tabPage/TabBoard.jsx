import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import axios from "axios";
import ResolveList from "./ResolveList";
import Constants from "../../../Constants.json";
import FullModal from "./FullModal";

const TabBoard = ({ tab }) => {
    const [reportData, setReportData] = useState(null);
    const [keyDirection, setKeyDirection] = useState("asc");
    const [startDateDirection, setStartDateDirection] = useState("asc");
    const [endDateDirection, setEndDateDirection] = useState("asc");
    const [modalData, setModalData] = useState(null);
    const [fullModalOn, setFullModalOn] = useState(false);
    const [modalDataKey, setModalDataKey] = useState("");
    const startDate = useSelector((state) => state.startDate).startDate.format("yyyyMMDD");
    const endDate = useSelector((state) => state.endDate).endDate.format("yyyyMMDD");
    const reportCheck = useSelector((state) => state.reportCheck).reportCheck;
    const department = useSelector((state) => state.department);

    const planStartDate = useSelector((state) => state.planStartDate).planStartDate.format("yyyyMMDD");
    const planEndDate = useSelector((state) => state.planEndDate).planEndDate.format("yyyyMMDD");
    const planReportCheck = useSelector((state) => state.planReportCheck).planReportCheck;
    const planDepartment = useSelector((state) => state.planDepartment);

    const page = useSelector((state) => state.page).page;

    const sortByKey = (a, b) => (a.sys_date + a.serl_no) - (b.sys_date + b.serl_no);
    const sortByStartDate = (a,b) => a.str_date < b.str_date ? -1 : a.str_date > b.str_date ? 1 : 0;
    const sortByEndDate = (a,b) => a.end_date < b.end_date ? -1 : a.end_date > b.end_date ? 1 : 0;
    const sortByChargeUser = (a,b) => a.charge_man < b.charge_man ? -1 : a.charge_man > b.charge_man ? 1 : 0;

    const chooseSort = (way) => {
        switch (way) {
            case "key" : return sortByKey;
            case "chargeuser" : return sortByChargeUser;
            case "startdate" : return sortByStartDate;
            case "enddate" : return sortByEndDate;
            default: break;
        }
    }

    const handleSort = (way, direction) => {
        if (reportData === null) return;
        switch(direction) {
            case "asc" : setReportData([...reportData.sort(chooseSort(way))]);
                break;
            case "desc" : setReportData([...reportData.sort(chooseSort(way)).reverse()]);
                break;
            default: break;
        }
    }

    const handleTab = (tab) => {
        switch(tab) {
            case "result" : return 1;
            case "plan" : return 0;
            default: break;
        }
    }

    const handleFullModalOn = (value) => {
        setFullModalOn(value);
    }

    const handleModalDataKey = (value) => {
        setModalDataKey(value);
    }

    useEffect(() => {
        axios.get(Constants.apiUri + '/etc/job/workresult',{
            params: page === 'report'
                ? {
                    fromdate: startDate,
                    todate: endDate,
                    proid: handleTab(tab),
                    bogoid: reportCheck ? '1' : '%',
                    dept_code: department.department,
                }
                : {
                    fromdate: planStartDate,
                    todate: planEndDate,
                    proid: handleTab(tab),
                    bogoid: planReportCheck ? '1' : '%',
                    dept_code: planDepartment.planDepartment,
                }
        }).then( result => {
            if (result.data.msg) {
                setReportData(null);
            } else {
                //console.log(result.data);
                setReportData(result.data);
            }
        })
    }, [startDate, endDate, reportCheck, department, planStartDate, planEndDate, planReportCheck, planDepartment, page, tab]);

    useEffect(() => {
        axios.get(Constants.apiUri + '/etc/job/workresultlink',{
            params: {
                etcno: modalDataKey,
            }
        }).then(result => {
            if (result.data.msg) {
                setModalData(null);
            } else {
                console.log(result.data);
                setModalData(result.data);
            }
        })
    },[modalDataKey]);

    return (
        <StyledTabBoard>
            <StyledTitleRow>
                <div>회사</div>
                <div className={"double-row"}>
                    <div>구분</div>
                    <div>공수(*8h)</div>
                </div>
                <div>업무분류</div>
                <div onClick={() => {
                    handleSort("chargeuser", keyDirection)
                    setKeyDirection(keyDirection === "asc" ? "desc" : "asc")
                }}>담당자</div>
                <div className={"double-row"}>
                    <div>
                        <span onClick={() => {
                            handleSort("startdate", startDateDirection)
                            setStartDateDirection(startDateDirection === "asc" ? "desc" : "asc")
                        }}>시작</span>
                    </div>
                    <div>
                        <span onClick={() => {
                            handleSort("enddate", endDateDirection)
                            setEndDateDirection(endDateDirection === "asc" ? "desc" : "asc")
                        }}>종료</span>
                    </div>
                </div>
                <div>업무명</div>
                <div>요구사항</div>
                <div>업무내용</div>
            </StyledTitleRow>
            <ResolveList
                data={reportData}
                handleFullModalOn={handleFullModalOn}
                handleModalDataKey={handleModalDataKey}
            ></ResolveList>
            {fullModalOn && <FullModal
                data={modalData}
                handleFullModalOn={handleFullModalOn}
                modalData={modalData}
            ></FullModal>}
        </StyledTabBoard>
    );
};

const StyledTabBoard = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    background: white;
`
const StyledTitleRow = styled.div`
    display: flex;
    gap: 20px;
    padding: 5px 10px;
    font-weight: bold;
    background: #f6f6f6;
    text-align: center;
    
    .double-row {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    
    & > div:nth-child(1) { width: 6%; min-width: fit-content; }
    & > div:nth-child(2) { width: 4%; min-width: fit-content; }
    & > div:nth-child(3) { width: 4%; min-width: fit-content; }
    & > div:nth-child(4) { width: 4%; min-width: fit-content; cursor: pointer}
    & > div:nth-child(4):hover { text-decoration: underline }
    & > div:nth-child(5) { width: 5%; }
    & > div:nth-child(5) > span { cursor: pointer; }
    & > div:nth-child(5) > div > span:hover { text-decoration: underline; }
    & > div:nth-child(6) { width: 15%; }
    & > div:nth-child(7) { width: 24%; }
    & > div:nth-child(8) { width: 30%; }
`;

export default TabBoard;