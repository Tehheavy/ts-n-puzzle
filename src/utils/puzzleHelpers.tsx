import GameboardItem from "../components/GameboardItem";
import React from 'react'

interface Coords {
    x: number,
    y: number
}


const initialImages = [
    'https://i.imgur.com/YLWsY4G.jpg',
    'https://i.imgur.com/Irg9QIx.jpg',
    'https://i.imgur.com/W9U5y71.jpg',
    'https://i.imgur.com/HHEPvJG.jpg'
]

const convertToXYCoords = (number: number, size: number) => {
    let y = Math.floor(number % size);
    let x = Math.floor(number / size)
    let res = { x, y }
    return res;
}

const sumInversions = (randomValueArray: number[]) => {
    let count = 0;
    for (let i = 0; i < randomValueArray.length - 1; i++) {
        for (let j = i + 1; j < randomValueArray.length; j++) {
            if (randomValueArray[i] > randomValueArray[j])
                count++;
        }
    }
    return count;
}


const isSolvable = (randomValueArray: number[]) => {
    return (sumInversions(randomValueArray) % 2 == 0)
}

const generateRandomSolveableArray = (difficulty: number) => {
    let tempArray = [];
    do {
        tempArray = []
        for (let i = 0; i < difficulty * difficulty - 1; i++) {
            tempArray.push(i);
        }
        tempArray.sort(() => Math.random() - 0.5);
    }
    while (!isSolvable(tempArray))

    return [...tempArray, difficulty * difficulty - 1]
}

const generateGameBoard = (difficulty: number, imgSrc: string, gameboardStateArray: number[], onClickCallback: (index: number, boardState: number[]) => void) => {
    const randomArray = [...gameboardStateArray]
    const boardItemArray = randomArray.map((positionIndex, index) => (
        <GameboardItem
            boardState={randomArray}
            onClickCallback={onClickCallback}
            index={positionIndex}
            size={difficulty}
            key={positionIndex}
            value={positionIndex}
            originalCoords={convertToXYCoords(positionIndex, difficulty)}
            imgSrc={imgSrc}
            coords={convertToXYCoords(index, difficulty)}
        />
    ))

    return { board: boardItemArray, array: randomArray }
}

const swapElements = (array: number[], index1: number, index2: number) => {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
};

const canSwap = (coords1: Coords, coords2: Coords) => {
    if ((coords1.x === coords2.x && (Math.abs(coords1.y - coords2.y) === 1)) || coords1.y === coords2.y && (Math.abs(coords1.x - coords2.x) === 1)) {
        return true
    }

    return false
}

export {
    initialImages,
    canSwap,
    swapElements,
    generateRandomSolveableArray,
    generateGameBoard,
    convertToXYCoords
}