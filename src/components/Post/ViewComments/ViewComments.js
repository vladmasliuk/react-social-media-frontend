import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Style
import styled from 'styled-components';

class ViewComments extends Component {
    render() {
        const { comments } = this.props;
        let commentsMarkup = comments ? (
            comments.map((comment) => 
                <Comment key={comment.createDate}>
                    <Link to={`/users/${comment.user}`}>
                        <UserImage src={comment.userImg} alt={comment.user}/>
                    </Link>
                    <div>
                        <Link to={`/users/${comment.user}`} style={{color: "#000"}}>
                            <UserName>{comment.user}</UserName>
                        </Link>
                        <CommentText CommentDate>
                            {dayjs(comment.createDate).format('h:mm a, MMMM DD YYYY')}
                        </CommentText>
                        <CommentText>
                            {comment.content}
                        </CommentText>
                    </div>
                </Comment>
            )
        ) : null
        return (
            <div>
                {commentsMarkup}
            </div>
        )
    }
}

const Comment = styled.div`
    display: flex;
    padding: 20px 0;
    &:not(:last-child) {
        border-bottom: 1px solid rgba(0, 0, 0, .1);
    }
`;

const UserImage = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
`;

const UserName = styled.h4`
    margin: 0;
    font-weight: 500;
`;

const CommentText = styled.p`
    color: #707C97;
    ${props => props.CommentDate ? "font-size: 14px; margin: 5px 0;" : null};
`;

ViewComments.propTypes = {
    comments: PropTypes.array
};

export default ViewComments;