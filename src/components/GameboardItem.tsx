import React, { FC } from 'react';

interface GameboardItemProps {
    id: string,
    size: number,
    imgSrc: string,
    value: number,
    i: number,
    j: number
    originalI: number,
    originalJ: number
}

const GameboardItem: FC<GameboardItemProps> = (props) => {
    const clickImage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log('clicked on ', props.value)
    }
    console.log('props', props)
    return (
        <div
            style={{
                height: `${(100 / props.size)}%`,
                width: `${(100 / props.size)}%`,
                overflow: 'hidden',
                position: 'absolute',
                transition: "all 0.2s",
                right: `${(100 / props.size) * (props.size - 1 - props.originalJ)}%`,
                top: `${(100 / props.size) * (props.originalI)}%`,
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
