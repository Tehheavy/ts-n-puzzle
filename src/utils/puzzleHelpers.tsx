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

    return tempArray
}

const generateGameBoard = (difficulty: number, imgSrc: string) => {
    const randomArray = generateRandomSolveableArray(difficulty)
    console.log('randomArray', randomArray)
    const boardItemArray = []
    for (let i = 0; i < (difficulty * difficulty) - 1; i++) {
        let newItem1 = <GameboardItem id={`${i}`} size={difficulty} key={i} value={i} i={convertToXYCoords(randomArray[i], difficulty)[0]} j={convertToXYCoords(randomArray[i], difficulty)[1]} imgSrc={imgSrc}></GameboardItem>
        boardItemArray[i] = newItem1;
    }
    console.log('boardItemArray', boardItemArray)
    return boardItemArray
}

export {
    initialImages,
    generateGameBoard,
    convertToXYCoords
}