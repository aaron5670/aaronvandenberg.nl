import React from "react"
import {navigate} from "gatsby-link";
import { isLoggedIn } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    if (!isLoggedIn()) {
        if (typeof window !== 'undefined') {
            navigate('/login');
        }

        return null
    }

    return <Component {...rest} />
};

export default PrivateRoute
