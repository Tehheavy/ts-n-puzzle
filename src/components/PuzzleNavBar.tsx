import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
    height: 60px;
    width: 100%;
    background: #29605a;
    position: relative;


    ::before{
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

    &:hover {
        text-decoration: underline;
        color: #40c57e;
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
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    Home
                </NavbarItem>
                <NavbarItem
                    to="/about"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    About
                </NavbarItem>
            </NavbarItemContainer>
        </NavbarContainer>
    );
}

export default Navbar;
