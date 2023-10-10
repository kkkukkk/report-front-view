import React from 'react';
import styled from "styled-components";

const StyledCheckFrac = styled.button`
  position: relative;
  padding: 10px 5px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, .1);
  background: #e6e6e6;

  .checkBack {
    display: none;
  }

  &:hover {
    background: #bebebe;
  }

  &.on .checkBack {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background: black;
    opacity: .6;
  }
`;

const CheckFrac = ({ children, className, onClick }) => {
    return (
        <StyledCheckFrac
            className={className}
            onClick={onClick}
        >
            {children}
            <div className={"checkBack"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="white"
                     className="bi bi-check-lg" viewBox="0 0 16 16">
                    <path
                        d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                </svg>
            </div>
        </StyledCheckFrac>
    );
};

export default CheckFrac;