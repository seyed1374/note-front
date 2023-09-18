import user from "../../media/username-1.png"
import pass from "../../media/download.png"
import signupRight from "../../media/Screenshot 2023-08-18 at 14.33.35.png"
import {useContext, useState} from "react"
import {UserContext} from "../../context/user/userReducer"
import userActions from "../../context/user/userActions"
import URLS from "../../constant/URLS"
import {useNavigate} from "react-router-dom"

function Signup()
{
    const {dispatch} = useContext(UserContext)
    let navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function onUsernameChange(e)
    {
        setUsername(e.target.value)
    }

    function onPasswordChange(e)
    {
        setPassword(e.target.value)
    }

    function onLoginClick(){
        navigate(URLS.Login)
    }

    function onSignupClick()
    {
        userActions.signup({data: {username, password}, dispatch})
            .then(createdUser =>
            {
                console.log("okk")
                navigate(URLS.Note)
            })
            .catch(err =>
            {
                console.log(err)
            })
    }

    return (
        <div className="signup">
            <div className="signup-left">
                <div className="signup-title">sign up</div>
                <div className="signup-input">
                    <img className="signup-input-icon" src={user} alt="user"/>
                    <input className="signup-input-detail" placeholder="username" onChange={onUsernameChange}/>
                </div>
                <div className="signup-input">
                    <img className="signup-input-icon" src={pass} alt="pass"/>
                    <input className="signup-input-detail" placeholder="password" onChange={onPasswordChange}/>
                    <div className="signup-text" onClick={onLoginClick}>Already a member?
                        <div className="signup-text-login">Log in</div>
                    </div>
                </div>
                <button className="signup-button" onClick={onSignupClick}>Register</button>
            </div>
            <div>
                <img className="signup-right" src={signupRight} alt="pic"/>
            </div>
        </div>
    )
}

export default Signup