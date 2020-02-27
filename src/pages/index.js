import React from 'react';
import {Layout, SEO} from '../components/common';
import {Intro, Skills, Contact, Projects} from '../components/landing';
import OnlineUsers from "../components/OnlineUsers";

export default () => (
    <Layout>
        <OnlineUsers/>
        <SEO/>
        <Intro/>
        <Projects/>
        <Skills/>
        <Contact/>
    </Layout>
);
