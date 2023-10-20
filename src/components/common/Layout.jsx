import React from 'react';
import styled from 'styled-components';
import Header from '../include/Header';
import "../../util/commonUtil"

const Layout = ({ children }) => {

    return (
        <StyledLayout>
            <Header area={"header"} />
            <StyledContents>
                {children}
            </StyledContents>
        </StyledLayout>
    );
};

const StyledLayout = styled.div`
    display: grid;
    grid-template-rows: 6% auto;
    grid-template-areas: 
    "header"
    "contents";
    width: 100vw;
    height: 100vh;
    background: #e1e1e1;
    //background: #0f61b2;
`;

const StyledContents = styled.div`
    position: relative;
    grid-area: contents;
    overflow: hidden;
`;


export default Layout;