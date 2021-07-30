import React, { Component } from 'react';
import PropTypes from 'prop-types';

// redux
import {connect} from 'react-redux';
import {getUsers} from '../redux/redux-actions/dataAc';

// Components
import PageContainer from '../components/GeneralComponents/PageContainer';
import PageWrap from '../components/GeneralComponents/PageWrap';
import PageBanner from '../components/GeneralComponents/PageBanner';
import UserCard from '../components/UserCard/UserCard';

// Material UI
import TextField from '@material-ui/core/TextField';

// Style
import styled from 'styled-components';

// Banner
import UsersBg from '../assets/img/users.jpg'

// Loading
import LoadUserCard from '../components/LoadingComponents/LoadUserCard';

// Breakpoints
import breakpoint from '../breakpoint/breakpoint';

class allUsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };
    }

    updateSearch = e => {
        this.setState({ search: e.target.value });
    };

    componentDidMount(){
        this.props.getUsers();
    }
    render() {
        const {users, loading} = this.props.data;
        let filteredUsers = users.filter(users => {
            return users.name
                .toString()
                .toLowerCase()
                .includes(this.state.search.toLowerCase());
        });

        let allUsers = !loading ? (
            filteredUsers.map((usercard) => 
                <UserCard key={usercard.userId} usercard={usercard}/>
            )
        ) : (
            <div>
                <LoadUserCard/>
            </div>
        )
        return (
            <PageContainer>
                <PageBanner background={UsersBg} title="Users"/>
                <PageWrap>
                    <SearchBlock>
                        <TextField
                            id="search"
                            name="search"
                            label="Search by name"   
                            value={this.state.search}
                            onChange={this.updateSearch}
                            style={{width: "100%"}}
                        />
                    </SearchBlock>
                    <UsersLoop>
                        {allUsers}
                    </UsersLoop>
                </PageWrap>
            </PageContainer>
        )
    }
}

const UsersLoop = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 30px;
    justify-items: center;
    @media ${breakpoint.device.tablet}{
        grid-template-columns: repeat(2, 1fr);
    }
    @media ${breakpoint.device.mobile}{
        grid-template-columns: repeat(1, 1fr);
    }
`;

const SearchBlock = styled.div`
    margin-bottom: 50px;
`;

allUsersPage.propTypes = {
    getUsers: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
}
  
const mapStateToProps = (state) => ({
    data: state.data,
});
  
export default connect(mapStateToProps, {getUsers})(allUsersPage);