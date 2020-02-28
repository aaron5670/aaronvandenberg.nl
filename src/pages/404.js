import React from 'react';
import {Layout, SEO, Container} from 'components/common';
import {Wrapper} from '../components/landing/Projects/styles';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {receivedSocketMessages} from "../services/socket";

export default () => (
    <Wrapper as={Container}>
        <ToastContainer>{receivedSocketMessages()}</ToastContainer>
        <Layout>
            <SEO title="404: Not found" location="/404"/>
            <h1>Whoops, page not found!</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Layout>
    </Wrapper>
);
