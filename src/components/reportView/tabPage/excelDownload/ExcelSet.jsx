import React, {useState} from 'react';
import styled from "styled-components";
import ExcelDownloadModal from "./ExcelDownloadModal";

const ExcelSet = () => {
    const [excelModalOn, setExcelModalOn] = useState(false);

    return (
        <StyledExcelSet>
            <ExcelDownloadButton onClick={() => setExcelModalOn(excelModalOn => !excelModalOn)}>
                엑셀 다운로드
            </ExcelDownloadButton>
            {excelModalOn && <ExcelDownloadModal />}
        </StyledExcelSet>
    );
};

const StyledExcelSet = styled.div`
  position: relative;
`;

const ExcelDownloadButton = styled.button`
  color: white;
  font-weight: bold;
  border: 2px solid forestgreen;
  background: forestgreen;
  &:hover {
    background: #2f7d2f;
  }
`;

export default ExcelSet;