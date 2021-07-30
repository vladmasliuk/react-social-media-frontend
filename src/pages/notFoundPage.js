import React, { Component } from 'react';

// Style
import styled from 'styled-components'

// Banner
import notFoundBd from '../assets/img/404.jpg'

class notFoundPage extends Component {
    render() {
        return (
            <Bg>
                <Title>Page not found</Title>
            </Bg>
        )
    }
}

const Bg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${notFoundBd});
    position: relative;
    &:before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .4);
    }
`;

const Title = styled.h1`
    font-size: 6vw;
    margin: 0;
    color: rgba(255, 255, 255, .6);
    text-transform: uppercase;
    letter-spacing: 20px;
    z-index: 1;
`;

export default notFoundPage;