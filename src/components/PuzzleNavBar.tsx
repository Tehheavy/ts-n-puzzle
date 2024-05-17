import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
    height: 60px;
    width: 100%;
    background: #29605a;
    position: relative;
    align-content: center;

    &::after {
        content: '';
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%);
        height: 6px;
        width: 100%;
        position: absolute;
        top: 100%;
        left: 0;
    }
`

const NavbarItem = styled(NavLink)`
    font-size: 20px;
    color: #9bd0b4;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
        color: #40c57e;
    }

    &.active {
        text-decoration: underline;
    }
`

const NavbarItemContainer = styled.div`
    display: flex;
    align-items: start;
    padding: 0px 10% 0px 10%;
    gap: 30px;
`

const Navbar: FC = () => {
    return (
        <NavbarContainer>
            <NavbarItemContainer>
                <NavbarItem
                    to="/"
                >
                    Home
                </NavbarItem>
                <NavbarItem
                    to="/about"
                >
                    About
                </NavbarItem>
            </NavbarItemContainer>
        </NavbarContainer>
    );
}

export default Navbar;
