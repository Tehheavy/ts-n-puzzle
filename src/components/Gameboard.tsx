import React, { FC } from 'react';
import { generateGameBoard } from '../utils/puzzleHelpers';

interface GameboardProps {
    imgSrc: string
    difficulty: number
}

const Gameboard: FC<GameboardProps> = ({ imgSrc, difficulty }) => {
    console.log('imgSrc', imgSrc)
    console.log('difficulty', difficulty)
    const bob = generateGameBoard(difficulty, imgSrc)
    return (
        <div style={{
            height: '600px',
            width: '600px',
            overflow: 'hidden',
            position: 'relative'
        }}>{bob}</div>
    );
}

export default Gameboard;
