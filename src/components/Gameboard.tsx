import React, { FC } from 'react';

interface GameboardProps {
    imgSrc: string
    difficulty: number
}

const Gameboard: FC<GameboardProps> = ({ imgSrc, difficulty }) => {
    console.log('imgSrc', imgSrc)
    console.log('difficulty', difficulty)
    return (
        <div>about page</div>
    );
}

export default Gameboard;
