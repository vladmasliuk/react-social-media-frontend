import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {registrationUs} from '../redux/redux-actions/userAc';

// Components
import PageWrap from '../components/GeneralComponents/PageWrap';
import Title from '../components/GeneralComponents/Title';
import ErrorAlert from '../components/GeneralComponents/ErrorAlert';
import FormLink from '../components/GeneralComponents/FormLink';
import BtnLoader from '../components/GeneralComponents/BtnLoader';

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Style
import styled from 'styled-components';

// Video
import VideoUrl from '../assets/video/video-bg.mp4';

// Breakpoints
import breakpoint from '../breakpoint/breakpoint';

class registrationPage extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confPassword: '',
            name: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }
    };

    regSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const regUserData = {
            email: this.state.email,
            password: this.state.password,
            confPassword: this.state.confPassword,
            name: this.state.name
        }
        this.props.registrationUs(regUserData, this.props.history);
    };

    formChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    render() {
        const {UI:{loading}} = this.props;
        const {errors} = this.state;
        return (
            <PageWrap>
                <FormPage>
                    {/* video bg */}
                    <VideoBg>
                        <Video autoPlay muted loop>
                            <source src={VideoUrl} type="video/mp4"/>
                        </Video>
                    </VideoBg>
                    {/* Reg form */}
                    <FormWrap>
                        <Title title="Registration"/>
                        <form noValidate onSubmit={this.regSubmit}>
                            <InputWrap>
                                <TextField
                                    style={{width: "100%"}}
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="E-mail"
                                    value={this.state.email}
                                    onChange={this.formChange} 
                                />
                                <ErrorAlert error={errors.email}/>
                            </InputWrap>
                            <InputWrap>
                                <TextField
                                    style={{width: "100%"}}
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    value={this.state.password}
                                    onChange={this.formChange} 
                                />
                                <ErrorAlert error={errors.password}/>
                            </InputWrap>
                            <InputWrap>
                                <TextField
                                    style={{width: "100%"}}
                                    id="confPassword"
                                    name="confPassword"
                                    type="password"
                                    label="Confirm Password"
                                    value={this.state.confPassword}
                                    onChange={this.formChange} 
                                />
                                <ErrorAlert error={errors.confPassword}/>
                            </InputWrap>
                            <InputWrap>
                                <TextField
                                    style={{width: "100%"}}
                                    id="name"
                                    name="name"
                                    type="text"
                                    label="Name / Login"
                                    value={this.state.name}
                                    onChange={this.formChange} 
                                />
                                <ErrorAlert error={errors.name}/>
                            </InputWrap>
                            {errors.general && (
                                <ErrorAlert error={errors.general}/>
                            )}
                            <InputWrap>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Submit
                                    {loading && (
                                        <BtnLoader/>
                                    )}
                                </Button>
                            </InputWrap>
                            <FormLink>
                                You can login <Link style={{color: "#3f51b5"}} to="/login">here</Link>.
                            </FormLink>
                        </form>
                    </FormWrap>
                </FormPage>
            </PageWrap>
        )
    }
}

const FormPage = styled.div`
    width: 100%;
    height: calc(100vh - 130px);
    display: flex;
    align-items: center;
`;

const VideoBg = styled.div`
    width: calc(100vw - 290px);
    height: 100vh;
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    @media ${breakpoint.device.laptop}{
        width: calc(100vw - 200px);
    }
    @media ${breakpoint.device.tablet}{
        width: 100vw;
    }
`;

const Video = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const FormWrap = styled.div`
    z-index: 0;
    width: 30%;
    background: #fff;
    padding: 50px;
    border-radius: 6px;
    @media ${breakpoint.device.laptop}{
        width: 70%;
    }
    @media ${breakpoint.device.tablet}{
        width: 100%;
    }
`;

const InputWrap = styled.div`
    margin-bottom: 20px;
`;


registrationPage.propTypes = {
    registrationUs: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, {registrationUs})(registrationPage);