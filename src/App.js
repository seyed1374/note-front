import {BrowserRouter, Route, Routes} from "react-router-dom"
import URLS from "./constant/URLS"
import Signup from "./view/page/Signup"
import Login from "./view/page/Login"
import {useContext} from "react"
import {UserContext} from "./context/user/userReducer"
import Note from "./view/page/Note"

function App()
{
    const {state} = useContext(UserContext)
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={URLS.Signup} element={<Signup/>}/>
                    <Route path={URLS.Login} element={<Login/>}/>
                    <Route path={URLS.Note} element={<Note/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
