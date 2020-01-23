import React from 'react'
import {Container} from '../../../components/common'
import {Wrapper, IntroWrapper, Details} from './styles'
import {Header} from '../../theme/Header';
import {LoginForm} from './LoginForm';

export const Login = () => (
    <Wrapper>
        <Header/>
        <IntroWrapper as={Container}>
            <Details>
                <h1>Login</h1>
                <LoginForm/>
            </Details>
        </IntroWrapper>
    </Wrapper>
);
