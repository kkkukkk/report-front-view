import React from 'react';
import styled  from "styled-components";
import TabBoard from "./TabBoard";

const Result = () => {
    return (
        <StyledResult>
            <TabBoard tab={"result"}/>
        </StyledResult>
    );
};

const StyledResult = styled.div`
    width: 100%;
    height: 100%;
    background: white;
`;

export default Result;