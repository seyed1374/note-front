import {createContext, useEffect, useReducer} from "react"
import {SET_USER} from "./userTypes"

export const UserContext = createContext(null)

function UserProvider({children})
{
    const initialState = null
    const [state, dispatch] = useReducer(reducer, initialState, init)

    function init()
    {
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")
        if (user && token)
        {
            return JSON.parse(user)
        }
        else
        {
            return null
        }
    }

    useEffect(() =>
    {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")
        if (user && token)
        {
            // userActions.getUser({dispatch}) TODO make an api call
        }
    }, [])

    function reducer(state, action)
    {
        const {type, payload} = action

        switch (type)
        {
            case SET_USER:
            {
                const {user} = payload
                return {
                    ...state,
                    ...user,
                }
            }
            default:
                return state
        }
    }

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider