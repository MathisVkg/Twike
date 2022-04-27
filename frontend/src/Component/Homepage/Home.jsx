import React, {useEffect, useState} from "react";
import { userService } from "../../Services/UserService";
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
    const token = localStorage.getItem("authtoken");
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
        if (data.length <= 0) connectUser(token);
    }, [])

    const submitTweet = (e) => {
        e.preventDefault();
        const dataTweet = {
            "userId": data.id,
            "username": data.username,
            "content": e.target.text.value.trim(),
            "date": formatDate(new Date()),
            "time": new Date().getTime()
        }
        if (dataTweet.content === "") {
            setLoadingBtn(true);
            return;
        }
        setLoadingBtn(true);
        setTimeout(() => {
            setLoadingBtn(false);
            postTweet(dataTweet);
        }, 1200);
        console.log('tweet: ', dataTweet);
    }

    const formatDate = (date) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        return new Date(date).toLocaleString("fr-BE", options);
    };

    const connectUser = (token) => {
        userService.getUserInfo(token).then((resp) => {
            if (resp) setData(resp.data.response[0]);
            console.log(resp.data);
        })
    }

    const postTweet = (data) => {

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
                </div>
                <SideBar/>
            </div>
        </div>
    )
}

export default Home;