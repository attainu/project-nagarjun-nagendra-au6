import { ALLMESSAGE, SINGLECHAT } from '../type';
import axios from 'axios';
export const allMessage = (groupId) => async (dispatch) => {
    try {
        axios.defaults.withCredentials = true;
        const { data } = await axios(`/chat/${groupId}`);
        dispatch({
            type: ALLMESSAGE,
            payload: { messages: data }
        })
    } catch (error) {
        console.log(error)
        console.log(error.response.data)
        dispatch({
            type: ALLMESSAGE,
            payload: {
                error: error.response.data.error,
                group: null
            }
        })
    }
}

export const singleChat = (friendId) => async (dispatch) => {
    try {
        axios.defaults.withCredentials = true;
        const { data } = await axios(`/chat/single/${friendId}`);
        dispatch({
            type: SINGLECHAT,
            payload: { singleMessages: data }
        })
    } catch (error) {
        console.log(error)
        console.log(error.response.data)
        dispatch({
            type: SINGLECHAT,
            payload: {
                error: error.response.data.error,
                group: null
            }
        })
    }
}