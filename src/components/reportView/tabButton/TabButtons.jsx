import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import TabButton from "./TabButton"
import { useDispatch } from "react-redux";
import { setPage } from "../../../store/pageSlice"

const pathInfo = {
    "/": 0,
    "/plan": 1
}
const TabButtons = ({handlePageMove}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [now, setNow] = useState(0);
    const tabList = [
        { name: "업무실적", path: "/", page: "report" },
        { name: "업무계획", path: "/plan", page: "plan" },
        /*{ name: "통계", path: "/total" },*/
    ]

    useEffect(()=> {
        setNow(pathInfo[location.pathname]);
    }, [location.pathname]);

    return (
        <StyledTabButtons>
            {tabList.map((item, index) => (
                <TabButton
                    key={index}
                    $on={now===index}
                    onClick={()=> {
                        handlePageMove(item.path)
                        setNow(index)
                        dispatch(setPage(item.page));
                    }}
                >{item.name}</TabButton>
            ))}
        </StyledTabButtons>
    );
};

const StyledTabButtons = styled.div`
    display: flex;
    grid-area: tabButtons;
`
export default TabButtons;