import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    userList: null,
    loading: false,
    error: null
};

const adminUserListViewInit = (state, action) => {
    return updateObject(state, { userList: null, loading: true, error: null });
};

const adminUserListViewSuccess = (state, action) => {
    return updateObject(state, {
        userList: action.data,
        loading: false,
        error: null
    });
};

const adminUserListViewFail = (state, action) => {
    return updateObject(state, {
        userList: null,
        loading: false,
        error: action.error
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
        default:
            return state;
    }
};

export default reducer;
