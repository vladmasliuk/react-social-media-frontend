import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import PageContainer from '../components/GeneralComponents/PageContainer';
import PageWrap from '../components/GeneralComponents/PageWrap';
import PageBanner from '../components/GeneralComponents/PageBanner';
import AddPostBtn from '../components/Post/AddPostBtn/AddPostBtn'
import PostCard from '../components/Post/PostCard/PostCard';

// Redux
import {connect} from 'react-redux';
import {getPosts} from '../redux/redux-actions/dataAc';

// Banner
import HomeBg from '../assets/img/home.jpg'

// Loading
import LoadPostCard from '../components/LoadingComponents/LoadPostCard';

class homePage extends Component {
    componentDidMount(){
        this.props.getPosts();
    }
    render() {
        const {posts , loading} = this.props.data;
        let latestPosts = !loading ? (
            posts.map((post) => <PostCard key={post.postId} post={post}/>)
        ) : (
            <div>
                <LoadPostCard/>
                <LoadPostCard/>
            </div>
        ) 
        return (
            <PageContainer>
                <PageBanner background={HomeBg} title="Posts"/>
                <PageWrap>
                    <AddPostBtn/>
                    <div className="posts-loop-wrap">
                        {latestPosts}
                    </div>
                </PageWrap>
            </PageContainer>
        )
    }
}

homePage.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, {getPosts})(homePage);