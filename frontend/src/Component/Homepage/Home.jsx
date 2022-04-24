import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavLeft from './NavLeft';
import Post from "./Post";
import SideBar from "./SideBar";
import CreatePost from "./CreatePost";
import ModalTweet from "./ModalTweet";
import NavTop from "./NavTop";

function Home() {
    const [modal, setModal] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [data, setData] = useState([]);
    const { username } = useParams();
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
        if (data.length <= 0) connectUser(username, localStorage.getItem("authtoken"));
    })

    const submitTweet = (e) => {
        e.preventDefault();
        const tweetContent = e.target.text.value.trim();
        setLoadingBtn(true);
        setTimeout(() => {
            setLoadingBtn(false);
        }, 1200);
        console.log('tweet: ', tweetContent);
    }

    async function connectUser(username, token) {
        const url = "https://localhost:7190/Login/userInfo?user=";
        await axios.get(url + username + "&token=" + token).then((resp) => {
            setData(resp.data);
            console.log(resp.data);
        })
    }

    return(
        <div className="containerHome">
            <ModalTweet
                modal={modal}
                toggle={toggle}
                loadingBtn={loadingBtn}
                submitTweet={submitTweet}
            />
            <header className="homeHeader">
                <NavLeft
                    username={username}
                    toggle={toggle}
                />
            </header>
            <div className="containerContent">
                <NavTop />
                <div className="containerMid">
                    <CreatePost />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
                <SideBar/>
            </div>
        </div>
    )
}

export default Home;