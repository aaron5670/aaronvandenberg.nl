import React from 'react';
import {Layout, SEO, Container} from 'components/common';
import {Wrapper} from '../components/landing/Projects/styles';

export default () => (
    <Wrapper as={Container}>
        <Layout>
            <SEO title="404: Not found" location="/404"/>
            <h1>Whoops, page not found!</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Layout>
    </Wrapper>
);
