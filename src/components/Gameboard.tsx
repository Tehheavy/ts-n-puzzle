import React, { FC, useMemo, useState } from 'react';
import { canSwap, convertToXYCoords, generateGameBoard, generateRandomSolveableArray, getHighScore, setHighScore, swapElements } from '../utils/puzzleHelpers';
import styled from 'styled-components';


const BoardPageContainer = styled.div`
    overscroll-behavior: none;
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
    max-height: 80%;
    min-height: 50px;
    padding: 10px 10px 0px 10px;
    aspect-ratio: 1/1;
`


const GenerateButton = styled.div`
    cursor: pointer;
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

const GameWinContainer = styled.div`
    display: flex;
    flex:   1;
    position:   absolute; 
    width: 100%;
    height: 100%;
    z-index: 1;
    flex-direction: column;
    background: #54545487;
`

const HintMark = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    cursor: pointer;
    background: white;
    position: absolute;
    top:0;
    right:0;
    &:hover ~ #solution-image{
        opacity: 1;
    }
    
`

const SolutionContainer = styled.div`
    height: 100%;
    width: 100%;
    opacity: 0;
    position: absolute;
    pointer-events: none;
`

const SolutionImage = styled.img`
    height: 50%;
    width: 50%;
    float: inline-start;
    border-style: solid;
    border-width: 3px;
    border-color: white;
`

const GameWinText = styled.h1`
    color: white;
    text-shadow: 5px 5px #000000;
`

interface GameboardProps {
    imgSrc: string
    difficulty: number
}

interface GameBoardInfo {
    startTime: undefined | Date
    endTime: undefined | Date
    board: any[],
    array: number[]
}

const Gameboard: FC<GameboardProps> = ({ imgSrc, difficulty }) => {
    const emptyPosition = difficulty * difficulty - 1
    const [gameboardState, setGameboardState] = useState<null | GameBoardInfo>(null)
    const solveTime = useMemo(() => {
        if (gameboardState?.endTime && gameboardState?.startTime) {
            const seconds = (gameboardState.endTime.getTime() - gameboardState.startTime.getTime()) / 1000
            setHighScore(imgSrc, difficulty, seconds)
            return { time: (gameboardState.endTime.getTime() - gameboardState.startTime.getTime()) / 1000, highscore: getHighScore(imgSrc, difficulty) }
        }
    }, [gameboardState])

    const solvedBoard = useMemo(() => {
        const solvedArray = new Array(difficulty * difficulty).fill(0).map((num, index) => index)
        return generateGameBoard(difficulty, imgSrc, solvedArray, () => { })
    }, [difficulty, imgSrc])

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
            const isCompleted = (`${generatedBoard.array}` === `${solvedBoard.array}`)
            setGameboardState(prev => {
                const prevStartTime = prev?.startTime
                return ({ board: sortBoardElementsByKey, array: generatedBoard.array, startTime: prevStartTime || new Date(), endTime: isCompleted ? new Date() : undefined })
            })
        }
    }

    const handleClickGenerateBoard = (e: any) => {
        const generatedBoard = generateGameBoard(difficulty, imgSrc, generateRandomSolveableArray(difficulty), handleClickBoardItem)
        // Sorting the element array by keys for render optimizations
        const sortBoardElementsByKey = generatedBoard.board.sort((a, b) => (Number(a.key) - Number(b.key)))
        setGameboardState({ board: sortBoardElementsByKey, array: generatedBoard.array, startTime: new Date(), endTime: undefined })
    }


    const gameEnded = !!gameboardState?.endTime


    if (!gameboardState) {
        return (
            <BoardPageContainer>
                <BoardContainer>
                    <GameView>
                        {!!gameEnded && null}
                        {solvedBoard.board}
                    </GameView>
                </BoardContainer>
                <GenerateButton onClick={(e) => handleClickGenerateBoard(e)}>play</GenerateButton>
            </BoardPageContainer>
        )
    }

    const { board } = gameboardState

    return (
        <BoardPageContainer>
            <BoardContainer>
                <GameView>
                    {!!gameEnded && (
                        <GameWinContainer>
                            <GameWinText>WIN!</GameWinText>
                            <GameWinText>{`Solve time: ${solveTime?.time} seconds`}</GameWinText>
                            <GameWinText>{`HighScore: ${solveTime?.highscore} seconds`}</GameWinText>
                        </GameWinContainer>
                    )}
                    {board}
                    <HintMark>{'?'}</HintMark>
                    <SolutionContainer id='solution-image'>
                        <SolutionImage src={imgSrc} />
                    </SolutionContainer>
                </GameView>
            </BoardContainer>
            <GenerateButton onClick={(e) => handleClickGenerateBoard(e)}>re-generate</GenerateButton>
        </BoardPageContainer>
    );
}

export default Gameboard;
