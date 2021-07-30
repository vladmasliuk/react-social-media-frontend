import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { addComment } from '../../../redux/redux-actions/dataAc';

// Components
import ErrorAlert from '../../GeneralComponents/ErrorAlert';

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Style
import styled from 'styled-components';

class AddComment extends Component {
    state = {
        content: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ content: '' });
        }
    }

    formChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
      
    formSubmit = (event) => {
        event.preventDefault();
        this.props.addComment(this.props.postId, { content: this.state.content });
    };

    render() {
        const errors = this.state.errors;
        return(
            <AddCommentWrap>
                <form onSubmit={this.formSubmit}>
                <TextField
                    id="content"
                    name="content"
                    label="Comment"
                    type="text"
                    value={this.state.content}
                    onChange={this.formChange}
                    style={{width: "100%"}}
                />
                <ErrorAlert error={errors.comment}/>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Add Comment
                </Button>
                </form>
            </AddCommentWrap>
        )
    }
}

const AddCommentWrap = styled.div`
    margin: 20px 0;
`;

AddComment.propTypes = {
    addComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
};
  
const mapStateToProps = (state) => ({
    UI: state.UI,
});
  
export default connect(mapStateToProps, {addComment})(AddComment);