import React, { FC, useState } from 'react';
import { canSwap, convertToXYCoords, generateGameBoard, generateRandomSolveableArray, swapElements } from '../utils/puzzleHelpers';
import styled from 'styled-components';


const BoardPageContainer = styled.div`
    display: inline-block;
    flex: 1;
    text-align: -webkit-center;
`

const BoardContainer = styled.div`
    display: grid;
    object-fit: cover;
    overflow: hidden;
    min-width: 50px;
    max-width: 600px;
    max-height: 600px;
    min-height: 50px;
    padding: 10px 10px 0px 10px;
`


const GenerateButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 30px;
    padding: 10px 20px;
    border-radius: 30px;
    margin-top: 10px;
    background-color: white;
`

const GameView = styled.div`
    display: flex;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    position: relative;
    border-color: rgba(255, 255, 255, 0.301);
    border-radius: 5px;
    border-style: solid;
`

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
            if (!canSwap(convertToXYCoords(findEmptyIndex, difficulty), convertToXYCoords(findIndex, difficulty))) {
                return
            }
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
        return (
            <BoardPageContainer>
                <BoardContainer>
                    <GameView>
                        <img src={imgSrc} />
                    </GameView>
                </BoardContainer>
                <GenerateButton onClick={(e) => handleClickGenerateBoard(e)}>generate</GenerateButton>
            </BoardPageContainer>
        )
    }

    const { board } = gameboardState

    return (
        <BoardPageContainer>
            <BoardContainer>
                <GameView>
                    {board}
                </GameView>
            </BoardContainer>
            <GenerateButton onClick={(e) => handleClickGenerateBoard(e)}>generate</GenerateButton>
        </BoardPageContainer>
    );
}

export default Gameboard;
