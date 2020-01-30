import React from 'react';
import {navigate} from "gatsby-link";
import {Layout, SEO} from '../components/common';
import {Login} from '../components/landing/Login';
import {isLoggedIn} from "../services/auth";

export default () => {
    if (isLoggedIn())
        navigate(`/profile`);

    return (
        <Layout>
            <SEO title={'Aaron van den Berg - Login'}/>
            <Login/>
        </Layout>
    );
}
