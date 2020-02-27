import React, {useState} from 'react'
import socketIOClient from 'socket.io-client'
import {OnlineUsersBlock} from "./common/OnlineUsersBlock";
import ReactTooltip from 'react-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

const socketEndPoint = 'https://aaronvandenberg.nl:3005';
const socket = socketIOClient(socketEndPoint);

function OnlineUsers() {
    const [connectionsCount, setConnectionsCount] = useState(0);
    socket.on('broadcast', function (data) {
        setConnectionsCount(data.users);
    });

    return (
        <OnlineUsersBlock>
            <ReactTooltip place={'left'} />
            <p data-tip={'There are currently ' + connectionsCount + ' users online! 😃'}>
                <span style={{fontSize: '20px'}}>
                    {connectionsCount} <FontAwesomeIcon icon={faUsers} color={'#6C63FF'}/>
                </span>
            </p>
        </OnlineUsersBlock>
    )
}

export default OnlineUsers
