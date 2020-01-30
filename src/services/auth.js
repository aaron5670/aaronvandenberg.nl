import {PORT, URL} from "../../config";
import {navigate} from "gatsby-link";

export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
    isBrowser() && window.localStorage.getItem("gatsbyUser")
        ? JSON.parse(window.localStorage.getItem("gatsbyUser")) : {};

const setUser = user => window.localStorage.setItem("gatsbyUser", JSON.stringify(user));

export const handleLogin = async (username, password) => {
    if (username && password) {
        const url = `${URL}:${PORT}/auth/login`;
        const options = {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        };
        const response = await fetch(url, options);
        const data = await response.json();

        if (response.status === 200) {
            console.log(data);
            setUser({
                username: data.username,
            });
            navigate('/profile');
            return true;
        } else {
            return false;
        }
    }
    return false
};

export const isLoggedIn = () => {
    const user = getUser();
    return !!user.username
};

export const logout = callback => {
    setUser({});
    callback()
};
