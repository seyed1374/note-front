import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./style/index.scss"
import UserProvider from "./context/user/userReducer"
import NoteProvider from "./context/note/noteReducer"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <UserProvider>
        <NoteProvider>
            <App/>
        </NoteProvider>
    </UserProvider>,
)
