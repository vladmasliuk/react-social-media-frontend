import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Redux
import { connect } from 'react-redux';
import { getPostDetails, removeError } from '../../../redux/redux-actions/dataAc';

// Components
import ViewComments from '../ViewComments/ViewComments';
import AddComment from '../AddComment/AddComment';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

// Style
import styled from 'styled-components';

// Loading
import LoadPostDetails from '../../LoadingComponents/LoadPostDetails';

// Breakpoints
import breakpoint from '../../../breakpoint/breakpoint';

class PostDetails extends Component {
    state = {
        open: false,
        normalWay: '',
        newWay: ''
    }

    componentDidMount(){
        if(this.props.openModalWindow){
            this.triggerOpen();
        }
    };

    triggerOpen = () => {
        let normalWay = window.location.pathname;

        const { user, postId } = this.props;
        const newWay = `/users/${user}/post/${postId}`;
    
        if (normalWay === newWay) normalWay = `/users/${user}`;
    
        window.history.pushState(null, null, newWay);

        this.setState({open: true, normalWay, newWay});
        this.props.getPostDetails(this.props.postId);
    }

    triggerClose = () => {
        window.history.pushState(null, null, this.state.normalWay);
  
        this.setState({open: false});
        this.props.removeError();
    }

    render() {
        const {
            post: {
                postId,
                content,
                createDate,
                userImg,
                user,
                comments
            },
            UI: { 
                loading 
            }
        } = this.props;

        const postDetMark = loading ? (
            <LoadPostDetails/>
        ) : (
            <PostModal>
                <UserImg src={userImg} alt={user}/>
                <div>
                    <Link to={`/users/${user}`} style={{ color: "#0D1C2E"}}>
                        <UserName>{user}</UserName>
                    </Link>
                    <PostText>
                        {dayjs(createDate).format('h:mm a, MMMM DD YYYY')}
                    </PostText>
                    <PostText>
                        {content}
                    </PostText>
                    <AddComment postId={postId}/>
                    <ViewComments comments={comments}/>
                </div>
            </PostModal>
        )
        return (
            <Fragment>
                {/* button */}
                <IconButton onClick={this.triggerOpen} style={{color: "#000"}}>
                    <ChatIcon/>
                </IconButton>
                {/* modal */}
                <Dialog 
                    open={this.state.open}
                    onClose={this.triggerClose}
                    fullWidth
                    maxWidth="md"
                >
                    <DialogContent style={{padding: 50}}>
                        {postDetMark}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

const PostModal = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 50px;
    @media ${breakpoint.device.tablet}{
        grid-template-columns: repeat(1, 1fr);
        justify-items: center;
    }
    @media ${breakpoint.device.mobile}{
        grid-gap: 20px;
    }
`;

const UserImg = styled.img`
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
    @media ${breakpoint.device.laptop}{
        width: 250px;
        height: 250px;
    }
    @media ${breakpoint.device.mobile}{
        width: 150px;
        height: 150px;
    }
`;

const UserName = styled.h2`
    font-size: 23px;
    text-transform: capitalize;
`;

const PostText = styled.p`
    color: #707C97;
`;

PostDetails.propTypes = {
    removeError: PropTypes.func.isRequired,
    getPostDetails: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.data.post,
    UI: state.UI
});

const mapActionsToProps = {
    getPostDetails,
    removeError,
};

export default connect( mapStateToProps, mapActionsToProps)(PostDetails);