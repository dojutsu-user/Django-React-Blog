import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    newUser: null,
    userList: null,
    loading: false,
    error: null,
    allPosts: null
};

const adminUserListViewInit = (state, action) => {
    return updateObject(state, {
        userList: null,
        loading: true,
        error: null,
        newUser: null,
        allPosts: null
    });
};

const adminUserListViewSuccess = (state, action) => {
    return updateObject(state, {
        userList: action.data,
        loading: false,
        error: null,
        newUser: null,
        allPosts: null
    });
};

const adminUserListViewFail = (state, action) => {
    return updateObject(state, {
        userList: null,
        loading: false,
        error: action.error,
        newUser: null,
        allPosts: null
    });
};

const adminCreateUserInit = (state, action) => {
    return updateObject(state, {
        userList: null,
        loading: true,
        error: null,
        newUser: null,
        allPosts: null
    });
};

const adminCreateUserSuccess = (state, action) => {
    return updateObject(state, {
        userList: null,
        loading: false,
        error: null,
        newUser: action.data,
        allPosts: null
    });
};

const adminCreateUserFail = (state, action) => {
    return updateObject(state, {
        userList: null,
        loading: false,
        error: action.error,
        newUser: null,
        allPosts: null
    });
};

const adminViewAllPostsInit = (state, action) => {
    return updateObject(state, {
        newUser: null,
        userList: null,
        loading: true,
        error: null,
        allPosts: null
    });
};

const adminViewAllPostsSuccess = (state, action) => {
    return updateObject(state, {
        newUser: null,
        userList: null,
        loading: false,
        error: null,
        allPosts: action.postsData
    });
};

const adminViewAllPostsFail = (state, action) => {
    return updateObject(state, {
        newUser: null,
        userList: null,
        loading: false,
        error: action.error,
        allPosts: null
    });
};

const adminEditUserInit = (state, action) => {
    return updateObject(state, {
        newUser: null,
        userList: null,
        loading: true,
        error: null,
        allPosts: null
    });
};

const adminEditUserSuccess = (state, action) => {
    return updateObject(state, {
        newUser: null,
        userList: null,
        loading: false,
        error: null,
        allPosts: null
    });
};

const adminEditUserFail = (state, action) => {
    return updateObject(state, {
        newUser: null,
        userList: null,
        loading: false,
        error: action.error,
        allPosts: null
    });
};

const adminEditPostInit = (state, action) => {
    return updateObject(state, {
        newUser: null,
        userList: null,
        loading: true,
        error: null,
        allPosts: null
    });
};

const adminEditPostSuccess = (state, action) => {
    return updateObject(state, {
        newUser: null,
        userList: null,
        loading: false,
        error: null,
        allPosts: null
    });
};

const adminEditPostFail = (state, action) => {
    return updateObject(state, {
        newUser: null,
        userList: null,
        loading: false,
        error: action.error,
        allPosts: null
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
        case actionTypes.ADMIN_VIEW_ALL_POSTS_INIT:
            return adminViewAllPostsInit(state, action);
        case actionTypes.ADMIN_VIEW_ALL_POSTS_SUCCESS:
            return adminViewAllPostsSuccess(state, action);
        case actionTypes.ADMIN_VIEW_ALL_POSTS_FAIL:
            return adminViewAllPostsFail(state, action);
        case actionTypes.ADMIN_EDIT_USER_INIT:
            return adminEditUserInit(state, action);
        case actionTypes.ADMIN_EDIT_USER_SUCCESS:
            return adminEditUserSuccess(state, action);
        case actionTypes.ADMIN_EDIT_USER_FAIL:
            return adminEditUserFail(state, action);
        case actionTypes.ADMIN_EDIT_POST_INIT:
            return adminEditPostInit(state, action);
        case actionTypes.ADMIN_EDIT_POST_SUCCESS:
            return adminEditPostSuccess(state, action);
        case actionTypes.ADMIN_EDIT_POST_FAIL:
            return adminEditPostFail(state, action);
        default:
            return state;
    }
};

export default reducer;
