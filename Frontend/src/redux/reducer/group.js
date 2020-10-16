import { CREATEGROUP, FINDGROUP, SEARCHUSER, ALLMESSAGE } from '../type';

const initalstate = {
    group: null,
    error: null,
    info: null,
    groups: null,
    searchQuery: null,
    message: null
}

const groupReducer = (state = initalstate, action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATEGROUP:
            return { ...state, group: payload.group, error: payload.error };
        case FINDGROUP:
            return { ...state, groups: payload };
        case SEARCHUSER:
            return Object.assign(state, payload);
        case ALLMESSAGE:
            //console.log('payy', payload)
            return { ...state, message: payload }
        default:
            return state;
    }
}

export default groupReducer;