import React, { Component } from 'react';

// Styled
import styled from 'styled-components';

// Breakpoints
import breakpoint from '../../breakpoint/breakpoint';

class LoadPostCard extends Component {
    render() {
        return (
            <Post>
                <PostUserData>
                    <PostImg />
                    <PostUserName/>
                </PostUserData>
                <PostText />
            </Post>
        )
    }
}

const Post = styled.div`
    width: 50%;
    padding: 40px;
    margin-bottom: 20px;
    border-radius: 6px;
    background: #F0F0F0;
    @media ${breakpoint.device.laptop}{
        width: calc(100% - 80px);
    }
`;

const PostUserData = styled.div`
    display: flex;
    align-items: flex-start;
`;

const PostImg = styled.div`
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin-right: 10px;
    background: #D3D3D3;
`;

const PostUserName = styled.div`
    width: 50px;
    height: 20px;
    background: #D3D3D3;
`;

const PostText = styled.div`
    width: 100%;
    height: 100px;
    background: #D3D3D3;
    margin-top: 20px;
`;

export default LoadPostCard;