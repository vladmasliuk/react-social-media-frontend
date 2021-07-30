import React from 'react';
import PropTypes from 'prop-types';

// Style
import styled from 'styled-components'

const ErrorAlert = ({error}) => {
    return (
        <Error>
            {error}
        </Error>
    )
};

const Error = styled.span`
    display: block;
    color: #e02626;
    margin-bottom 20px;
    font-size: 12px;
`;

ErrorAlert.propTypes = {
    error: PropTypes.string,
};
export default ErrorAlert;