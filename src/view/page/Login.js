import user from "../../media/username-1.png"
import pass from "../../media/download.png"
import loginLeft from "../../media/Screenshot 2023-08-20 at 12.39.26.png"
import userActions from "../../context/user/userActions"
import {useContext, useState} from "react"
import {UserContext} from "../../context/user/userReducer"
import URLS from "../../constant/URLS"
import {useNavigate} from "react-router-dom"

function Login()
{
    const {dispatch} = useContext(UserContext)
    let navigate = useNavigate()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    function onUsernameChange(e){
        setUsername(e.target.value)
    }

    function onPasswordChange(e){
        setPassword(e.target.value)
    }

    function onSignupClick(){
        navigate(URLS.Signup)
    }



    function onLoginClick()
    {
        userActions.login({data: {username, password}, dispatch})
            .then(fondedUser=>{
                navigate(URLS.Note)
                console.log("ok")
            })
            .catch(err =>{
                console.log(err)
            })
    }

    return (
        <div className="login">
            <div>
                <img className="login-left" src={loginLeft} alt="pic"/>
            </div>
            <div className="login-right">
                <div className="login-title">Login</div>
                <div className="signup-input">
                    <img className="signup-input-icon" src={user} alt="user"/>
                    <input className="signup-input-detail" placeholder="username" onChange={onUsernameChange}/>
                </div>
                <div className="signup-input">
                    <img className="signup-input-icon" src={pass} alt="pass"/>
                    <input className="signup-input-detail" placeholder="password" onChange={onPasswordChange}/>
                    <div className="signup-text" onClick={onSignupClick}>Not registered?
                        <div className="signup-text-login">Sign up</div>
                    </div>
                </div>
                <button className="signup-button" onClick={onLoginClick}>Login</button>
            </div>
        </div>
    )
}

export default Login