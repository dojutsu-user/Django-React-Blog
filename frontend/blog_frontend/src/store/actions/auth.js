import * as actionsTypes from "./actionTypes";
import AxiosInstance from "../../AxiosInstance";

export const authLoginInit = () => {
    return {
        type: actionsTypes.AUTH_LOGIN_INIT
    };
};

export const authLoginSuccess = data => {
    return {
        type: actionsTypes.AUTH_LOGIN_SUCCESS,
        token: data.token
    };
};

export const authLoginFail = error => {
    return {
        type: actionsTypes.AUTH_LOGIN_FAIL
    };
};

export const authLogin = loginCredentials => {
    return dispatch => {
        dispatch(authLoginInit());
        AxiosInstance.post("auth/login/", loginCredentials)
            .then(response => {
                dispatch(authLoginSuccess(response.data));
            })
            .catch(error => {
                dispatch(authLoginFail(error));
            });
    };
};
