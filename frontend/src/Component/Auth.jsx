import React, {useState} from "react";
import { AiOutlineTwitter } from 'react-icons/ai';
import AuthSignUp from './AuthSignUp';
import axios from "axios";

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [modal, setModal] = useState(false);
    const [errorFormSignUp, setErrorFormSignUp] = useState(false);
    const [errorFormSignIn, setErrorFormSignIn] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const toggle = () => setModal(!modal);

    function checkTokenAuth() {
        if (localStorage.getItem("authtoken") !== null) {
            window.location.replace("http://localhost:3000/Homepage");
        }
    }

    const formSubmitSignIn = (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            setErrorFormSignIn(true);
            return;
        }
        else {
            setLoadingBtn(true);
            setTimeout( () => {
                connectUser(username, password);
                setLoadingBtn(false);
                setErrorFormSignIn(false);
                window.location.replace("http://localhost:3000/Homepage");
            }, 1200);
        }
    }

    const formSubmitSignUp = (e, user, password) => {
        e.preventDefault();
        setLoadingBtn(true);
        const userInfo = { "username": user.trim(), "password": password.trim() }
        if (user === "" || password === "") return;
        checkUser(userInfo.username);
        setTimeout( () => {
            console.log(errorFormSignUp)
            if (errorFormSignUp === true) return;
            else {
                setErrorFormSignUp(false);
                setModal(false);
                setLoadingBtn(false);
                createAccount(userInfo);
            }
        }, 1200);
    }

    function checkUser(username) {
        const url = "https://localhost:7190/Login/user?user=";
        axios.get(url + username).then((resp) => {
            if (resp.data === true) setErrorFormSignUp(true);
            if (resp.data === false)  setErrorFormSignUp(false);
        })
    }

    async function createAccount(userInfo) {
        const url = "https://localhost:7190/Login";
        await axios.post(url, userInfo).then((resp) => {
            if (resp.status === 200) console.log('create', resp);
            else console.log("error");
        })
    }

    async function connectUser(username, password) {
        const url = "https://localhost:7190/Login/id?username=";
        await axios.get(url + username + "&password=" + password).then((resp) => {
            if (resp.data === false) setErrorFormSignIn(true);
            if (remember === true) localStorage.setItem("authtoken", resp.data);
        })
    }

    checkTokenAuth();
    return(
        <div className="d-flex">
            <AuthSignUp
                toggle={toggle}
                modal={modal}
                formSubmitSignUp={formSubmitSignUp}
                errorFormSignUp={errorFormSignUp}
                loadingBtn={loadingBtn}
            />
            <div className="w-50 containerLeft">
                <img src="https://raw.githubusercontent.com/MathisVkg/Twike/main/frontend/src/assets/img/lohp_en_1302x955.png?token=GHSAT0AAAAAABREZ6OCM7LVIPHXNDLOKVLWYS5LYNQ" alt="authimg" className="authImg"/>
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
                    <button type="submit" className="btn btn-primary">{ loadingBtn ? <div className="lds-dual-ring"></div> : "Log In" }</button>
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