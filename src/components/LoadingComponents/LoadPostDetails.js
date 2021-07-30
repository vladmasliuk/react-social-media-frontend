import React, { Component } from 'react'

// Styled
import styled from 'styled-components';

// Breakpoints
import breakpoint from '../../breakpoint/breakpoint';

class LoadPostDetails extends Component {
    render() {
        return (
            <PostModal>
                <UserImg/>
                <div>
                    <UserName/>
                    <PostText/>
                </div>
            </PostModal>
        )
    }
}

const PostModal = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 50px;
    @media ${breakpoint.device.tablet}{
        grid-template-columns: repeat(1, 1fr);
        justify-items: center;
    }
    @media ${breakpoint.device.mobile}{
        grid-gap: 20px;
    }
`;

const UserImg = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: #D3D3D3;
    @media ${breakpoint.device.laptop}{
        width: 250px;
        height: 250px;
    }
    @media ${breakpoint.device.mobile}{
        width: 150px;
        height: 150px;
    }
`;

const UserName = styled.h2`
    width: 250px;
    height: 30px;
    margin-bottom: 30px;
    background: #D3D3D3;
`;

const PostText = styled.p`
    width: 100%;
    height: 170px;
    background: #D3D3D3;
`;

export default LoadPostDetails;
