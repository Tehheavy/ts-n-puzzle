import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
    height: 60px;
    width: 100%;
    background: #29605a;
`

// const NavbarItem = styled(NavLink)`
// font-size: 20px;
// color: #9bd0b4;
// font-weight: 500;
// cursor: pointer;

// &:hover {
//     text-decoration: underline;
//     color: #40c57e;
// }
// `

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
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    About
                </NavLink>
            </NavbarItemContainer>
        </NavbarContainer>
    );
}

export default Navbar;
