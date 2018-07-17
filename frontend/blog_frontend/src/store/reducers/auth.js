import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    token: null,
    loading: false
};

const authInit = (state = initialState, action) => {
    return updateObject(state, { loading: true });
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.AUTH_LOGIN_INIT:
            return authInit(state, action);
        default:
            return state;
    }
};

export default reducer;
