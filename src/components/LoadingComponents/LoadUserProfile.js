import React, { Component } from 'react';

// Style
import styled from 'styled-components';

// Breakpoints
import breakpoint from '../../breakpoint/breakpoint';

class LoadUserProfile extends Component {
    render() {
        return (
            <Profile>
                <ProfileImg/>
                <div>
                    <Title/>
                    <Desc/>
                </div>
            </Profile>
        )
    }
}

const Profile = styled.div`
    display: grid;
    grid-template-columns: 350px 1fr;
    grid-gap: 30px;
    @media ${breakpoint.device.laptop}{
        grid-template-columns: 200px 1fr;
    }
    @media ${breakpoint.device.tablet}{
        grid-template-columns: repeat(1, 1fr);
        justify-items: center;
    }
`;

const ProfileImg = styled.img`
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background: #D3D3D3;
    @media ${breakpoint.device.laptop}{
        width: 200px;
        height: 200px;
    }
    
`;

const Title = styled.div`
    width: 220px;
    height: 35px;
    background: #D3D3D3;
    margin-bottom: 25px;
`;

const Desc = styled.div`
    height: 250px;
    background: #D3D3D3;
`;

export default LoadUserProfile;