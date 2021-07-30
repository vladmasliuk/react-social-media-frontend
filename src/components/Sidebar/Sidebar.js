import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import SidebarTop from './SidebarTop';
import Notices from '../Notices/Notices';

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

// Style
import styled from 'styled-components';

// Breakpoints
import breakpoint from '../../breakpoint/breakpoint';

class Sidebar extends Component {

    constructor() {
        super();
        this.state = {
            width: window.innerWidth,
            open: ""
        };
        this._isMounted  = false;
        window.addEventListener("resize", this.updateWidth);
    }

    componentDidMount() {
        this._isMounted  = true;
        if(this._isMounted ){
            this.updateWidth();
        }
    }

    componentWillUnmount() {
        this._isMounted  = false;
      }

    updateWidth = () => {
        this.setState({
            width: window.innerWidth
        });
        if(this.state.width >= 768){
            this.setState({open: "0"})
        } else {
            this.setState({open: "-100%"})
        }
    };

    openMenu = () => {
        if(this.state.width <= 768){
            this.setState({open: "0"})
        }
    };

    closeMenu = () => {
        if(this.state.width <= 768){
            this.setState({open: "-100%"})
        }
    }

    render() { 
        const {authenticated} = this.props;
        const menuType = !authenticated ? "Logout" : null;
        return (
            <SidebarWrap>
                    <MenuBtn>
                        <IconButton onClick={this.openMenu}>
                            <MenuIcon/>
                        </IconButton>
                    </MenuBtn>
                <AppSidebar style={{left: `${this.state.open}`}} type={menuType}>
                    <MenuBtn>
                        <IconButton onClick={this.closeMenu}>
                            <CloseIcon/>
                        </IconButton>
                    </MenuBtn>
                {authenticated ? (
                    <Fragment>
                        <SidebarTop closeMenu={this.closeMenu}/>
                        <List style={{ padding: "16px 0px", width: "100%" }} component="nav" aria-label="main mailbox folders">
                            <Link to="/" style={{color: 'inherit'}} onClick={this.closeMenu}>
                                <ListItem button>
                                    <ListItemIcon> 
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItem>
                            </Link>
                            <Notices/>
                            <Link to="/users" style={{color: 'inherit'}} onClick={this.closeMenu}>
                                <ListItem button>
                                    <ListItemIcon> 
                                        <GroupIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="All Users" />
                                </ListItem>
                            </Link>
                            <Link to="/contact" style={{color: 'inherit'}} onClick={this.closeMenu}>
                                <ListItem button>
                                    <ListItemIcon> 
                                        <GroupIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Contact" />
                                </ListItem>
                            </Link>
                        </List>
                    </Fragment>
                ) : (
                    <List style={{ padding: "16px 0px", width: "100%"}} component="nav" aria-label="main mailbox folders">
                        <Link to="/login" style={{color: 'inherit'}} onClick={this.closeMenu}>
                            <ListItem button>
                                <ListItemIcon> 
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItem>
                        </Link>
                        <Link to="/registration" style={{color: 'inherit'}} onClick={this.closeMenu}>
                            <ListItem button>
                                <ListItemIcon> 
                                    <PersonAddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Registration" />
                            </ListItem>
                        </Link>
                        <Link to="/contact" style={{color: 'inherit'}} onClick={this.closeMenu}>
                            <ListItem button>
                                <ListItemIcon> 
                                    <GroupIcon />
                                </ListItemIcon>
                                <ListItemText primary="Contact" />
                            </ListItem>
                        </Link>
                    </List>
                    )}
                </AppSidebar>
            </SidebarWrap> 
        );
    }
}

const SidebarWrap = styled.div`
    position: relative;
    @media ${breakpoint.device.tablet}{
        width: 100%;
        height: 65px;
        position: fixed;
        top: 0;
        left: 0;
        background: #fff;
        z-index: 1;
        box-shadow: 10px 10px 25px rgb(42 139 242 / 10%), 15px 15px 35px rgb(42 139 242 / 5%), 10px 10px 50px rgb(42 139 242 / 10%);
        display: flex;
        align-items: center;
    }
`;

const AppSidebar = styled.div`
    width: 290px;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    box-shadow: 14.0351px 0px 25px rgba(86, 128, 248, 0.03), 35.0877px 0px 70px rgba(86, 128, 248, 0.05), 23.8596px 5.61404px 50px rgba(0, 0, 0, 0.02);
    overflow: auto;
    background: #fff;
    ${props => props.type ? "display: flex; align-items: center;" : null};
    @media ${breakpoint.device.laptop}{
        width: 200px;
    }
    @media ${breakpoint.device.tablet}{
        width: 290px;
        left: -100%;
        z-index: 1;
        transition: left .3s;
        ${props => props.type ? "display: block;" : null};
    }
    @media ${breakpoint.device.mobile}{
        width: 200px;
    }
`;

const MenuBtn = styled.div`
    display: none;
    @media ${breakpoint.device.tablet}{
        display: flex;
        align-items: center;
        height: 65px;
    }
`;

Sidebar.propTypes = {
    authenticated: PropTypes.bool.isRequired
  };

const mapStateToProps = state =>({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Sidebar);