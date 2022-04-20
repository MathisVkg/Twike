import React from "react";
import { BiHomeCircle } from "react-icons/bi";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import { VscBell } from "react-icons/vsc";
import { FiMail } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { BsCardText } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function HomeNavigation(props) {
    const username = props.username;
    let navigate = useNavigate();
    return(
        <div className="containerNavigation">
            <span onClick={ () => navigate(`/Home/${username.trim()}`) } className="twikeIcon"><AiOutlineTwitter /></span>
            <nav className="nav">
                <span onClick={ () => navigate(`/Home/${username.trim()}`) }><BiHomeCircle /><p>Home</p></span>
                <span><BiHash /><p>Explore</p></span>
                <span><VscBell /><p>Notifications</p></span>
                <span><FiMail /><p>Messages</p></span>
                <span><BsBookmark /><p>Bookmarks</p></span>
                <span><BsCardText /><p>Lists</p></span>
                <span><HiOutlineUser /><p>Profile</p></span>
                <span><HiOutlineDotsCircleHorizontal /><p>More</p></span>
            </nav>
            <button className="btn btnTweet">Tweet</button>
        </div>
    )
}

export default HomeNavigation;