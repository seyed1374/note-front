import request from "../../helper/request"
import API_URLS from "../../constant/API_URLS"
import {SET_USER} from "./userTypes"

function login({data: {username, password}, dispatch})
{
    return request.post({url: API_URLS.login, data: {username, password}})
        .then(res =>
        {
            const {token, ...user} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            dispatch({
                type: SET_USER,
                payload: {user},
            })
        })
}

function signup({data: {username, password}, dispatch})
{
    return request.post({url: API_URLS.signup, data: {username, password}})
        .then(res =>
        {
            const {token, ...user} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            dispatch({
                type: SET_USER,
                payload: {user},
            })
        })
}

const userActions = {
    login,
    signup
}
export default userActions