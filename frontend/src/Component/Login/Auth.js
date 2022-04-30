import React, {useState} from "react";
import { AiOutlineTwitter } from 'react-icons/ai';
import AuthSignUp from './AuthSignUp';
import { useNavigate } from "react-router-dom";
import { authservice } from "../../Services/AuthService";
import { Spinner, Alert } from "reactstrap";

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [modal, setModal] = useState(false);
    const [errorFormSignIn, setErrorFormSignIn] = useState(false);
    const [errorFormSignUp, setErrorFormSignUp] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [isAlertSuccess, setIsAlertSuccess] = useState(false);
    const [isAlertDanger, setIsAlertDanger] = useState(false);
    const toggle = () => {
        if (modal) {
            document.body.style.overflow = "initial";
            setModal(!modal);
            setErrorFormSignUp(false);
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
        setLoadingBtn(true);
        setTimeout(() => {
            setErrorFormSignUp(false);
            processConnect(username, password);
        }, 1000);
    }

    const formSubmitSignUp = (e, user, password, email, account) => {
        e.preventDefault();
        if (user === "" || password === "" || account === "") {
            setErrorFormSignUp(true);
            return
        }
        const userInfo = {
            "pseudo": user.trim(),
            "password": password.trim(),
            "email": email.trim(),
            "accountName": account.trim()
        }
        setLoadingBtn(true);
        setTimeout(() => {
            setErrorFormSignUp(false);
            createNewUser(userInfo);
        }, 1500);
    }

    const createNewUser = (user) => {
        authservice.createAccount(user).then(
            () => {
                setLoadingBtn(false);
                setModal(false);
                setIsAlertSuccess(true);
                setTimeout(() => {
                    setIsAlertSuccess(false);
                }, 1500);
            },() => {
                setLoadingBtn(false);
                setIsAlertDanger(true);
                setTimeout(() => {
                    setIsAlertDanger(false);
                }, 1500);
            }
        )
    }

    const processConnect = (account, password) => {
        authservice.connectUser(account, password).then(
            (result) => {
                setLoadingBtn(false);
                localStorage.setItem('authtoken', result.data.response.authtoken);
                navigate(`/Home`);
            },() => {
                setLoadingBtn(false);
                setIsAlertDanger(true);
                setTimeout(() => {
                    setIsAlertDanger(false);
                }, 1500);
            }
        )
    }


    return(
        <div className="d-flex">
            <AuthSignUp
                toggle={toggle}
                modal={modal}
                formSubmitSignUp={formSubmitSignUp}
                loadingBtn={loadingBtn}
                errorFormSignUp={errorFormSignUp}
            />
            <div className="alertSuccess">
                <Alert isOpen={ isAlertSuccess }>Your account are successfully create !</Alert>
            </div>
            <div className="alertDanger">
                <Alert color="danger" isOpen={ isAlertDanger }>A error as occurred — <strong>Please retry!</strong></Alert>
            </div>
            <div className="w-50 containerLeft">
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