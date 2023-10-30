import React from 'react';
import styled from "styled-components";

const FullModal = ({modalData, handleFullModalOn}) => {

    return (
        <StyledFullModal
            onClick={event => {
                handleFullModalOn(false);
            }}
        >
            {modalData && <ModalContent
                onClick={event => {
                    event.preventDefault();
                    event.stopPropagation();
                }}
            >
                <InnerTitle>
                    원본전산화
                </InnerTitle>
                <ModalCloseButton onClick={event => {handleFullModalOn(false);}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                </ModalCloseButton>
                <InnerContents>
                    <div>
                        <div><span>{modalData[0].etc_no}</span>{modalData[0].work_title}</div>
                        <div className={"upmu-info-set"}>
                            <div>{modalData[0].upmu1}</div>
                            <div>{modalData[0].upmu2}</div>
                            <div>{modalData[0].upmu3}</div>
                        </div>
                        <div className={"main-info"}>
                            <div>담당자</div>
                            <div>{modalData[0].han_nm}</div>
                        </div>
                        <div className={"main-info"}>
                            <div>사유</div>
                            <div>{modalData[0].work_req_desc}</div>
                        </div>
                        <div className={"main-info"}>
                            <div>작업내역</div>
                            <div>{modalData[0].work_result}</div>
                        </div>
                        {modalData[0].others && <div className={"others"}>
                            {modalData[0].others.map((item, index) => (
                                <div key={index}>
                                    <div>
                                        <div>{item.etc_no}</div>
                                        {/*<div>{item.work_title}</div>*/}
                                    </div>
                                    <div>
                                        <div>담당자 : {item.han_nm}</div>
                                        <div>사유 : {item.work_req_desc}</div>
                                        <div>작업내역 : {item.work_result}</div>
                                    </div>
                                </div>
                            ))}
                        </div>}
                    </div>
                </InnerContents>
            </ModalContent>
            }
        </StyledFullModal>
    );
};

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
    
    .upmu-info-set {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 3px;
        
        & > div {
            padding: 4px 8px;
            border-radius: 5px;
            border: 1px solid rgba(0,0,0,.1);
            background: mintcream; 
            font-size: 14px;
        }
    }
    .main-info {
        border-top: 1px solid rgba(0,0,0,.1);
        border-bottom: 1px solid rgba(0,0,0,.1);
        display: flex;
    }
    .main-info > div {
        padding: 5px;
        word-break: keep-all;
    }
    .main-info > div:first-child {
        flex: 1;
        background: rgba(0,0,0,.1);
    }
    .main-info > div:last-child {
        flex: 6;
    }
`;

const InnerTitle = styled.div`
    position: relative;
    width: 100%;
    height: 5%;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
`;

const InnerContents = styled.div`
    height: 95%;
    max-height: 95%;
    padding-top: 10px;
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
    }
    & > div > div:first-child {
        font-weight: bold;
    }
    & > div > div {
        margin-bottom: 10px;
    }
    & > div > div > span {
        display: inline-flex;
        padding: 5px 10px;
        border-radius: 5px;
        background: aliceblue;
        border: 1px solid rgba(0,0,0,.1);
        margin: 0 8px 0 0;
    }
    
    .others {
        font-size: 14px;
        padding-top: 10px;
        border-top: 5px dotted rgba(0,0,0,.3);
    }
    .others > div {
        padding: 10px;
        border: 1px solid rgba(0,0,0,.1);
        border-radius: 5px;
        background: #fdfdfd;
    }
    .others > div:not(div:last-child) {
        margin-bottom: 5px;
    }
    .others > div > div:first-child {
        display: flex;
        align-items: center;
        
        & > div:first-child {
            padding: 3px 6px;
            margin-right: 5px;
            border-radius: 5px;
            border: 1px solid rgba(0,0,0,.1);
            background: aliceblue;
        }
    }
    .others > div > div:last-child {
        padding: 5px;
    }
    .others > div > div:last-child > div:not(div:last-child) {
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

export default FullModal;