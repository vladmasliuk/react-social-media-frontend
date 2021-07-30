import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {editData} from '../../redux/redux-actions/userAc';

// Material ui
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Icons
import EditIcon from '@material-ui/icons/Edit';

class EditUserData extends Component {
    state = {
        about: '',
        localization: '',
        open: false
    };

    setUsDataState = (details) => {
        this.setState ({
            about: details.about ? details.about : '',
            localization: details.localization ? details.localization : ''
        });
    };

    modalEditOpen = () =>{
        this.setState({open:true});
        this.setUsDataState(this.props.details);
    };

    modalEditClose = () =>{
        this.setState({open:false});
        this.props.triggerCloseEdit();
    };

    componentDidMount(){
        const { details } = this.props;
        this.setUsDataState(details);
    };

    formChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };

    formSubmit = () => {
        const userDetails = {
            about: this.state.about,
            localization: this.state.localization
        };
        this.props.editData(userDetails);
        this.modalEditClose(); 
    };

    render() {
        return (
            <Fragment>
                <MenuItem
                    onClick={this.modalEditOpen}>
                    <ListItemIcon style={{minWidth: 30}}>
                        <EditIcon/>
                    </ListItemIcon>
                    Edit profile data
                </MenuItem>

                <Dialog open={this.state.open} onClose={this.modalEditClose} fullWidth maxWidth="md">
                    <DialogTitle>Edit your data</DialogTitle>
                    <DialogContent style={{ padding: '20px 24px 20px 24px' }}>
                        <form>
                            <TextField
                                style={{width: "100%", marginBottom: 20}}
                                id="about"
                                name="about"
                                label="About information"
                                multiline
                                rows={5}
                                value={this.state.about}
                                onChange={this.formChange}
                                variant="outlined"
                            />
                            <TextField
                                style={{width: "100%"}}
                                id="localization"
                                name="localization"
                                type="text"
                                label="Localization"
                                variant="outlined"
                                value={this.state.localization}
                                onChange={this.formChange}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={this.modalEditClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.formSubmit}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditUserData.propTypes = { 
    editData: PropTypes.func.isRequired
};
  
const mapStateToProps = (state) => ({
    details: state.user.details
});

export default connect(mapStateToProps, {editData})(EditUserData);