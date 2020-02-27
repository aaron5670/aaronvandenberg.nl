import React, {useState, useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import {OnlineUsersBlock} from "./common/OnlineUsersBlock";
import ReactTooltip from 'react-tooltip'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import {isBrowser} from "../services/auth";

const socketEndPoint = 'https://aaronvandenberg.nl:3005';
const socket = socketIOClient(socketEndPoint);

function OnlineUsers() {
    const [connectionsCount, setConnectionsCount] = useState(0);

    const onlineUsers = () =>
        isBrowser() && window.localStorage.getItem("onlineUsers")
            ? window.localStorage.getItem("onlineUsers") : 0;

    socket.on('broadcast', function (data) {
        setConnectionsCount(data.users);
        window.localStorage.setItem("onlineUsers", data.users)
    });

    return (
        <OnlineUsersBlock>
            <ReactTooltip place={'left'}/>
            <p data-tip={'There are currently ' + onlineUsers() + ' users online! 😃'}>
                <span style={{fontSize: '20px'}}>
                    {onlineUsers()} <FontAwesomeIcon icon={faUsers} color={'#6C63FF'}/>
                </span>
            </p>
        </OnlineUsersBlock>
    )
}

export default OnlineUsers
