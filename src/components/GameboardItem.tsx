import React, { FC, memo } from 'react';

interface GameboardItemProps {
    boardState: number[]
    index: number,
    size: number,
    imgSrc: string,
    value: number,
    coords: { x: number, y: number },
    originalCoords: { x: number, y: number },
    onClickCallback: (index: number, boardState: number[]) => void
}

const GameboardItem: FC<GameboardItemProps> = (props) => {
    const clickImage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        props.onClickCallback(props.index, props.boardState)
    }

    return (
        <div
            id={`${props.index}`}
            style={{
                height: `${(100 / props.size)}%`,
                width: `${(100 / props.size)}%`,
                overflow: 'hidden',
                position: 'absolute',
                transition: "all 0.4s",
                right: `${(100 / props.size) * (props.size - 1 - props.coords.y)}%`,
                top: `${(100 / props.size) * (props.coords.x)}%`,
                borderRadius: '2px'
            }}
            onClick={e => { clickImage(e) }}
            key={`${props.index}`}>
            <img
                style={{
                    height: `${100 * props.size}%`,
                    width: `${100 * props.size}%`,
                    margin: `-${(100 * (props.originalCoords.x))}%  0px 0px -${(100 * (props.originalCoords.y))}%`,
                    opacity: props.index === props.size * props.size - 1 ? 0 : 1
                }}
                draggable={'false'} src={props.imgSrc}
            />
        </div>
    );
}

export default memo(GameboardItem);
