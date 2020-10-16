import { REQUEST, ALLREQUEST, UPDATEREQUEST, FRIENDS } from '../type';

const initalstate = {
    request: null,
    error: null,
    requests: null,
    update: null,
    friends: null
}

const requestReducer = (state = initalstate, action) => {
    const { type, payload } = action;
    //console.log(payload)
    switch (type) {
        case REQUEST:
            const newState = Object.assign(state, payload);
            //console.log(newState)
            return newState;
        case ALLREQUEST:
            return Object.assign(state, payload);
        case UPDATEREQUEST:
            return Object.assign(state, payload);
        case FRIENDS:
            return Object.assign(state, payload)
        default:
            return state;
    }
}

export default requestReducer;