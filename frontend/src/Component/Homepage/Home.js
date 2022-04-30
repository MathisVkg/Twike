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

function Home() {
    const [modal, setModal] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [data, setData] = useState([]);
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
        // if (data.length <= 0) connectUser(token);
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