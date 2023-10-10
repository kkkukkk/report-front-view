import React, { useState } from 'react';
import styled from "styled-components";
import TabButton from "./TabButton"

const TabButtons = ({handlePageMove}) => {
    const [now, setNow] = useState(0);
    const tabList = [
        { name: "업무실적", path: "/" },
        { name: "업무계획", path: "/plan" },
        /*{ name: "통계", path: "/total" },*/
    ]

    return (
        <StyledTabButtons>
            {tabList.map((item, index) => (
                <TabButton
                    key={index}
                    $on={now===index}
                    onClick={()=> {
                        handlePageMove(item.path)
                        setNow(index)
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