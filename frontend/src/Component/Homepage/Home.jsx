import React, {useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navigation from './HomeNavigation';
import Post from "./Post";
import LeftSideBar from "./LeftSideBar";
import CreatePost from "./CreatePost";

function Home() {

    const { username } = useParams();
    useEffect( () => {
        connectUser(username, localStorage.getItem("authtoken"));
    })
    async function connectUser(username, token) {
        const url = "https://localhost:7190/Login/userInfo?user=";
        await axios.get(url + username + "&token=" + token).then((resp) => {
            console.log(resp.data);
        })
    }

    return(
        <div className="containerHome">
            <header className="homeHeader">
                <Navigation username={username} />
            </header>
            <div className="containerContent">
                <div className="containerMid">
                    <h2>Home</h2>
                    <CreatePost />
                    <Post />
                </div>
                <LeftSideBar />
            </div>
        </div>
    )
}

export default Home;