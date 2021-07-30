import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'; 

// Components
import DeletePost from '../DeletePost/DeletePost';
import LikeBtn from '../LikeBtn/LikeBtn';
import PostDetails from '../PostDetails/PostDetails';

// Dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Redux
import { connect } from 'react-redux';

// Style
import styled from 'styled-components';

// Breakpoints
import breakpoint from '../../../breakpoint/breakpoint';

class PostCard extends Component {
    render() {
        dayjs.extend(relativeTime);

        const {
            post: {
                content, postId, createDate, userImg, user, likeTotal, commentTotal
            },
            user: {authenticated, details: {name} }
        } = this.props;

        const deletePostBtn = authenticated && user === name ? (
            <DeletePost postId={postId}/>
        ) : null;

        const likeTotalWord = likeTotal === 1 ? (
            "like"
        ) : (
            "likes"
        );

        const commentTotalWord = commentTotal === 1 ? (
            "comment"
        ) : (
            "comments"
        );

        return (
            <Post>
                {/* Delete post */}
                <DelPost>
                    {deletePostBtn}
                </DelPost>
                {/* Top */}
                <PostCardBar>
                    <PostUserData>
                        <Link to={`/users/${user}`}>
                            <PostImg src={userImg} alt={user} />
                        </Link>
                        <Link style={{color: '#000'}} to={`/users/${user}`}>
                            <PostUserName>
                                {user}
                            </PostUserName>
                        </Link>
                    </PostUserData>
                    <PostText>
                        {dayjs(createDate).fromNow()}
                    </PostText>
                </PostCardBar>
                {/* Middle */}
                <PostText>
                    {content}
                </PostText>
                {/* Bottom */}
                <PostCardBar style={{marginTop: 30}}>
                    <PostBottomAc>
                        <LikeBtn postId={postId}/>
                        {likeTotal} {likeTotalWord}
                    </PostBottomAc>
                    <PostBottomAc>
                        <PostDetails postId={postId} user={user} openModalWindow={this.props.openModalWindow}/>
                        {commentTotal} {commentTotalWord}
                    </PostBottomAc>
                </PostCardBar>
            </Post>
        )
    }
}

const Post = styled.div`
    width: 50%;
    padding: 40px;
    margin-bottom: 20px;
    background: #ffff;
    border-radius: 6px;
    box-shadow: 10px 10px 25px rgba(42, 139, 242, 0.1), 
    15px 15px 35px rgba(42, 139, 242, 0.05), 
    10px 10px 50px rgba(42, 139, 242, 0.1);
    @media ${breakpoint.device.laptop}{
        width: calc(100% - 80px);
    }
`;

const DelPost = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const PostCardBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PostUserData = styled.div`
    display: flex;
    align-items: flex-start;
`;

const PostImg = styled.img`
    width: 55px;
    height: 55px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`;

const PostUserName = styled.h4`
    margin: 0;
    font-weight: 500;
`;

const PostText = styled.p`
    color: #707C97;
`;

const PostBottomAc = styled.div`
    display: flex;
    align-items: center;
`;

PostCard.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    openModalWindow: PropTypes.bool
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(PostCard);