import React, { FC, useState } from 'react';
import { generateGameBoard, generateRandomSolveableArray, swapElements } from '../utils/puzzleHelpers';


interface GameboardProps {
    imgSrc: string
    difficulty: number
}

const Gameboard: FC<GameboardProps> = ({ imgSrc, difficulty }) => {
    const emptyPosition = difficulty * difficulty - 1
    const [gameboardState, setGameboardState] = useState<null | { board: any[], array: number[] }>(null)

    const handleClickBoardItem = (index: number, boardState: number[]) => {
        const findEmptyIndex = boardState.findIndex(boardItem => boardItem === emptyPosition)
        const findIndex = boardState.findIndex(boardItem => boardItem === index)
        if (findEmptyIndex !== -1 && findIndex !== -1) {

            const newBoardState = [...boardState]
            swapElements(newBoardState, findEmptyIndex, findIndex)
            const generatedBoard = generateGameBoard(difficulty, imgSrc, newBoardState, handleClickBoardItem)

            // Sorting the element array by keys for render optimizations
            const sortBoardElementsByKey = generatedBoard.board.sort((a, b) => (Number(a.key) - Number(b.key)))
            setGameboardState({ board: sortBoardElementsByKey, array: generatedBoard.array })
        }
    }

    const handleClickGenerateBoard = (e: any) => {
        const generatedBoard = generateGameBoard(difficulty, imgSrc, generateRandomSolveableArray(difficulty), handleClickBoardItem)
        // Sorting the element array by keys for render optimizations
        const sortBoardElementsByKey = generatedBoard.board.sort((a, b) => (Number(a.key) - Number(b.key)))
        setGameboardState({ board: sortBoardElementsByKey, array: generatedBoard.array })
    }

    if (!gameboardState) {
        return <div>
            <img src={imgSrc} />
            <div onClick={(e) => handleClickGenerateBoard(e)}>generate</div>
        </div>
    }

    const { board } = gameboardState

    return (
        <div style={{
            height: '600px',
            width: '600px',
            overflow: 'hidden',
            position: 'relative'
        }}>{board}</div>
    );
}

export default Gameboard;
