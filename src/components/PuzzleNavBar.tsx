import React, { FC } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
    height: 100px;
    width: 100%;
    background: red;
`

const Navbar: FC = () => {
    return (
        <NavbarContainer>
        </NavbarContainer>
    );
}

export default Navbar;
