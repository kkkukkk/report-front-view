import React, { useState } from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setEndDate } from "../../../store/reportView/endDateSlice";
import { setStartDate } from "../../../store/reportView/startDateSlice";
import Calendar from 'react-calendar';
import '../../../css/Calendar.css';
import ExcelSet from "./excelDownload/ExcelSet";

const SearchCondition = ({ ...res }) => {
    const [searchOn, setSearchOn] = useState(false);
    const startDate = useSelector((state) => state.startDate);
    const endDate = useSelector((state) => state.endDate);
    const dispatch = useDispatch();

    return (
        <StyledSearchCondition
            {...res}
        >
            <ChangeSearchCondition
                type={"button"}
                onClick={() => setSearchOn(searchOn => !searchOn)}
            >검색 조건</ChangeSearchCondition>
            {searchOn && <SearchBox>
                <div>
                    <DateBox>FROM : {startDate.startDate.format("YYYY-MM-DD")}</DateBox>
                    <Calendar
                        onChange={e => {
                            setSearchOn(false);
                            dispatch(setStartDate(e))
                        }}
                        value={startDate.startDate.toDate()}
                        formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
                        calendarType={"gregory"}
                    />
                </div>
                <div>
                    <DateBox>TO : {endDate.endDate.format("YYYY-MM-DD")}</DateBox>
                    <Calendar
                        onChange={e => {
                            setSearchOn(false);
                            dispatch(setEndDate(e))
                        }}
                        value={endDate.endDate.toDate()}
                        formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
                        calendarType={"gregory"}
                    />
                </div>
            </SearchBox>}
            <PresentSearchCondition>
                {startDate.startDate.format("YYYY년 MM월 DD일")} ~ {endDate.endDate.format("YYYY년 MM월 DD일")}
            </PresentSearchCondition>
            <ExcelSet />
        </StyledSearchCondition>
    );
};

const StyledSearchCondition = styled.div`
  position: relative;
  display: flex;
  grid-area: searchCondition;
  align-items: center;
  padding: 0 10px;
  //color: white;
  gap: 10px;
`;
const ChangeSearchCondition = styled.button`
  width: 10%;
  height: 30px;
  color: white;
  font-weight: bold;
  background: #ff4c4c;
`;

const SearchBox = styled.div`
  position: absolute;
  top: 38px;
  left: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  padding: 0 10px 10px;
  color: white;
  border-radius: 5px;
  background: #9c9c9c;
  box-shadow: rgba(0,0,0,.5) 1px 1px 3px;
  z-index: 1;
`;

const DateBox = styled.div`
  padding: 10px 0;
`;

const PresentSearchCondition = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

export default SearchCondition;