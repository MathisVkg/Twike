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
                <span onClick={ () => navigate(`/Home/${username.trim()}`) }><BiHomeCircle /><span>Home</span></span>
                <span><BiHash /><span>Explore</span></span>
                <span><VscBell /><span>Notifications</span></span>
                <span><FiMail /><span>Messages</span></span>
                <span><BsBookmark /><span>Bookmarks</span></span>
                <span><BsCardText /><span>Lists</span></span>
                <span><HiOutlineUser /><span>Profile</span></span>
                <span><HiOutlineDotsCircleHorizontal /><span>More</span></span>
            </nav>
            <button className="btn btn-primary btnTweet">Tweet</button>
        </div>
    )
}

export default HomeNavigation;