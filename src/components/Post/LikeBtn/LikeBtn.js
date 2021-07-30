import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../../redux/redux-actions/dataAc';

// Material UI
import IconButton from '@material-ui/core/IconButton';

// Icons
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

class LikeBtn extends Component {
    likedPost = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.postId))
        return true;
        else return false;
    };

    likePost = () => {
        this.props.likePost(this.props.postId);
    }

    unlikePost = () => {
        this.props.unlikePost(this.props.postId);
    }
    render() {
        const likeBtn = this.likedPost() ? (
            <IconButton onClick={this.unlikePost} style={{color: "#000"}}>
                <FavoriteIcon/>
            </IconButton>
        ) : (
            <IconButton onClick={this.likePost} style={{color: "#000"}}>
                <FavoriteBorderIcon/>
            </IconButton>
        )
        return likeBtn;
    }
}

LikeBtn.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likePost, 
    unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(LikeBtn);