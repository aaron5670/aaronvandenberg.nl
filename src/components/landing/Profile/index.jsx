import React, {useState} from "react"
import {getUser} from "../../../services/auth";
import {Details, IntroWrapper, Wrapper} from "../Login/styles";
import {Header} from "../../theme/Header";
import {Container} from "../../common/Container";
import {Button} from "../../common/Button";
import OnlineUsers from "../../OnlineUsers";
import {socket} from "../../../services/socket";

const Index = () => {
    const [message, setMessage] = useState('');

    return (
        <Wrapper>
            <Header/>
            <IntroWrapper as={Container}>
                <Details>
                    <h1>Your profile</h1>
                    <ul>
                        <li><b>Username:</b> {getUser().username}</li>
                    </ul>

                    {/*ToDo: Create own component for this!*/}
                    <input type="text"
                           style={{display: 'block', width: '50%', padding: '10px'}}
                           placeholder={'Send a message to everybody`s browser console!'}
                           onChange={e => setMessage(e.target.value)}
                    />
                    <Button onClick={() => socket.emit('sendCustomMessage', {msg: message})}>
                        Broadcast
                    </Button>

                </Details>
            </IntroWrapper>
            <OnlineUsers/>
        </Wrapper>
    );
};

export default Index
