import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    token: null,
    username: null,
    loading: false,
    loginRedirectURL: "/"
};

const authInit = (state, action) => {
    return updateObject(state, { loading: true });
};

const authLoginSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        token: action.token,
        username: action.username
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, username: null });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_LOGIN_INIT:
            return authInit(state, action);
        case actionTypes.AUTH_LOGIN_SUCCESS:
            return authLoginSuccess(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    }
};

export default reducer;
