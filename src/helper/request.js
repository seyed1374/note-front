import axios from "axios"
import {REST_URL} from "../constant/REST_URL"

function getToken()
{
    return localStorage.getItem("token")
}

function get({url})
{
    const token = getToken()
    return axios.get(`${REST_URL}/${url}`,
        {headers: {Authorization: token}},
    )
}

function post({url, data})
{
    const token = getToken()
    return axios.post(`${REST_URL}/${url}`,
        data,
        {headers: {Authorization: token}},
    )
}


function patch({url, data})
{
    const token = getToken()
    return axios.patch(`${REST_URL}/${url}`,
        data,
        {headers: {Authorization: token}},
    )
}

function del({url, data})
{
    const token = getToken()
    return axios.delete(`${REST_URL}/${url}`,
        {
            headers: {Authorization: token},
            data,
        },
    )
}

const request = {
    get,
    post,
    patch,
    del,
}

export default request