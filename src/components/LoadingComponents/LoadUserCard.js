import React, { Component } from 'react';

// Style
import styled from 'styled-components';

class LoadUserCard extends Component {
    render() {
        return (
            <Card>
                <div>
                    <UserImg/>
                    <UserText/>
                    <UserText/>
                </div>
            </Card>
        )
    }
}

const Card = styled.div`
    padding: 20px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F0F0F0;
`;

const UserImg = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #D3D3D3;
    margin-bottom: 20px;
`;

const UserText = styled.div`
    width: 100%;
    height: 20px;
    background: #D3D3D3;
    margin-bottom: 20px;
`;

export default LoadUserCard