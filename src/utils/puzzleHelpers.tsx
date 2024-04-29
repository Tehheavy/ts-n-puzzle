import GameboardItem from "../components/GameboardItem";
import React from 'react'

const initialImages = [
    'https://i.imgur.com/YLWsY4G.jpg',
    'https://i.imgur.com/YLWsY4G.jpg',
    'https://i.imgur.com/YLWsY4G.jpg',
    'https://i.imgur.com/YLWsY4G.jpg',
    'https://i.imgur.com/YLWsY4G.jpg',
    'https://i.imgur.com/YLWsY4G.jpg',
    'https://i.imgur.com/YLWsY4G.jpg',
    'https://i.imgur.com/YLWsY4G.jpg',
    'https://i.imgur.com/YLWsY4G.jpg',
    'https://i.imgur.com/YLWsY4G.jpg',
    'https://i.imgur.com/YLWsY4G.jpg'
]

const convertToXYCoords = (number: number, size: number) => {
    let y = Math.floor(number % size);
    let x = Math.floor(number / size)
    let res = [x, y]
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
            originalI={convertToXYCoords(positionIndex, difficulty)[0]}
            originalJ={convertToXYCoords(positionIndex, difficulty)[1]}
            imgSrc={imgSrc}
            i={convertToXYCoords(index, difficulty)[0]}
            j={convertToXYCoords(index, difficulty)[1]}
        />
    ))

    return { board: boardItemArray, array: randomArray }
}

const swapElements = (array: number[], index1: number, index2: number) => {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
};

export {
    initialImages,
    swapElements,
    generateRandomSolveableArray,
    generateGameBoard,
    convertToXYCoords
}