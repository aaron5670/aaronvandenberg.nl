import React, {useState} from 'react'
import {Button} from '../../../../components/common'
import {ErrorMessage, LoginWrapper} from './styles'
import {Center, InputField} from '../../Contact/ContactForm/styles';
import {Input} from '../../../common/Input';
import {handleLogin} from "../../../../services/auth";

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState(false);

    const submitForm = async (event) => {
        event.preventDefault();
        if (username && password) {
            const isAuthenticated = await handleLogin(username, password);

            if (!isAuthenticated)
                setAuthError(true);

            //Empty password
            setPassword('');
        }
    };

    return (
        <LoginWrapper>
            <form name="login"
                  onSubmit={(event) => submitForm(event)}
                  className={'login-form'}>
                <InputField>
                    <Input
                        type="text"
                        aria-label="Username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </InputField>
                <InputField>
                    <Input
                        id="password"
                        aria-label="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputField>
                <Center>
                    <Button secondary type="submit">
                        Login
                    </Button>
                </Center>
                {authError ? <ErrorMessage>Whoops! Incorrect username or password!</ErrorMessage> : ''}
            </form>
        </LoginWrapper>
    );
}
