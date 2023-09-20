import {createContext, useReducer} from "react"
import {ADD_NOTE, DELETE_NOTE, GET_NOTES, UPDATE_NOTE} from "./noteTypes"

export const NoteContext = createContext(null)

function NoteProvider({children})
{
    const initialState = {
        list: {},
        keys: [],
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    function reducer(state, action)
    {
        const {type, payload} = action
        switch (type)
        {
            case GET_NOTES:
            {
                const {res: {data}} = payload
                return {
                    ...state,
                    list: {
                        ...state.list,
                        ...data.reduce((sum, item) => ({...sum, [item._id]: item}), {}),
                    },
                    keys: data.reduce((sum, item) => [...sum, item._id], []),
                }
            }
            case ADD_NOTE:
            {
                const {res: {data}} = payload
                return {
                    ...state,
                    list: {
                        ...state.list,
                        [data._id]: data,
                    },
                    keys: [data._id, ...state.keys],
                }
            }
            case UPDATE_NOTE:
            {
                const {res: {data}} = payload
                return {
                    ...state,
                    list: {
                        ...state.list,
                        [data._id]: data,
                    },
                }
            }
            case DELETE_NOTE:
            {
                const {note_id} = payload
                const keys = [...state.keys]
                keys.splice(keys.indexOf(note_id), 1)
                return {
                    ...state,
                    keys,
                }
            }
            default:
                return state
        }
    }

    return (
        <NoteContext.Provider value={{state, dispatch}}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteProvider