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
import { Link } from "react-router-dom";

function NavLeft({ toggle }) {
    return(
        <nav className="containerNavigation">
            <Link to="/home" className="twikeIcon"><AiOutlineTwitter /></Link>
            <div className="navGroup">
                <Link to="/home"><BiHomeCircle /><p>Home</p></Link>
                <Link to="#"><BiHash /><p>Explore</p></Link>
                <Link to="#"><VscBell /><p>Notifications</p></Link>
                <Link to="#"><FiMail /><p>Messages</p></Link>
                <Link to="#"><BsBookmark /><p>Bookmarks</p></Link>
                <Link to="#"><BsCardText /><p>Lists</p></Link>
                <Link to="#"><HiOutlineUser /><p>Profile</p></Link>
                <Link to="#"><HiOutlineDotsCircleHorizontal /><p>More</p></Link>
            </div>
            <button className="btn btnTweet" onClick={ toggle }>Tweet</button>
        </nav>
    )
}

export default NavLeft;