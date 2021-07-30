import React, { Component } from 'react';

// Style
import styled from 'styled-components';

// Breakpoints
import breakpoint from '../../breakpoint/breakpoint';

class LoadSidebarTop extends Component {
    render() {
        return (
            <SdProfile>
                <div>
                    <SdImg/>
                    <SdButton/>
                </div>
            </SdProfile>
        )
    }
}

const SdProfile = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 80px;
    @media ${breakpoint.device.tablet}{
        margin-top: 30px;
    }
`;

const SdImg = styled.div`
    width: 95px;
    height: 95px;
    border-radius: 50%;
    background: #D3D3D3;
    @media ${breakpoint.device.mobile}{
        width: 50px;
        height: 50px;
    }
`;

const SdButton = styled.div`
    width: 85px;
    height: 30px;
    margin-top: 30px;
    margin-bottom: 20px;
    background: #D3D3D3;
`;

export default LoadSidebarTop