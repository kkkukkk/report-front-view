import React from 'react';
import styled   from "styled-components";
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import TabButtons from "./tabButton/TabButtons";
import Plan from "./tabPage/Plan";
import Result from  "./tabPage/Result";
import Total from "./tabPage/Total";
import SearchCondition from "./tabPage/SearchCondition";

const ReportView = () => {
    const navigate = useNavigate();
    const handlePageMove = (path) => navigate(path);

    return (
        <StyledReportView>
            <SearchCondition></SearchCondition>
            <TabButtons handlePageMove={handlePageMove}></TabButtons>
            <StyledContentWrap>
                <Routes>
                    <Route  path={"/"} element={<Result />}></Route>
                    <Route  path={"/plan"} element={<Plan />}></Route>
                    <Route  path={"/total"} element={<Total />}></Route>
                </Routes>
            </StyledContentWrap>
        </StyledReportView>
    );
};

const StyledReportView = styled.div`
    display: grid;
    grid-template-areas: 
    "searchCondition"
    "tabButtons"
    "contentWrap";
    grid-template-rows: 5% 4% auto;
    width: 100%;
    height: 100%;
`;

const StyledContentWrap = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    grid-area: contentWrap;
`;
export default ReportView;