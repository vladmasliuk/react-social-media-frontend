import React from 'react';

// Style
import styled from 'styled-components'

const FormLink = ({children}) => {
    return (
        <FLink>
            {children}
        </FLink>
    )
};

const FLink = styled.p`
    text-align: right;
`;

export default FormLink;