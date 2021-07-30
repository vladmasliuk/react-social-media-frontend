import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { deletePost } from '../../../redux/redux-actions/dataAc';

// Material UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

// Icons
import CloseIcon from '@material-ui/icons/Close';

class DeletePost extends Component {
    state = {
        open: false
    };
    
    triggerOpen = () => {
        this.setState({open: true});
    };

    triggerClose = () => {
        this.setState({open: false});
    };

    deletePost = () => {
        this.props.deletePost(this.props.postId);
        this.setState({open: false});
    }
    render() {
        return (
            <Fragment>
                {/* button */}
                <IconButton onClick={this.triggerOpen}>
                    <CloseIcon fontSize="small"/>
                </IconButton>
                {/* modal */}
                <Dialog
                    open={this.state.open}
                    onClose={this.triggerClose}
                    fullWidth
                    maxWidth="md"
                >
                    <DialogTitle>
                        You want to delete this post ?
                    </DialogTitle>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.triggerClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.deletePost}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeletePost.propTypes = {
    postId: PropTypes.string.isRequired,
    deletePost: PropTypes.func.isRequired
}

export default connect(null, {deletePost})(DeletePost);