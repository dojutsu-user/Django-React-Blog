import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    loading: false,
};

const sendNewPostToServerInit = (state, action) => {
    return updateObject(state, { loading: true });
};

const sendNewPostToServerSuccess = (state, action) => {
    return updateObject(state, { loading: false });
};

const sendNewPostToServerFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEND_NEW_POST_TO_SERVER_INIT:
            return sendNewPostToServerInit(state, action);
        case actionTypes.SEND_NEW_POST_TO_SERVER_SUCCESS:
            return sendNewPostToServerSuccess(state, action);
        case actionTypes.SEND_NEW_POST_TO_SERVER_FAIL:
            return sendNewPostToServerFail(state, action);
        default:
            return state;
    }
};

export default reducer;
