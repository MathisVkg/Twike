import React, { useState } from "react";
import { AiOutlineTwitter } from 'react-icons/ai';
import AuthSignUp from './AuthSignUp';
import axios from "axios";

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState([]);
    const toggle = () => setModal(!modal);
    const config = {
        mode: 'no-cors',
        headers: {'Access-Control-Allow-Origin':'*'}
    };


    const formSubmit = (e) => {
        e.preventDefault();
        console.log(username + " " + password + " " + remember);
    }

    const formSubmitSignUp = (e, user, password) => {
        e.preventDefault();
        const userInfo = {
            "username": user.trim(),
            "password": password.trim()
        }
        if (user === "" || password === "") return;
        if (checkUserExist(userInfo.username)) return;
        createAccount(userInfo);
        window.location.href = "http://localhost:3000/Homepage";
    }

    function getUser() {
        const url = "https://localhost:7190/Login";
        fetch(url, config).then((resp) => {
            // if (resp.ok) {
                console.log('user', resp);
            // } else console.log("error");
        })
    }

    function checkUserExist(username) {
        user.map(elem => {
            if (elem.username !== username) return false;
            else return true;
        })
    }

    getUser();

    function createAccount(userInfo) {
        const url = "https://localhost:7190/Login";
        fetch(url, userInfo).then((resp) => {
            console.log(resp);
        })
    }

    return(
        <div className="d-flex">
            <AuthSignUp
                toggle={toggle}
                modal={modal}
                formSubmitSignUp={formSubmitSignUp}
            />
            <div className="w-50 containerLeft">
                <img src="../assets/img/lohp_en_1302x955.png" alt="authimg" className="authImg"/>
                <AiOutlineTwitter className="authSvg"/>
            </div>
            <div className="w-50 containerRight">
                <h2>Connect to your Twike account</h2>
                <form onSubmit={formSubmit} className="d-flex flex-column formSignIn">
                    <div className="d-flex flex-column">
                        <span>Username</span>
                        <input type="text" name="username" className="form-control w-100" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="d-flex flex-column">
                        <span>Password</span>
                        <input type="text" name="password" className="form-control w-100" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="d-flex align-items-center">
                        <span>Remember me ?</span>
                        <input type="checkbox" name="remember" className="checkboxInput" value={remember} onChange={e => setRemember(e.target.checked)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Log In</button>
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