import { LOGIN, LOGOUT, REGISTER, UPDATEUSER, ALLUSER, FORGOTPASSWORD, CHANGEPASSWORD, SINGLEUSER } from '../type';
import axios from 'axios';

export const registerUser = (user) => async dispatch => {
    //console.log(user)
    try {
        const formData = new FormData();
        formData.append("firstName", user.firstName);
        formData.append("lastName", user.lastName);
        formData.append("email", user.email);
        formData.append("password", user.password);
        if (user.photoURL) {
            formData.append("photoURL", user.photoURL, user.photoURL.name);
        }

        const { data } = await axios({
            method: "post",
            url: '/users/register',
            data: formData,
            headers: {
                'content-type': 'multipart/form-data',
                "Accept": "application/json",
                "type": "formData"
            }
        }
        );
        //console.log(data, "1234")
        dispatch({
            type: REGISTER,
            payload: {
                error: null,
                info: data
            }
        })

    } catch (error) {
        //console.log('adsfasdf', error.response.data)
        dispatch({
            type: REGISTER,
            payload: {
                error: error.response.data.error,
                info: null
            }
        })


    }
}

export const updateUser = (user) => async dispatch => {
    try {
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        formData.append("firstName", user.firstName);
        formData.append("lastName", user.lastName);
        formData.append("photoURL", user.photoURL);

        const { data } = await axios({
            method: 'Put',
            url: `/users/${user.userId}`,
            data: formData,
            headers: {
                'content-type': 'multipart/form-data'

            }
        }
        );
        dispatch({
            type: UPDATEUSER,
            payload: {
                error: null,
                info: data,
                photoURL: data.photoURL,
                firstName: data.firstName,
                lastName: data.lastName
            }
        })

    } catch (error) {
        console.log('adsfasdf', error.response)
        dispatch({
            type: UPDATEUSER,
            payload: {
                error: error.response ? error.response.data.message : "update error",
                info: null
            }
        })


    }
}
export const loginUser = (user) => async dispatch => {
    try {
        const { data } = await axios({
            method: "post",
            url: `/users/login`,
            data: {
                email: user.email,
                password: user.password
            }
        });
        //console.log(data, "dfhkgj ")
        dispatch({
            type: LOGIN,
            payload: { error: null, user: data, isAuthenticated: true }
        })
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: LOGIN,
            payload: {
                error: error.response.data.error,
                info: null,
                isAuthenticated: false,
                user: null
            }
        })

    }
}

export const logout = () => async dispatch => {
    try {
        await axios({
            method: "delete",
            url: `/users/logout`
        });
        dispatch({
            type: LOGOUT,
            payload: null
        })
    } catch (error) {
        console.log(error)

    }
}

export const allUser = () => async dispatch => {
    try {
        axios.defaults.withCredentials = true;
        const { data } = await axios(`/users/alluser`)
        dispatch({
            type: ALLUSER,
            payload: { users: data }
        })
        //console.log(data)
    } catch (error) {
        console.log(error)

    }
}

export const forgotPassword = (user) => async dispatch => {
    //console.log('user',user)
    try {
        const { data } = await axios({
            method: "post",
            url: `/users/forgotpassword`,
            data: {
                email: user.email
            }
        });
        //console.log("data",data)
        dispatch({
            type: FORGOTPASSWORD,
            payload: { useremail: user.email, info: data.message }
        })

    } catch (error) {
        console.log('errtyu', error.response.data)
        dispatch({
            type: FORGOTPASSWORD,
            payload: {
                error: error.response.data.error,
                info: null
            }
        })
    }
}

export const changePassword = (user) => async dispatch => {
    console.log("user", user)
    try {
        const { data } = await axios({
            method: "post",
            url: `/users/Changepassword`,
            data: {
                resetToken: user.resetToken,
                password: user.password,
                email: user.email
            }
        });
        console.log("data", data)
        dispatch({
            type: CHANGEPASSWORD,
            payload: { user: data, error: null }
        })

    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: CHANGEPASSWORD,
            payload: {
                error: error.response.data.error,
                info: null
            }
        })

    }
}

export const singleUser = (id) => async dispatch => {
    try {
        axios.defaults.withCredentials = true;
        const { data } = await axios(`/users/${id}`)
        dispatch({
            type: SINGLEUSER,
            payload: { oneuser: data }
        });
        //console.log(data);
    } catch (error) {
        console.log(error)

    }
}