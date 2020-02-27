import React, {useState} from 'react'
import {connect} from "react-redux"
import socketIOClient from 'socket.io-client'
import {OnlineUsersBlock} from "./common/OnlineUsersBlock";
import ReactTooltip from 'react-tooltip'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import {PORT, URL} from "../../config";

const socketEndPoint = `${URL}:${PORT}`;
const socket = socketIOClient(socketEndPoint);

const OnlineUsers = (props) => {
    socket.on('broadcast', (data) => {
        props.setOnlineUsers(data.users);
    });

    const userOrUsers = () => {
        if (props.onlineUsers > 1)
            return 'There are currently ' + props.onlineUsers + ' users online! 😃'
        else
            return 'You are currently the only online user 😃'
    };

    return (
        <OnlineUsersBlock>
            <ReactTooltip place={'left'}/>
            <p data-tip={userOrUsers()}>
                <span style={{fontSize: '20px'}}>
                    {props.onlineUsers} <FontAwesomeIcon icon={faUsers} color={'#6C63FF'}/>
                </span>
            </p>
        </OnlineUsersBlock>
    )
};

const mapStateToProps = state => {
    return {
        onlineUsers: state.onlineUsers
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setOnlineUsers: (users) => dispatch({type: `SET_ONLINE_USERS`, users: users})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OnlineUsers);

