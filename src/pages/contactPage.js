import React, { Component } from 'react';

// Components
import PageContainer from '../components/GeneralComponents/PageContainer';
import PageBanner from '../components/GeneralComponents/PageBanner';
import PageWrap from '../components/GeneralComponents/PageWrap';
import Title from '../components/GeneralComponents/Title';

// Banner
import contactBg from '../assets/img/contact.jpg';

// Style
import styled from 'styled-components';

// Breakpoints
import breakpoint from '../breakpoint/breakpoint';

class contactPage extends Component {
    render() {
        return (
            <PageContainer>
                <PageBanner background={contactBg} title="Contact us"/>
                <PageWrap>
                    <TwoCol>
                        <div>
                            <Title title="Contact Us"/>
                            <Desc>
                                <DescTitle>
                                    Email:
                                </DescTitle>
                                <a href="mailto:masliuk@wit.edu.pl" style={{color: "#707C97"}}>masliuk@wit.edu.pl</a>
                            </Desc>
                        </div>
                        <div>
                            <Title title="Report a problem"/>
                            <Desc>
                                <DescTitle>
                                    Email:
                                </DescTitle>
                                <a href="mailto:masliuk@wit.edu.pl" style={{color: "#707C97"}}>masliuk@wit.edu.pl</a>
                            </Desc>
                        </div>
                    </TwoCol>
                </PageWrap>
            </PageContainer>
        )
    }
}

const TwoCol = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;
    @media ${breakpoint.device.tablet}{
        grid-template-columns: repeat(1, 1fr);
    }
`;

const Desc = styled.div`
    display: flex;
    align-items: center;
`;

const DescTitle = styled.h4`
    margin: 0 20px 0 0;
    text-transform: uppercase;
    letter-spacing: 2px;
`;


export default contactPage
