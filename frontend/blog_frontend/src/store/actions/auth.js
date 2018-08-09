import * as actionsTypes from "./actionTypes";
import AxiosInstance from "../../AxiosInstance";

export const authLoginInit = () => {
    return {
        type: actionsTypes.AUTH_LOGIN_INIT
    };
};

export const authLoginSuccess = (token, username) => {
    return {
        type: actionsTypes.AUTH_LOGIN_SUCCESS,
        token: token,
        username: username
    };
};

export const authLoginFail = error => {
    return {
        type: actionsTypes.AUTH_LOGIN_FAIL
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("username");
    return {
        type: actionsTypes.AUTH_LOGOUT
    };
};

export const authLogin = loginCredentials => {
    return dispatch => {
        dispatch(authLoginInit());
        AxiosInstance.post("auth/login/", loginCredentials)
            .then(response => {
                const expirationDate = new Date(
                    new Date().getTime() + 3600 * 1000
                );
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("username", response.data.user.username);
                dispatch(
                    authLoginSuccess(
                        response.data.token,
                        response.data.user.username
                    )
                );
            })
            .catch(error => {
                dispatch(authLoginFail(error));
                alert("ERROR");
            });
    };
};

export const checkAuthTimeOut = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authLoginCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            if (expirationDate > new Date()) {
                dispatch(
                    authLoginSuccess(token, localStorage.getItem("username"))
                );
                dispatch(
                    checkAuthTimeOut(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            } else {
                dispatch(logout());
            }
        }
    };
};

export const userRegistrationInit = () => {
    return {
        type: actionsTypes.USER_REGISTRATION_INIT
    };
};

export const userRegistrationSuccess = () => {
    return {
        type: actionsTypes.USER_REGISTRATION_SUCCESS
    };
};

export const userRegistrationFail = () => {
    return {
        type: actionsTypes.USER_REGISTRATION_FAIL
    };
};

export const userRegistration = (data, moveToLoginPage) => {
    return dispatch => {
        dispatch(userRegistrationInit());
        AxiosInstance.post("/register/", data)
            .then(response => {
                dispatch(userRegistrationSuccess());
                alert("Registered Successfully. You Can Now Login.");
                moveToLoginPage("/login");
            })
            .catch(error => {
                dispatch(userRegistrationFail());
                let errors = "ERROR..!!\n";
                for (let key in error.response.data) {
                    errors = errors + "-> " + error.response.data[key] + "\n";
                }
                alert(errors);
            });
    };
};
