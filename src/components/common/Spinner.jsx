import React from 'react';
import styled from "styled-components";
import { useSelector} from "react-redux";
import spinner from '../../image/Spinner.svg';

const Spinner = () => {
	const spinnerCheck = useSelector((state) => state.spinner).spinner;

	return (
		spinnerCheck &&<StyledSpinner>
			<img src={spinner} alt={"no Img"} />
		</StyledSpinner>
	);
};

const StyledSpinner = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100vw;
	height: 100vh;
	background: rgba(0,0,0,.3);
  
	display: flex;
	justify-content: center;
	align-items: center;
  
	& > img {
		width: 30vmin;
	}
`;

export default Spinner;