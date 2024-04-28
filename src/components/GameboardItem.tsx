import React, { FC } from 'react';

{/* <GameBoardItem id={i} size={props.size} key={i} img={img} value={i} i={convertToXY(tempArray[i])[0]} j={convertToXY(tempArray[i])[1]} image={'https://i.imgur.com/YLWsY4G.jpg'}></GameBoardItem> */ }

interface GameboardItemProps {
    id: string,
    size: number,
    imgSrc: string,
    value: number,
    i: number,
    j: number
}

const GameboardItem: FC<GameboardItemProps> = (props) => {
    const clickImage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log('clicked on ', props.value)
    }

    return (
        <div
            style={{
                height: `${(100 / props.size)}%`,
                width: `${(100 / props.size)}%`,
                overflow: 'hidden',
                position: 'absolute',
                transition: "all 0.2s",
                right: `${(100 / props.size) * (props.size - 1 - props.j)}%`,
                top: `${(100 / props.size) * (props.i)}%`,
                borderRadius: '2px'
            }}
            onClick={e => { clickImage(e) }}
            id={props.id}>
            <img
                style={{
                    height: `${100 * props.size}%`,
                    width: `${100 * props.size}%`,
                    margin: `-${(100 * (props.i))}%  0px 0px -${(100 * (props.j))}%`
                }}
                draggable={'false'} src={props.imgSrc}
            />
        </div>
    );
}

export default GameboardItem;
