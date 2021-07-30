import React from 'react';
import PropTypes from 'prop-types';

// Style
import styled from 'styled-components';

// Breakpoints
import breakpoint from '../../breakpoint/breakpoint';

const PageBanner = ({background, title}) => {
    return (
        <Banner style={{backgroundImage: `url(${background})`}}>
            <BanerText>{title}</BanerText>
        </Banner>
    )
};

const Banner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    text-align: center;
    &:before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .4);
    }
    @media ${breakpoint.device.mobile}{
        height: 200px;
    }
`;

const BanerText = styled.h1`
    font-size: 5vw;
    margin: 0;
    color: rgba(255, 255, 255, .6);
    text-transform: uppercase;
    letter-spacing: 20px;
    z-index: 0;
    @media ${breakpoint.device.tablet}{
        font-size: 10vw;
    }
`;

PageBanner.propTypes = {
    background: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default PageBanner;