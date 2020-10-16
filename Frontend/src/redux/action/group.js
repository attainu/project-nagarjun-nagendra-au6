import { CREATEGROUP, FINDGROUP, SEARCHUSER } from "../type";
import axios from 'axios';

export const createGroup = (group) => async dispatch => {
    try {
        const { data } = await axios({
            method: "post",
            url: '/group',
            data: {
                groupName: group.groupName,
                photoURL: group.photoURL
            },
        }
        );
        dispatch({
            type: CREATEGROUP,
            payload: {
                error: null,
                group: data
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: CREATEGROUP,
            payload: {
                error: error.response.data.error,
                group: null
            }
        })
    }
}

export const findGroups = () => async dispatch => {
    try {
        const { data } = await axios(`/group/find`);
        dispatch({
            type: FINDGROUP,
            payload: data
        })
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: FINDGROUP,
            payload: {
                error: error.response.data.error,
                group: null
            }
        })
    }
}
export const searchUser = (searchQuery) => async dispatch => {
    try {
        //console.log(searchQuery)
        const { data } = await axios({
            method: "post",
            url: '/users/search',
            data: searchQuery
        }
        );
        //console.log(data)
        dispatch({
            type: SEARCHUSER,
            payload: { searchQuery: data }
        })

    } catch (error) {
        console.log(error)
        console.log(error.response.data)
        dispatch({
            type: SEARCHUSER,
            payload: {
                error: error.response.data.error,
                payload: null
            }
        })
    }
}
