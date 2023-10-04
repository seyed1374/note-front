import {useContext} from "react"
import {UserContext} from "../../context/user/userReducer"
import {Navigate} from "react-router-dom"

function PrivateRoute({children, ifLogin = true})
{
    const {state: user} = useContext(UserContext)

    if (ifLogin)
    {
        if (user) return children
        else return <Navigate to="/login"/>
    }
    else
    {
        if (!user) return children
        else return <Navigate to="/"/>
    }
}

export default PrivateRoute