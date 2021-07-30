import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// Style
import styled from 'styled-components';

class UserCard extends Component {
    render() {
        const {
            usercard: {
                imgUrl, name, email
            }
        } = this.props;

        return (
            <Card>
                <Link to={`users/${name}`} style={{color: "#000"}}>
                    <UserImg src={imgUrl} alt={name}/>
                    <h3>{name}</h3>
                </Link>
                <UserEmail>{email}</UserEmail>
            </Card>
        )
    }
}

const Card = styled.div`
    text-align: center;
    padding: 20px 40px;
    transition: box-shadow .3s;
    &:hover{
        box-shadow: 10px 10px 25px rgb(42 139 242 / 10%),
        15px 15px 35px rgb(42 139 242 / 5%),
        10px 10px 50px rgb(42 139 242 / 10%);
    }
`;

const UserImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
`;

const UserEmail = styled.p`
    color: #707C97;
`;

export default UserCard;