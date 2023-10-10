import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return (
        <StyledHeader>
            SM2Networks 업무 보고
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
    grid-area: header;
    display: flex;
    justify-content: center;
    align-items: center;
    
    font-size: 24px;
    font-weight: bold;
    color: white;
    //color: rgb(255, 255, 255);
    background: #0f61b2;
`


export default Header;