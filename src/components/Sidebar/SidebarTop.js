import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import { uploadProfileImg, exitUs } from '../../redux/redux-actions/userAc'

// Components
import EditUserData from '../EditUserData/EditUserData';

// Material ui
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// Style
import styled from 'styled-components';

// Icons
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ImageIcon from '@material-ui/icons/Image';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

// Loading
import LoadSidebarTop from '../LoadingComponents/LoadSidebarTop';

// Breakpoints
import breakpoint from '../../breakpoint/breakpoint';


class SidebarTop extends Component {

    // user menu
    state = {
        anchorEl: null
    };

    triggerOpen = (event) => {
        this.setState({ anchorEl: event.target });
    };
    
    triggerClose = () => {
        this.setState({ anchorEl: null });
    };

    // trigger "click" on input
    inputClickEventTrigger = () => {
        this.inputElement.click();
    };

    // change image
    profileImgChange = (event) => {
        const img = event.target.files[0];
        const formData = new FormData();
        formData.append('img', img, img.name);
        this.props.uploadProfileImg(formData);
    };

    // on change img
    changeImgClick = () =>{
        this.inputClickEventTrigger();
        this.triggerClose();
    }

    // logout
    exitUsTrigger = () => {
        // this.props.exitUs();
        this.props.exitUs();
        this.props.closeMenu();
    };

    render() {
        const anchorEl = this.state.anchorEl;

        const {user: {details : {name, imgUrl}, loading, authenticated}} = this.props;

        let profileTop =!loading ? (authenticated ? (
            <Fragment>
                <SdProfile>
                    {/* image */}
                    <SdImg src={imgUrl} alt={name}/>
                    <input style={{display: "none"}} type="file" id="imgProfile" ref={input => this.inputElement = input} onChange={this.profileImgChange}/>
                    {/* user menu */}
                    <div>
                        <Button
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true" onClick={this.triggerOpen}
                            endIcon={<ArrowDropDownIcon />}
                        >
                            <h3>{name}</h3>
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.triggerClose}
                        >
                            <MenuItem 
                                onClick={this.triggerClose}>
                                <Link 
                                    to={`/users/${name}`}
                                    style={{color: "#000", display: "flex", alignItems: "center"}}
                                    onClick={this.props.closeMenu}
                                >
                                    <ListItemIcon style={{minWidth: 30}}>
                                        <AccountBoxIcon/>
                                    </ListItemIcon>
                                    View profile
                                </Link>
                            </MenuItem>
                            <EditUserData triggerCloseEdit={this.triggerClose}/>
                            <MenuItem
                                onClick={this.changeImgClick}>
                                <ListItemIcon style={{minWidth: 30}}>
                                    <ImageIcon/>
                                </ListItemIcon>
                                Change Image
                            </MenuItem>
                            <MenuItem 
                                onClick={this.exitUsTrigger}>
                                <ListItemIcon style={{minWidth: 30}}>
                                    <PowerSettingsNewIcon/>
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </SdProfile>
            </Fragment>
        ):(
            null
        )) : (<LoadSidebarTop/>)

        return profileTop;
    }
}

const SdProfile = styled.div`
    text-align: center;
    margin-top: 80px;
    @media ${breakpoint.device.tablet}{
        margin-top: 30px;
    }
`;

const SdImg = styled.img`
    width: 95px;
    height: 95px;
    object-fit: cover;
    border-radius: 50%;
    @media ${breakpoint.device.mobile}{
        width: 50px;
        height: 50px;
    }
`;

SidebarTop.propTypes = {
    user: PropTypes.object.isRequired,
    exitUs: PropTypes.func.isRequired,
    uploadProfileImg: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    exitUs, 
    uploadProfileImg
}

export default connect(mapStateToProps, mapActionsToProps)(SidebarTop);