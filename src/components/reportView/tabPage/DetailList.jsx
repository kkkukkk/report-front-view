import React, { useEffect, useState } from 'react';
import axios from  "axios";
import styled from "styled-components";
import NoData from "./NoData";

const DetailList = ({ data }) => {
    const [detailList, setDetailList] = useState(null);

    useEffect(()=>{
        axios.get('https://always.samhwa.com/api/etc/job/workdetail',{
            params: {
                sysdate: data.sys_date,
                serlno: data.serl_no
            }
        }).then((result) => {
            if (result.data.msg) {
                setDetailList(null);
            } else {
                console.log(result.data);
                setDetailList(result.data);
            }
        });
    }, [data]);

    const solveDetail = () => {
        if (detailList) {
            return detailList.map((item, index) => (
                <StyledDetailFrac key={index}>
                    <div className={"info-box"}>
                        <div>
                            <div>순번</div>
                            <div>{index + 1}</div>
                        </div>
                        <div>
                            <div>구분</div>
                            <div>{item.top_name}</div>
                        </div>
                        <div>
                            <div>작업</div>
                            <div>{item.mid_name}</div>
                        </div>
                        <div>
                            <div>종류</div>
                            <div>{item.work_id_name}</div>
                        </div>
                        <div>
                            <div>공수(*8h)</div>
                            <div>{item.work_day}</div>
                        </div>
                    </div>
                    <div className={"content-box"}>
                        <div>
                            <div>내역</div>
                            <div>{item.work_desc}</div>
                        </div>
                        <div>
                            <div>상세내역</div>
                            <div>{item.work_desc_dtl}</div>
                        </div>
                    </div>
                </StyledDetailFrac>
            ))
        } else {
            return <NoData>작업 내역 없음.</NoData>
        }
    }

    const formatDate = (date) => {
        return date.substring(0,4) + "년 " + date.substring(4,6) + "월 " + date.substring(6,8) + "일"
    }

    return (
        <StyledDetailList>
            <div className={"detail-title"}><span className={"status"}>{data.pro_nm}</span>{data.work_title}</div>
            <div className={"detail-key-number"}>번호 : {data.sys_date}-{data.serl_no}</div>
            <div className={"detail-date"}>기간 : {formatDate(data.str_date.toString())} ~ {formatDate(data.end_date.toString())}</div>
            <div className={"detail-request-reason"}><div>사유 :</div><div className={"request-description"}>{data.work_req_desc}</div></div>
            <div className={"detail-result"}>
                <div className={"detail-work-list-title"}>※ 업무 내용</div>
                {data.work_result}
            </div>
            <StyledDetailBoard>
                <div className={"detail-work-list-title"}>※ 작업 내역</div>
                { solveDetail(detailList) }
            </StyledDetailBoard>
        </StyledDetailList>
    );
};

const StyledDetailList = styled.div`
    margin-bottom: 5px;
    padding: 10px 10px 15px 10px;
    background: #ececec;
    border-radius: 5px;
    max-height: 60vh;
    overflow-y: scroll;
    border-bottom: 1px solid rgba(0,0,0,.3);
    
    .detail-title {
        display: flex;
        align-items: center;
        padding: 5px 0 0 0;
        font-weight: bold;
        margin-bottom: 5px;
        
        .status {
            padding: 2px 5px;
            margin-right: 10px;
            border: 1px solid rgba(0,0,0,.3);
            border-radius: 5px;
            background: #ffffff;
        }
    }

    .detail-date {
        margin-bottom: 5px;
    }

    .detail-request-reason {
        margin-bottom: 5px;
        word-break: keep-all;
        .request-description {
            padding: 5px 0px;
        }
    }

    .detail-result {
        padding: 10px;
        margin-bottom: 5px;
        line-height: 24px;
        word-break: keep-all;
        background: white;
        border: 1px solid rgba(0,0,0,.3);
    }

    .detail-key-number {
        margin-bottom: 5px;
    }

    .detail-work-list-title {
        font-weight: bold;
        padding: 3px 0;
    }
`;

const StyledDetailBoard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
`;

const StyledDetailFrac = styled.div`

    padding: 5px;
    background: white;
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,.3);
    
    & > div {
        padding: 5px 5px 0 5px;
    }
    
    .info-box {
        display: flex;
        gap: 5px;
    }
    
    .info-box > div {
        display: flex;
        border: 1px solid rgba(0,0,0,.3);
    }
    .info-box > div > div {
        padding: 5px;
    }
    .info-box > div > div:first-child {
        background: #e6e6e6;
    }
    .info-box > div > div:last-child {
        padding: 5px 15px;
        background: #ffffff;
    }
    
    .content-box {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 5px;
    }
    .content-box > div {
        display: flex;
        border: 1px solid rgba(0,0,0,.3);
    }
    .content-box > div > div {
        padding: 5px;
    }
    .content-box > div > div:first-child {
        width: 8%;
        text-align: center;
        background: #e6e6e6;
    }
    .content-box > div > div:last-child {
        margin-left: 5px;
        background: #ffffff;
    }
`;

export default DetailList;