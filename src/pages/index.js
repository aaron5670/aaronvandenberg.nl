import React from 'react';
import {Layout, SEO} from '../components/common';
import {Intro, Skills, Contact, Projects} from '../components/landing';
import OnlineUsers from "../components/OnlineUsers";
import {ToastContainer} from "react-toastify";
import {receivedSocketMessages} from "../services/socket";
import 'react-toastify/dist/ReactToastify.css';

export default () => (
    <Layout>
        <ToastContainer>{receivedSocketMessages()}</ToastContainer>
        <OnlineUsers/>
        <SEO/>
        <Intro/>
        <Projects/>
        <Skills/>
        <Contact/>
    </Layout>
);
