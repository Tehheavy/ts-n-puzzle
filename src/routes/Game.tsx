import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import GameboardItem from '../components/GameboardItem';

const PageContainer = styled.div`
  background-color: #282c34;
  display: flex;
  justify-content: center;
  flex: 1;
  overflow: hidden;
`


const Game: FC = () => {
    const { state } = useLocation();
    const [difficulty, setDifficulty] = useState(3)
    console.log('state', state)
    return (
        <PageContainer>
            <GameboardItem />
        </PageContainer>
    );
}

export default Game;
