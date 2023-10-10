import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import axios from "axios";
import ResolveList from "./ResolveList";

const StyledTabBoard = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  background: white;
`
const StyledTitleRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 5px;
  padding: 5px 10px;
  font-weight: bold;
  background: #f6f6f6;
  text-align: center;
  
  & > div:nth-child(1) { width: 6%; min-width: fit-content; }
  & > div:nth-child(2) { width: 3%; min-width: fit-content; }
  & > div:nth-child(3) { width: 4%; min-width: fit-content; }
  & > div:nth-child(4) { width: 4%; min-width: fit-content; cursor: pointer}
  & > div:nth-child(4):hover { text-decoration: underline }
  & > div:nth-child(5) { width: 5%; }
  & > div:nth-child(5) > span { cursor: pointer; }
  & > div:nth-child(5) > span:hover { text-decoration: underline; }
  & > div:nth-child(6) { width: 15%; }
  & > div:nth-child(7) { width: 24%; }
  & > div:nth-child(8) { width: 30%; }
`;

const TabBoard = ({ tab }) => {
    const [reportData, setReportData] = useState(null);
    const [keyDirection, setIKeyDirection] = useState("asc");
    const [startDateDirection, setStartDateDirection] = useState("asc");
    const [endDateDirection, setEndDateDirection] = useState("asc");
    const startDate = useSelector((state) => state.startDate).startDate.format("yyyyMMDD");
    const endDate = useSelector((state) => state.endDate).endDate.format("yyyyMMDD");

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

    useEffect(() => {
        axios.get('https://always.samhwa.com/api/etc/job/workresult',{
                params: {
                    fromdate: startDate,
                    todate: endDate,
                    proid: handleTab(tab),
                    bogoid: 1
                }
            },
        ).then( result => {
            if (result.data.msg) {
                setReportData(null);
            } else {
                setReportData(result.data);
            }
        })
    }, [startDate, endDate, tab]);

    return (
        <StyledTabBoard>
            <StyledTitleRow>
                <div>회사</div>
                <div>구분</div>
                <div>업무분류</div>
                <div onClick={() => {
                    handleSort("chargeuser", keyDirection)
                    setIKeyDirection(keyDirection === "asc" ? "desc" : "asc")
                }}>담당자</div>
                <div>
                    <span onClick={() => {
                        handleSort("startdate", startDateDirection)
                        setStartDateDirection(startDateDirection === "asc" ? "desc" : "asc")
                    }}>시작 </span>
                    /
                    <span onClick={() => {
                        handleSort("enddate", endDateDirection)
                        setEndDateDirection(endDateDirection === "asc" ? "desc" : "asc")
                    }}> 종료</span>
                </div>
                <div>업무명</div>
                <div>요구사항</div>
                <div>업무내용</div>
            </StyledTitleRow>
            <ResolveList
                data={reportData}
            ></ResolveList>
        </StyledTabBoard>
    );
};

export default TabBoard;