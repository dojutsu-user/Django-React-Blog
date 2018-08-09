import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

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

const userRegistrationInit = (state, action) => {
    return updateObject(state, { token: null, username: null, loading: true });
};

const userRegistrationSuccess = (state, action) => {
    return updateObject(state, {
        token: null,
        username: null,
        loading: false,
        loginRedirectURL: "/login"
    });
};

const userRegistrationFail = (state, action) => {
    return updateObject(state, {
        token: null,
        username: null,
        loading: false,
        loginRedirectURL: "/"
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_LOGIN_INIT:
            return authInit(state, action);
        case actionTypes.AUTH_LOGIN_SUCCESS:
            return authLoginSuccess(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.USER_REGISTRATION_INIT:
            return userRegistrationInit(state, action);
        case actionTypes.USER_REGISTRATION_SUCCESS:
            return userRegistrationSuccess(state, action);
        case actionTypes.USER_REGISTRATION_FAIL:
            return userRegistrationFail(state, action);
        default:
            return state;
    }
};

export default reducer;
