import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Redux
import {connect} from 'react-redux';
import {getUserProfile} from '../redux/redux-actions/dataAc';

// Components
import PageContainer from '../components/GeneralComponents/PageContainer';
import PageBanner from '../components/GeneralComponents/PageBanner';
import PageWrap from '../components/GeneralComponents/PageWrap';
import UserProfile from '../components/UserProfile/UserProfile';
import PostCard from '../components/Post/PostCard/PostCard';

// Banner
import ProfileBg from '../assets/img/profile.jpg'

// Style
import styled from 'styled-components';

// Loading
import LoadUserProfile from '../components/LoadingComponents/LoadUserProfile';
import LoadPostCard from '../components/LoadingComponents/LoadPostCard';

class userPage extends Component {
    state = {
        profile: null,
        postIdParam: null,
    };

    componentDidMount() {
        const user = this.props.match.params.name;
        const postId = this.props.match.params.postId;
    
        if (postId) this.setState({ postIdParam: postId });

        this.props.getUserProfile(user);

        axios.get(`/user/${user}`)
            .then((res) => {
                this.setState({
                    profile: res.data.user
                });
            })
            .catch((err) => console.log(err));
    }

    render() {
        const { posts, loading } = this.props.data;
        const { postIdParam } = this.state;

        const postsMarkup  = loading ? (
            <div>
                <LoadPostCard/>
                <LoadPostCard/>
            </div>
        ) : posts === null ? (
            null
        ) : !postIdParam ? (
            posts.map((post) => <PostCard key={post.postId} post={post}/>)
        ) : (
          posts.map((post) => {
            if(post.postId !== postIdParam)
                return <PostCard key={post.postId} post={post}/>
            else return <PostCard key={post.postId} post={post} openModalWindow/>
          }) 
        )
        return (
            <PageContainer>
                <PageBanner background={ProfileBg} title="Profile"/>
                <PageWrap>
                    {this.state.profile === null ? (
                        <LoadUserProfile/>
                    ) : (
                        <UserProfile profile={this.state.profile}/>
                    )}
                    <UserPostsWrap>
                        {postsMarkup}
                    </UserPostsWrap>
                </PageWrap>
            </PageContainer>
        )
    }
}

const UserPostsWrap = styled.div`
    margin-top: 50px;
`;

userPage.propTypes = {
    getUserProfile: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect( mapStateToProps, {getUserProfile})(userPage);