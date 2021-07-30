import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// Redux
import {connect} from 'react-redux';

// Components
import Title from '../GeneralComponents/Title';
import AddPostBtn from '../Post/AddPostBtn/AddPostBtn';

// Style
import styled from 'styled-components';

// Breakpoints
import breakpoint from '../../breakpoint/breakpoint';

const UserProfile = (props) => {
    const {
        profile: { name, createDate, imgUrl, about, localization, email },
        user: { details }
    } = props;

    const addPost = name === details.name ? (
        <AddPostBtn/>
    ) : (
        null
    )

    return(
        <Profile>
            <ProfileImg src={imgUrl} alt={name}/>
            <div>
                <Title title={name}/>
                {about && (
                    <Desc>
                        <DescTitle>About</DescTitle>
                        <DescText>{about}</DescText>
                    </Desc>
                )}
                {localization && (
                    <Desc>
                        <DescTitle>Localization</DescTitle>
                        <DescText>{localization}</DescText>
                    </Desc>
                )}
                <Desc>
                    <DescTitle>E-mail</DescTitle>
                    <DescText>{email}</DescText>
                </Desc>
                <Desc>
                    <DescTitle>Joined</DescTitle>
                    <DescText>{dayjs(createDate).format('MMM YYYY')}</DescText>
                </Desc>
                <ButtonWrap>
                    {addPost}
                </ButtonWrap>
            </div>
        </Profile>
    )
}

const Profile = styled.div`
    display: flex;
    @media ${breakpoint.device.tablet}{
        display: block;
        text-align: center;
    }
`;

const Desc = styled.div`
    display: flex;
    align-items: center;
    @media ${breakpoint.device.tablet}{
        display: block;
    }
`;

const ProfileImg = styled.img`
    width: 350px;
    height: 350px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 30px;
    @media ${breakpoint.device.laptop}{
        width: 200px;
        height: 200px;
    }
    @media ${breakpoint.device.tablet}{
        margin-right: 0;
    }
`;

const DescTitle = styled.h4`
    margin: 0 20px 0 0;
    text-transform: uppercase;
    letter-spacing: 2px;
    @media ${breakpoint.device.tablet}{
        margin: 0;
    }
`;

const DescText = styled.p`
    color: #707C97;
`;

const ButtonWrap = styled.div`
    margin-top: 20px;
`;

UserProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect( mapStateToProps )(UserProfile);