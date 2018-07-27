import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    newUser: null,
    userList: null,
    loading: false,
    error: null
};

const adminUserListViewInit = (state, action) => {
    return updateObject(state, {
        userList: null,
        loading: true,
        error: null,
        newUser: null
    });
};

const adminUserListViewSuccess = (state, action) => {
    return updateObject(state, {
        userList: action.data,
        loading: false,
        error: null,
        newUser: null
    });
};

const adminUserListViewFail = (state, action) => {
    return updateObject(state, {
        userList: null,
        loading: false,
        error: action.error,
        newUser: null
    });
};

const adminCreateUserInit = (state, action) => {
    return updateObject(state, {
        userList: null,
        loading: true,
        error: null,
        newUser: null
    });
};

const adminCreateUserSuccess = (state, action) => {
    return updateObject(state, {
        userList: null,
        loading: false,
        error: null,
        newUser: action.data
    });
};

const adminCreateUserFail = (state, action) => {
    return updateObject(state, {
        userList: null,
        loading: false,
        error: action.error,
        newUser: null
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_USER_LIST_VIEW_INIT:
            return adminUserListViewInit(state, action);
        case actionTypes.ADMIN_USER_LIST_VIEW_SUCCESS:
            return adminUserListViewSuccess(state, action);
        case actionTypes.ADMIN_USER_LIST_VIEW_FAIL:
            return adminUserListViewFail(state, action);
        case actionTypes.ADMIN_CREATE_USER_INIT:
            return adminCreateUserInit(state, action);
        case actionTypes.ADMIN_CREATE_USER_SUCCESS:
            return adminCreateUserSuccess(state, action);
        case actionTypes.ADMIN_CREATE_USER_FAIL:
            return adminCreateUserFail(state, action);
        default:
            return state;
    }
};

export default reducer;
