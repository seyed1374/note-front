import request from "../../helper/request"
import API_URLS from "../../constant/API_URLS"
import {ADD_NOTE, DELETE_NOTE, GET_NOTES, UPDATE_NOTE} from "./noteTypes"

function addNote({data: {title, text}, dispatch})
{
    return request.post({url: API_URLS.note, data: {title, text}})
        .then(res =>
        {
            dispatch({
                type: ADD_NOTE,
                payload: {res},
            })
            return res
        })

}

function getNotes({dispatch})
{
    return request.get({url: API_URLS.note})
        .then(res =>
        {
            dispatch({
                type: GET_NOTES,
                payload: {res},
            })
        })
}

function updateNote({data: {title, text, note_id}, dispatch})
{
    return request.post({url: API_URLS.note, data: {title, text, note_id}})
        .then(res =>
        {
            dispatch({
                type: UPDATE_NOTE,
                payload: {res},
            })
            return res
        })
}

function deleteNote({data: {note_id}, dispatch})
{
    return request.del({url: API_URLS.note, data: {note_id}})
        .then(() =>
        {
            dispatch({
                type: DELETE_NOTE,
                payload: {note_id},
            })
        })
}

const noteActions = {
    addNote,
    getNotes,
    updateNote,
    deleteNote
}

export default noteActions