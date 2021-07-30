import React from 'react';

// Style
import styled from 'styled-components'

// Breakpoints
import breakpoint from '../../breakpoint/breakpoint';

const PageContainer = ({children}) => {
    return (
        <Container>
            {children}
        </Container>
    )
};

const Container = styled.div`
    @media ${breakpoint.device.tablet}{
        margin-top: 65px;
    }
`;

export default PageContainer;