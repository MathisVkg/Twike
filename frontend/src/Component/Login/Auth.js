import React, {useState} from "react";
import { AiOutlineTwitter } from 'react-icons/ai';
import AuthSignUp from './AuthSignUp';
import { useNavigate } from "react-router-dom";
import { authservice } from "../../Services/AuthService";
import { Spinner } from "reactstrap";

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [modal, setModal] = useState(false);
    const [errorFormSignIn, setErrorFormSignIn] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const toggle = () => {
        if (modal) {
            document.body.style.overflow = "initial";
            setModal(!modal);
        } else {
            document.body.style.overflow = "hidden";
            setModal(!modal);
        }
    };
    let navigate = useNavigate();

    const formSubmitSignIn = (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            setErrorFormSignIn(true);
            return;
        }
    }

    const formSubmitSignUp = (e, user, password, email) => {
        e.preventDefault();
        setLoadingBtn(true);
        const userInfo = {
            "username": user.trim(),
            "password": password.trim(),
            "email": email.trim()
        }
        if (user === "" || password === "") return;
    }

    const createNewUser = () => {
        authservice.createAccount().then((resp) => {
            console.log(resp);
        })
    }

    const processConnect = () => {
        authservice.connectUser().then((resp) => {
            console.log(resp);
        })
    }


    return(
        <div className="d-flex">
            <AuthSignUp
                toggle={toggle}
                modal={modal}
                formSubmitSignUp={formSubmitSignUp}
                loadingBtn={loadingBtn}
            />
            <div className="w-50 containerLeft">
                <img src="../../assets/img/TwikeBack.png" alt="authimg" className="authImg"/>
                <AiOutlineTwitter className="authSvg"/>
            </div>
            <div className="w-50 containerRight">
                <h2>Connect to your Twike account</h2>
                <form onSubmit={formSubmitSignIn} className="d-flex flex-column formSignIn">
                    <div className="d-flex flex-column">
                        <span>Username</span>
                        <input type="text" name="username" className="form-control w-100" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="d-flex flex-column">
                        <span>Password</span>
                        <input type="text" name="password" className="form-control w-100" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="d-flex align-items-center mt-3">
                        <span>Remember me ?</span>
                        <input type="checkbox" name="remember" className="checkboxInput" value={remember} onChange={e => setRemember(e.target.checked)}/>
                    </div>
                    <span className="errorSpan">{ errorFormSignIn ? "Username or password incorrect" : "" }</span>
                    <button type="submit" className="btn btn-primary">{ loadingBtn ? <Spinner size="sm" className="loadingBtn" /> : "Log In" }</button>
                </form>
                <div className="divSignUp">
                    <p>You don't have account ? Create one here</p>
                    <button className="btn btn-primary" onClick={ toggle }>Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default Auth;