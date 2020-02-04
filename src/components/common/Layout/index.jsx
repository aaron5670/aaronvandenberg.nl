import React from 'react'
import {openWebSocket} from "../../../services/socket";
import {Footer} from 'components/theme'
import {Global} from './styles'
import './fonts.css'

export const Layout = ({children}) => {
    openWebSocket();
    return (
        <>
            <Global/>
            {children}
            <Footer/>
        </>
    )
};
