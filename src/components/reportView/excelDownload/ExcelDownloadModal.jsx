import React, {useState} from 'react';
import styled from "styled-components";
import CheckFrac from "./CheckFrac";
import {useSelector} from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import excelUtil from "../../../util/excelDownload";
import Constants from "../../../Constants.json";

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    width: 'fit-contents',
    timer: 1500,
    timerProgressBar: true,
})

const ExcelDownloadModal = ({handleModalOn}) => {
    const [reportData, setReportData] = useState(null);
    const [planData, setPlanData] = useState(null);
    const [checkReport, setCheckReport] = useState(false);
    const [checkPlan, setCheckPlan] = useState(false);

    const startDate = useSelector((state) => state.startDate).startDate.format("yyyyMMDD");
    const endDate = useSelector((state) => state.endDate).endDate.format("yyyyMMDD");
    const startMonth = useSelector((state) => state.startDate).startDate.format("M");
    //const endMonth = useSelector((state) => state.endDate).endDate.format("M");
    const reportCheck = useSelector((state) => state.reportCheck);
    const department = useSelector((state) => state.department);

    const planStartDate = useSelector((state) => state.planStartDate).planStartDate.format("yyyyMMDD");
    const planEndDate = useSelector((state) => state.planEndDate).planEndDate.format("yyyyMMDD");
    //const planStartMonth = useSelector((state) => state.planStartDate).planStartDate.format("M");
    //const planEndMonth = useSelector((state) => state.planEndDate).planEndDate.format("M");
    const planReportCheck = useSelector((state) => state.planReportCheck);
    const planDepartment = useSelector((state) => state.planDepartment);

    const handleData = (type) => {
        switch (type) {
            case "plan":
                if (!checkPlan) {
                    setCheckPlan(true);
                    axios.get(Constants.apiUri + '/etc/job/workresult',{
                            params: {
                                fromdate: planStartDate,
                                todate: planEndDate,
                                proid: 0,
                                bogoid: planReportCheck.planReportCheck ? '1' : '%',
                                dept_code: planDepartment.planDepartment,
                            }
                        },
                    ).then( result => {
                        if (result.data.msg) {
                            setPlanData(null);
                            setCheckPlan(false);
                            Toast.fire({
                                icon: "warning",
                                title: "<div style='text-align:center; font-size:18px;'>해당 기간 동안</div><div style='text-align:center; font-size:18px;'>조회된 계획 데이터가 없습니다.</div>"
                            })
                        } else {
                            setPlanData(result.data);
                        }
                    })
                } else {
                    setCheckPlan(false);
                    setPlanData(null);
                }
                break;
            case "result":
                if (!checkReport) {
                    setCheckReport(true);
                    axios.get(Constants.apiUri + '/etc/job/workresult',{
                            params: {
                                fromdate: startDate,
                                todate: endDate,
                                proid: 1,
                                bogoid: reportCheck.reportCheck ? '1' : '%',
                                dept_code: department.department,
                            }
                        },
                    ).then( result => {
                        if (result.data.msg) {
                            setCheckReport(false);
                            setReportData(null);
                            Toast.fire({
                                icon: "warning",
                                title: "<div style='text-align:center; font-size:18px;'>해당 기간 동안</div><div style='text-align:center; font-size:18px;'>조회된 실적 데이터가 없습니다.</div>"
                            })
                        } else {
                            setReportData(result.data);
                        }
                    });
                } else {
                    setCheckReport(false);
                    setReportData(null);
                }
                break;
            default:
                break;
        }
    }

    const excelDownload = () => {
        if (!checkReport && !checkPlan) {
            Toast.fire({
                icon: "warning",
                title: "<div style='text-align:center; font-size:18px;'>다운 받을 항목을</div><div style='text-align:center; font-size:18px;'>선택해주세요</div>"
            })
        } else {
            const tmp = {
                reportData,
                planData
            };
            //const monthString = startMonth === endMonth ? startMonth : startMonth + "-" + endMonth;
            excelUtil.excelDownload(tmp, startMonth);
            handleModalOn(false);
        }
    }



    return (
        <StyledExcelDownloadModal>
            <CheckTitle>선택</CheckTitle>
            <CheckSet>
                <CheckFrac
                    className={checkReport ? "on" : ""}
                    onClick={() => handleData("result")}
                >실적</CheckFrac>
                <CheckFrac
                    className={checkPlan ? "on" : ""}
                    onClick={() => handleData("plan")}
                >계획</CheckFrac>
            </CheckSet>
            <DownloadButton
                onClick={excelDownload}
            >다운로드</DownloadButton>
        </StyledExcelDownloadModal>
    );
};

const StyledExcelDownloadModal = styled.div`
    position: absolute;
    top: 38px;
    width: 280px;
    height: 180px;
    padding: 20px;
    color: black;
    border-radius: 5px;
    box-shadow: rgba(0,0,0,.5) 1px 1px 3px;
    background: white;
    
    display: grid;
    grid-template-areas:
    "title"
    "checkset"
    "downbutton";
    grid-template-rows: 15% 50% 30%;
    grid-row-gap: 2px;
`;

const CheckTitle = styled.div`
    grid-area: title;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: bold;
`;
const CheckSet = styled.div`
    grid-area: checkset;
    display: flex;
    gap: 2px;
`;
const DownloadButton = styled.button`
    grid-area: downbutton;
    color: white;
    font-weight: bold;
    border: 2px solid forestgreen;
    background: forestgreen;
    &:hover {
        background: #2f7d2f;
    }
`;
export default ExcelDownloadModal;