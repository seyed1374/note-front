import {BrowserRouter, Route, Routes} from "react-router-dom"
import URLS from "./constant/URLS"
import Signup from "./view/page/Signup"
import Login from "./view/page/Login"
import {useContext} from "react"
import {UserContext} from "./context/user/userReducer"
import Note from "./view/page/Note"
import PrivateRoute from "./view/component/PrivateRoute"

function App()
{
    const {state} = useContext(UserContext)
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={URLS.Signup} element={<PrivateRoute ifLogin={false}><Signup/></PrivateRoute>}/>
                    <Route path={URLS.Login} element={<PrivateRoute ifLogin={false}><Login/></PrivateRoute>}/>
                    <Route path="*" element={<PrivateRoute><Note/></PrivateRoute>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
