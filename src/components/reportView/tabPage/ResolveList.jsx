import React, { useState } from 'react';
import styled from "styled-components";
import DetailList from "./DetailList";
import NoData from "./NoData";

const ResolveList = ({ data, handleFullModalOn, handleModalData, ...res }) => {
    const [now, setNow] = useState();

    const showDetail = (index) => {
        if (now === index) {
            setNow(undefined);
        } else {
            setNow(index);
        }
    }

    const formatDate = (date) => {
        return date.substring(0,4) + "/" + date.substring(4,6) + "/" + date.substring(6,8);
    }

    const relatedWork = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        handleFullModalOn(true);
        handleModalData(item);
    }

    const solveList = (data) => {
        if (data) {
            return data.map((item, index) => (
                <div
                    key={index}
                >
                    <DataRow
                        className={item.bogo !== null ? "bogo" : ""}
                        onClick={() => {
                            showDetail(index)
                        }}
                    >
                        <div className={"text-center"}>{item.upmu_name1}</div>
                        <div className={"text-center double-row"}>
                            <div>{item.upmu_name2}</div>
                            <div>{item.work_day}</div>
                        </div>
                        <div className={"text-center"}>{item.upmu_name3}</div>
                        <div className={"text-center"}>{item.charge_man}</div>
                        <div className={"text-center"}>
                            <div>{formatDate(item.str_date.toString())}</div>
                            <div>-</div>
                            <div>{formatDate(item.end_date.toString())}</div>
                        </div>
                        <div className={"word-break work-title"}>
                            <div>{item.work_title}</div>
                            {item.org_no && item.org_title && <div><button onClick={event => {relatedWork(event, item)}}>관련전산화</button></div>}
                        </div>
                        <div className={"word-break"}>{item.work_req_desc}</div>
                        <div className={"word-break"}>{item.work_result}</div>
                    </DataRow>
                    {now === index && <div
                    >
                        <DetailList data={item}></DetailList>
                    </div>}
                </div>
            ))
        } else {
            return <NoData>조회한 기간 내에 데이터 없음</NoData>
        }

    }

    return (
        <StyledResolveList id={"resolveList"}>
            { solveList(data) }
        </StyledResolveList>
    );
};

const StyledResolveList = styled.div`
    background: white;
    overflow-y: scroll;
    min-height: 95%;
    max-height: 95%;
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
    &::-webkit-scrollbar {
        display: none;
    }
    & > div:nth-child(even) {
        background: #f7fbff;
    }
    & > div:nth-child(even):hover {
        background: #e6f2ff;
    }
    & > div:nth-child(odd):hover {
        background: #fafafa;
    }
`;

const DataRow = styled.div`
    display: flex;
    gap: 20px;
    padding: 10px;
    border-bottom: 1px solid rgba(0,0,0,.3);
    cursor: pointer;
    font-size: 14px;
    &.bogo {
        font-weight: bolder;
    }
    
    .double-row {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    
    &:not(.title) {
        cursor: pointer;
        .text-center {
            text-align: center;
        }
    }
    
    & > div {
        white-space: pre-line;
    }
    & > div.word-break {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        word-break: keep-all;
    }
    & > div.work-title {
        display: flex;
        flex-direction: column;
        & > div:nth-child(2) {
            margin-top: 3rem;
            align-self: flex-end;
        }
    }
    
    & > div:nth-child(1) { width: 6%; min-width: fit-content; }
    & > div:nth-child(2) { width: 4%; min-width: fit-content; }
    & > div:nth-child(3) { width: 4%; min-width: fit-content; }
    & > div:nth-child(4) { width: 4%; min-width: fit-content; }
    & > div:nth-child(5) { width: 5%; }
    & > div:nth-child(6) { width: 15%; }
    & > div:nth-child(7) { width: 24%; }
    & > div:nth-child(8) { width: 30%; }
`;


export default ResolveList;