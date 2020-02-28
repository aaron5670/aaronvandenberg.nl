import React from 'react';
import {navigate} from "gatsby-link";
import {Layout, SEO} from '../components/common';
import {Login} from '../components/landing/Login';
import {isLoggedIn} from "../services/auth";
import OnlineUsers from "../components/OnlineUsers";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {receivedSocketMessages} from "../services/socket";

export default () => {
    if (isLoggedIn())
        navigate(`/profile`);

    return (
        <Layout>
            <ToastContainer>{receivedSocketMessages()}</ToastContainer>
            <SEO title={'Aaron van den Berg - Login'}/>
            <OnlineUsers/>
            <Login/>
        </Layout>
    );
}
