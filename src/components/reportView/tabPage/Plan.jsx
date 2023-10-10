import React from 'react';
import styled  from "styled-components";
import TabBoard from "./TabBoard";

const Plan = () => {
    return (
        <StyledPlan>
            <TabBoard tab={"plan"} />
        </StyledPlan>
    );
};

const StyledPlan = styled.div`
    width: 100%;
    height: 100%;
    background: white;
`;


export default Plan;