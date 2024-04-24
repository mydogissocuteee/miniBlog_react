import React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
    height: 30px;
    padding: 2px 8px;
    margin: 0px 2px;
    font-size: 13px;
    border-width: 1px;
    border-radius: 8px;
    cursor: pointer;
    
`;

function Button(props) {
    const { title, onClick } = props;

    return <StyledButton onClick={onClick}>{title || "buttion"}</StyledButton>;
}

export default Button;