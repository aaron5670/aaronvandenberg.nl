import {createStore as reduxCreateStore} from "redux";

const initialState = {onlineUsers: 0};

//ToDo: Add Immer (https://immerjs.github.io/immer/)
const reducer = (state, action) => {
    if (action.type === `SET_ONLINE_USERS`) {
        return Object.assign({}, state, {
            onlineUsers: action.users,
        })
    }
    return state
};

const createStore = () => reduxCreateStore(reducer, initialState);
export default createStore
