import React from 'react';
import styled from "styled-components";

const StyledReportCheckBox= styled.label` 
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
    box-sizing: border-box;
    padding: 5px 10px;
    border: 1px solid rgba(0,0,0,.3);
    border-radius: 5px;
    background: white;
    & > * {
      pointer-events: none;
    }
`;

const StyledCheckBox = styled.input`
    appearance: none;
    width: 20px;
    height: 20px;
    border: 1px solid rgba(0,0,0,.3);
    border-radius: 5px;
    background: white;
    box-sizing: border-box;
    
    &:checked {
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #0f61b2;
    }
`;

const StyledSpan = styled.span`
    margin-top: .5px;
    margin-left: 10px;
    height: 100%;
`;

const ReportCheckBox = ({id, text, chainChecked, onChange}) => {
    return (
        <StyledReportCheckBox htmlFor={id} onChange={onChange}>
            <StyledCheckBox type={"checkbox"} className={"hidden-check-box"} id={id} defaultChecked={chainChecked} />
            <StyledSpan>{text}</StyledSpan>
        </StyledReportCheckBox>
    );
};

export default ReportCheckBox;