import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinksWrapper = styled.div`
    width: 190px;
    margin-left: 100px;
`

export const StyledHeader = styled.div`
    margin: 0 10px;
    display: flex;
    align-items: center;
`

export const StyledLogo = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 28px;
`