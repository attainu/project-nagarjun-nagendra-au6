import { ALLMESSAGE, SINGLECHAT } from '../type';

const initialState = {
    messages: [],
    singleMessages: []
};

const ChatReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ALLMESSAGE:
            return Object.assign(state, payload);
        case SINGLECHAT:
            return Object.assign(state, payload);
        default:
            return state;
    }
}

export default ChatReducer;