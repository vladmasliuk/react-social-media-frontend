import React from 'react';

// Style
import styled from 'styled-components'

// Breakpoints
import breakpoint from '../../breakpoint/breakpoint';

const PageWrap = ({children}) => {
    return (
        <Container>
            {children}
        </Container>
    )
};

const Container = styled.div`
    padding: 50px;
    @media ${breakpoint.device.tablet}{
        padding: 20px;
    }
`;

export default PageWrap;