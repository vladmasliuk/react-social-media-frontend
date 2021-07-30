import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {addPost, removeError} from '../../../redux/redux-actions/dataAc';

// Components
import BtnLoader from '../../GeneralComponents/BtnLoader';
import ErrorAlert from '../../GeneralComponents/ErrorAlert';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

// Icons
import AddIcon from '@material-ui/icons/Add';

class AddPostBtn extends Component {
    state = {
        open: false,
        content: '',
        errors: {} 
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
            errors: nextProps.UI.errors
            });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ content: '', open: false, errors: {} });
        }
    }

    triggerOpen = () => {
        this.setState({ open: true });
    };
    
    triggerClose = () => {
        this.props.removeError();
        this.setState({ open: false, errors: {} });
    };

    formChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    formSubmit = (event) => {
        event.preventDefault();
        this.props.addPost({ content: this.state.content });
    }; 
    render() {
        const { errors } = this.state;
        const {UI: { loading } } = this.props;
        return (
            <Fragment>
                {/* button */}
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={this.triggerOpen}
                    style={{marginBottom: 20}}
                >
                    Add Post
                    <AddIcon/>
                </Button>
                {/* modal */}
                <Dialog open={this.state.open} onClose={this.triggerClose} fullWidth maxWidth="md">
                    <DialogTitle>
                        Add new post
                    </DialogTitle>
                    <form onSubmit={this.formSubmit}>
                        <DialogContent>
                            <TextField 
                                style={{width: "100%"}}
                                name="content"
                                id="content"
                                multiline
                                rows={5}
                                label="Content"
                                variant="outlined"
                                onChange={this.formChange}
                            />
                            <ErrorAlert error={errors.content}/>
                        </DialogContent>
                        <DialogActions>
                            <Button 
                                variant="contained" 
                                color="secondary"
                                onClick={this.triggerClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                            >
                                Add Post
                                {loading && (
                                    <BtnLoader/>
                                )}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Fragment>
        )
    }
}

AddPostBtn.propTypes = {
    addPost: PropTypes.func.isRequired,
    removeError: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
};
  

const mapStateToProps = (state) => ({
    UI: state.UI
});
  
export default connect(mapStateToProps, {addPost, removeError})(AddPostBtn);