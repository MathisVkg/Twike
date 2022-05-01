import React, {useEffect, useState} from "react";
import { userService } from "../../Services/UserService";
import NavLeft from './Components/NavLeft';
import Post from "./Post";
import SideBar from "./SideBar";
import ModalTweet from "./Components/ModalTweet";
import NavTop from "./Components/NavTop";
import CreatePost from "./Components/CreatePost";
import UserCard from "./Components/UserCard";
import { useNavigate } from "react-router-dom";
import {Alert} from "reactstrap";

function Home() {
    const [modal, setModal] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [isAlertDanger, setIsAlertDanger] = useState(false);
    const token = localStorage.getItem("authtoken");
    let navigate = useNavigate();
    const toggle = () => {
        if (modal) {
            document.body.style.overflow = "initial";
            setModal(!modal);
        } else {
            document.body.style.overflow = "hidden";
            setModal(!modal);
        }
    }

    useEffect( () => {
        // if (token === null) navigate(`/`);
        if (userInfo.length <= 0) connectUser(token);
    }, [])

    const submitTweet = (e) => {
        e.preventDefault();
        const dataTweet = {
            "accountName": userInfo.accountName,
            "pseudo": userInfo.pseudo,
            "content": e.target.text.value.trim(),
            "date": toISOStringWithTimezone(new Date()),
        }
        setLoadingBtn(true);
        setTimeout(() => {
            postTweet(dataTweet);
        }, 1200);
        console.log(dataTweet)
    }

    const formatDate = (date) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        return new Date(date).toLocaleString("fr-BE", options);
    };

    const toISOStringWithTimezone = date => {
        const tzOffset = -date.getTimezoneOffset();
        const diff = tzOffset >= 0 ? '+' : '-';
        const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            diff + pad(tzOffset / 60) +
            ':' + pad(tzOffset % 60);
    };

    const connectUser = (token) => {
        userService.getUserInfo(token).then((resp) => {
            if (resp.data.success) setUserInfo(resp.data.response);
            console.log(resp.data);
        })
    }

    const postTweet = (tweet) => {
        userService.postUserTweet(tweet).then(
            (resp) => {
                console.log(resp);
                setLoadingBtn(false);
                setModal(false);
            },
            () => {
                setLoadingBtn(false);
                setIsAlertDanger(true);
                setTimeout(() => {
                    setIsAlertDanger(false);
                }, 2000);
            }
        )
    }

    const processLogOut = () => {
        localStorage.removeItem('authtoken');
        navigate(`/`);
    }

    return(
        <div className="containerHome">
            <ModalTweet
                modal={modal}
                toggle={toggle}
                loadingBtn={loadingBtn}
                submitTweet={submitTweet}
            />
            <div className="alertDanger">
                <Alert color="danger" isOpen={ isAlertDanger }>A error as occurred — <strong>Please retry!</strong></Alert>
            </div>
            <header className="homeHeader">
                <NavLeft
                    toggle={toggle}
                />
                <UserCard processLogOut={processLogOut} />
            </header>
            <div className="containerContent">
                <NavTop />
                <div className="containerMid">
                    <CreatePost />
                    <Post />
                </div>
                <SideBar/>
            </div>
        </div>
    )
}

export default Home;