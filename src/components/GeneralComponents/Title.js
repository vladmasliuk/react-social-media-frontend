import React from 'react';
import PropTypes from 'prop-types';

// Style
import styled from 'styled-components'

const Title = ({title}) => {
    return (
        <Text>
            {title}
        </Text>
    )
};

const Text = styled.h1`
    font-size: 36px;
    letter-spacing: 2px;
    color: #0D1C2E;
    margin-top: 0;
`;

Title.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Title;
