import React from 'react';
import { Layout, SEO } from '../components/common';
import {Login} from '../components/landing/Login';

export default () => (
    <Layout>
        <SEO title={'Aaron van den Berg - Login'} />
        <Login />
    </Layout>
);
