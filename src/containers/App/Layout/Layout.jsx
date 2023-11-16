import React from "react";
import { Menu } from "antd";
import {
    AppstoreOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom"
import { LinksWrapper, StyledHeader, StyledLogo } from "./Layout.styled";

const menu_items = [
    {
        label: (<Link to="/">Home</Link>),
        key: 'home',
        icon: <HomeOutlined />
    },
    {
        label: (<Link to="/fields">Fields</Link>),
        key: 'fields',
        icon: <AppstoreOutlined />
    }
];

const Navbar = () => {
    return (
        <StyledHeader>
            <StyledLogo to="/">Tracksent</StyledLogo>
            <LinksWrapper>
                <Menu 
                    // onClick={onClick} 
                    selectedKeys={[]} 
                    mode="horizontal" 
                    defaultSelectedKeys={['home']}
                    items={menu_items}
                />
            </LinksWrapper>
        </StyledHeader>
    );
};

export default Navbar