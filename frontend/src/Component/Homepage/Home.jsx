import React, {useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navigation from './HomeNavigation';
import Post from "./Post";
import LeftSideBar from "./LeftSideBar";

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
            <Navigation username={username} />
            <Post />
            <LeftSideBar />
        </div>
    )
}

export default Home;