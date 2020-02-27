import React from "react"
import {getUser} from "../../../services/auth";
import {Details, IntroWrapper, Wrapper} from "../Login/styles";
import {Header} from "../../theme/Header";
import {Container} from "../../common/Container";
import OnlineUsers from "../../OnlineUsers";

const Index = () => (
        <Wrapper>
            <Header/>
            <IntroWrapper as={Container}>
                <Details>
                    <h1>Your profile</h1>
                    <ul>
                        <li><b>Username:</b> {getUser().username}</li>
                    </ul>
                </Details>
            </IntroWrapper>
            <OnlineUsers/>
        </Wrapper>
);

export default Index
