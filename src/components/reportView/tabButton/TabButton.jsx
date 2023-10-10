import React from 'react';
import styled from "styled-components";

const TabButton = ({ children, ...res }) => {
    return (
        <StyledTabButton
            {...res}
        >{children}</StyledTabButton>
    );
};

const StyledTabButton = styled.button`
    border-radius: 5px 5px 0 0;
    //background: ${props => props.$on ? "var(--theme_1_e)" : "var(--theme_1_c)"};
    background: ${props => props.$on ? "white" : "#bdbdbd"};
    font-weight: ${props => props.$on ? "bold" : "normal"}
`

export default TabButton;