import React from 'react';
import { Layout, SEO } from '../components/common';
import { Router } from "@reach/router"
import Profile from "../components/landing/Profile"
import PrivateRoute from "../components/privateRoute";

export default () => (
    <Layout>
        <SEO title={'Aaron van den Berg - Profile'} />
        <Router>
            <PrivateRoute path="profile" component={Profile} />
        </Router>
    </Layout>
);
