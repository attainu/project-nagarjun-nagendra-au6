import { REQUEST, ALLREQUEST, UPDATEREQUEST, FRIENDS } from '../type';
import axios from 'axios';


export const sendRequest = (user) => async dispatch => {
    console.log(user)
    try {
        const { data } = await axios({
            method: "post",
            url: '/request',
            data: user,
        }
        );
        //console.log('data',data)

        dispatch({
            type: REQUEST,
            payload: {
                error: null,
                request: data
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: REQUEST,
            payload: {
                error: error.response.data.error,
                request: null
            }
        })
    }
}

export const allRequest = () => async dispatch => {
    try {
        const { data } = await axios(`/request/all`);
        dispatch({
            type: ALLREQUEST,
            payload: { requests: data }
        })
    } catch (error) {
        console.log(error)

    }
}

export const updatetRequest = (friend) => async dispatch => {
    try {
        const { data } = await axios({
            method: "put",
            url: '/request/update',
            data: friend,
        }
        );
        //console.log(data)
        dispatch({
            type: UPDATEREQUEST,
            payload: {
                error: null,
                update: data
            }
        })
    } catch (error) {
        console.log(error)
        console.log(error.response.data)
        dispatch({
            type: UPDATEREQUEST,
            payload: {
                error: error.response.data.error,
                request: null
            }
        })
    }
}

export const allFriends = () => async dispatch => {
    try {
        const { data } = await axios(`/users/friend`);
        //console.log('data', data)
        dispatch({
            type: FRIENDS,
            payload: { friends: data }
        })
        //console.log(data)
    } catch (error) {
        console.log(error)
    }
}
