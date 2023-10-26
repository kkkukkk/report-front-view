import React from 'react';
import styled from "styled-components";

const StyledFullModal = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.7);
    z-index: 2;
    cursor: pointer;
`;

const ModalContent = styled.div`
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    width: 80vmin;
    height: 80vmin;
    padding: 20px;
    border-radius: 5px;
    cursor: initial;
`;

const InnerTitle = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 5%;
    gap: 10px;
    font-size: 18px;
    font-weight: bold;
    & > div:first-child {
        background: rgba(0,0,0,.1);
        border-radius: 5px;
        padding: 5px 10px;
    }
`;

const InnerContents = styled.div`
    height: 95%;
    max-height: 95%;
    padding-top: 20px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgb(94, 169, 255);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background: aliceblue;
    }
    & > div {
        height: 100%;
        border-radius: 5px;
        background: gray;
        padding: 10px;
    }
    & > div > div:not(div:last-child) {
        margin-bottom: 5px;
    }
`;

const ModalCloseButton = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const FullModal = ({modalData, handleFullModalOn}) => {
    const formatDate = (date) => {
        return date.substring(0,4) + "/" + date.substring(4,6) + "/" + date.substring(6,8);
    }

    return (
        <StyledFullModal
            onClick={event => {
                handleFullModalOn(false);
            }}
        >
            <ModalContent
                onClick={event => {
                    event.preventDefault();
                    event.stopPropagation();
                }}
            >
                <InnerTitle>
                    <div>{modalData.sys_date + "-" + modalData.serl_no}</div>
                    <div>{modalData.work_title}</div>
                </InnerTitle>
                <ModalCloseButton onClick={event => {handleFullModalOn(false);}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                </ModalCloseButton>
                <InnerContents>
                    <div>
                        <div>기간 : {formatDate(modalData.str_date.toString()) + '~' + formatDate(modalData.end_date.toString())}</div>
                        <div>담당자 : {modalData.charge_man}</div>
                        <div>사유 : {modalData.work_req_desc}</div>
                        <div>작업내역 : {modalData.work_result}</div>
                    </div>
                </InnerContents>
            </ModalContent>
        </StyledFullModal>
    );
};

export default FullModal;