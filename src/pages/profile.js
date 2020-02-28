import React from 'react';
import { Layout, SEO } from '../components/common';
import { Router } from "@reach/router"
import Profile from "../components/landing/Profile"
import PrivateRoute from "../components/privateRoute";
import {receivedSocketMessages} from "../services/socket";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default () => (
    <Layout>
        <ToastContainer>{receivedSocketMessages()}</ToastContainer>
        <SEO title={'Aaron van den Berg - Profile'} />
        <Router>
            <PrivateRoute path="profile" component={Profile} />
        </Router>
    </Layout>
);
