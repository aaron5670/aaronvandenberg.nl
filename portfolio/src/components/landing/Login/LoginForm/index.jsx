import React, {useState} from 'react'
import {Button} from '../../../../components/common'
import {ErrorMessage, LoginWrapper} from './styles'
import {Center, InputField} from '../../Contact/ContactForm/styles';
import {Input} from '../../../common/Input';

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    return (
        <LoginWrapper>
            <form name="login"
                  onSubmit={event => {
                      event.preventDefault();

                      if (username && password) {
                          setIsSubmitted(true);

                          //Password is incorrect
                          setPassword('')
                      }
                  }}
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
                {isSubmitted ?
                    <ErrorMessage>Whoops! Incorrect username or password!</ErrorMessage>
                    :
                    ''
                }
            </form>
        </LoginWrapper>
    );
}
