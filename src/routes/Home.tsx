import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { initialImages } from '../utils/puzzleHelpers';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  background-color: #282c34;
  display: flex;
  justify-content: center;
  flex: 1;
  overflow: hidden;
`

const SelectionTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

const TitleText = styled.h1`
    color: white;
    display: flex;
    align-items: center;
    align-self: center;
`

const PuzzleImagesContainer = styled.div`
    background-color: #14161a;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    overflow-y: scroll;
    margin: 0px 50px 50px 50px;
    padding: 20px;
`

const PuzzleImage = styled.img`
    height: 300px;
    width: 300px;
    min-height: 300px;
    min-width: 300px;
    
    &:hover {
        cursor: pointer;
        outline: 1px solid white;
    }
`


const Home: FC = () => {
    const [images, setImages] = useState(initialImages)
    const navigate = useNavigate();

    const handleClickImage = (imgSrc: string) => {
        console.log('imgSrc', imgSrc)
        navigate('/game', { state: { imgSrc: imgSrc } });

    }

    return (
        <PageContainer>
            <SelectionTitleContainer>
                <TitleText>
                    please select a puzzle image
                </TitleText>
                <PuzzleImagesContainer>
                    {
                        images.map(image => (
                            <PuzzleImage key={image} src={image} onClick={() => handleClickImage(image)} />
                        ))
                    }
                </PuzzleImagesContainer>
            </SelectionTitleContainer>
        </PageContainer>
    );
}

export default Home;
