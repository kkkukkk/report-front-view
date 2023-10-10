import React from 'react';
import styled from "styled-components";

const NoData = ({ children }) => {
    return (
        <StyledNoData>
            {children}
        </StyledNoData>
    );
};

const StyledNoData = styled.div`
    padding: 10px;
    text-align: center;
    border: 1px solid rgba(0,0,0,.3);
    border-radius: 5px;
    background: #ffffff;
`;

export default NoData;