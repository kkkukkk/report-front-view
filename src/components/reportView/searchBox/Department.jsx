import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setDepartment } from "../../../store/searchCondition/departmentSlice";
import { setPlanDepartment } from "../../../store/searchCondition/planDepartmentSlice";

const Department = () => {
    const department = useSelector((state) => state.department);
    const planDepartment = useSelector((state) => state.planDepartment);
    const page = useSelector((state) => state.page).page;
    const [departmentList, setDepartmentList] = useState([]);
    const [currentDepartment, setCurrentDepartment] = useState(department.department);
    const [planCurrentDepartment, setPlanCurrentDepartment] = useState(planDepartment.planDepartment);
    const [listOn, setListOn] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('https://always.samhwa.com/api/etc/job/workdept').then( result => {
            setDepartmentList(result.data);
        });
    },[]);

    const handleCurrentDepartment = (value) => {
        setCurrentDepartment(value);
        dispatch(setDepartment(value));
        setListOn(listOn => !listOn);
    }
    const handlePlanCurrentDepartment = (value) => {
        setPlanCurrentDepartment(value);
        dispatch(setPlanDepartment(value));
        setListOn(listOn => !listOn);
    }

    const findDepartmentName = (currentDepartment) => {
        let deptName = '';
        departmentList && departmentList.forEach((item) => {
            if (item.dept_code === currentDepartment) {
                deptName = item.dept_name;
            }
        })
        return deptName;
    }


    return (
        <StyledDepartment>
            <StyledCurrentDepartment
                onClick={() => {
                    setListOn(listOn => !listOn);
                }}
            >
                {findDepartmentName(page === 'report' ? currentDepartment : planCurrentDepartment)}
            </StyledCurrentDepartment>
            {listOn && <StyledDepartmentList>
                {departmentList && departmentList.map((item, index) => (
                    page === 'report'
                        ? <StyledDepartmentRow key={index} onClick={() => handleCurrentDepartment(item.dept_code)}>{item.dept_name}</StyledDepartmentRow>
                        : <StyledDepartmentRow key={index} onClick={() => handlePlanCurrentDepartment(item.dept_code)}>{item.dept_name}</StyledDepartmentRow>
                ))}
            </StyledDepartmentList>}

        </StyledDepartment>
    );
};


const StyledDepartment = styled.div`
    position: relative;
    width: 180px;
`;

const StyledDepartmentList = styled.div`
    position: absolute;
    top: 35px;
    width: inherit;
    max-height: 300px;
    overflow-y: scroll;
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
    &::-webkit-scrollbar {
        display: none;
    }
    color: rgba(255,255,255,.9);
    border-radius: 5px;
    background: rgba(0,0,0,.8);
`;

const StyledDepartmentRow = styled.div`
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
        color: white;
        background: black;
    }
`;

const StyledCurrentDepartment = styled.div`
    padding: 5px 10px;
    width: inherit;
    border-radius: 5px;
    color: white;
    background: rgba(0,0,0,.9);
    cursor: pointer;
    &:hover {
        box-shadow: rgba(0,0,0,.3) 1px 1px 5px 1px;
    }
`;

export default Department;