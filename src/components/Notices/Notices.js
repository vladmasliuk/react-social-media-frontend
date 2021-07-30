import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { markNoticesOpened } from '../../redux/redux-actions/userAc';

// Material UI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

class Notices extends Component {
    state = {
        anchorEl: null
    };
    
    triggerOpen = (event) => {
        this.setState({ anchorEl: event.target });
    };
    
    triggerClose = () => {
        this.setState({ anchorEl: null });
    };

    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notices
            .filter((not) => !not.read)
            .map((not) => not.noticeId);
        this.props.markNoticesOpened(unreadNotificationsIds);
    };

    render() {
        const notices = this.props.notices;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        let noticesIcon;
        if (notices && notices.length > 0) {
            notices.filter((not) => not.read === false).length > 0
            ? (noticesIcon = (
                <Badge
                    badgeContent={
                    notices.filter((not) => not.read === false).length
                    }
                    color="secondary">
                    <NotificationsIcon />
                </Badge>
            )) : (noticesIcon = <NotificationsIcon />);
        } else {
            noticesIcon = <NotificationsIcon />;
        }

        let noticesMarkup = notices && notices.length > 0 ?(
            notices.map((not) => {
              const verb = not.type === 'like' ? 'liked' : 'commented';
              const date = dayjs(not.createDate).fromNow();
              const iconColor = not.read ? 'primary' : 'secondary';
              const icon = not.type === 'like' ? (
                  <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
                ) : (
                  <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
                );

                return (
                    <MenuItem key={not.createDate} onClick={this.triggerClose}>
                        {icon}
                        <Link
                            style={{color: "#000"}}
                            to={`/users/${not.receiver}/post/${not.postId}`}
                        >
                            {not.shipper} {verb} your post {date}
                        </Link>
                    </MenuItem>
                  );
            })
        ) : (
                <MenuItem onClick={this.triggerClose}>
                    You dont have any notifications :(
                </MenuItem>
            );

        return (
            <Fragment>
                <ListItem button aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.triggerOpen}>
                    <ListItemIcon>
                        {noticesIcon}
                    </ListItemIcon>
                    <ListItemText primary="Notifications" />
                    <ListItemSecondaryAction>
                        <ArrowRightIcon style={{color: "#707070"}}/>
                    </ListItemSecondaryAction>
                </ListItem>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.triggerClose}
                    onEntered={this.onMenuOpened}
                    >
                    {noticesMarkup}
                </Menu>
            </Fragment>
        )
    }
}

Notices.propTypes = {
    markNoticesOpened: PropTypes.func.isRequired,
    notices: PropTypes.array.isRequired
};
    
const mapStateToProps = (state) => ({
    notices: state.user.notices
});

export default connect(mapStateToProps, { markNoticesOpened })(Notices);