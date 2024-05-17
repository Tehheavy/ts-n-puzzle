import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Gameboard from '../components/Gameboard';

const PageContainer = styled.div`
  background-color: #282c34;
  display: flex;
  justify-content: center;
  flex: 1;
  overflow: hidden;
`

// enum GameState {
//     difficulty = 'difficulty',
//     game = 'game'
// }

const Game: FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [difficulty, setDifficulty] = useState(3)
    // const [gameState, setGameState] = useState<GameState>(GameState.difficulty)
    const imgSrc = state?.imgSrc || ''
    console.log('imgSrc', imgSrc, difficulty, setDifficulty)

    useEffect(() => {
        if (!imgSrc) {
            navigate('/')
        }
    }, [imgSrc])

    return (
        <PageContainer>
            <Gameboard imgSrc={imgSrc} difficulty={difficulty} />
        </PageContainer>
    );
}

export default Game;
