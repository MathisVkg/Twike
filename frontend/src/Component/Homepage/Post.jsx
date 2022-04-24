import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { IoShareOutline } from "react-icons/io5"

function Post() {

    return(
        <div className="containerPost">
            <span className="userPP"></span>
            <div className="postGroup">
                <div className="userInfo">
                    <div>
                        <p className="username">name</p>
                        <p className="arobase">arobase</p>
                        <p className="tweetTime">time</p>
                    </div>
                    <span className="dotIcon"><BsThreeDots /></span>
                </div>
                <p className="postContent">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea libero minus officiis optio rem soluta sunt voluptatum! A, aperiam dolores eligendi eveniet ex facere impedit itaque iure laboriosam laudantium magnam, mollitia necessitatibus non nulla praesentium, quaerat quos reprehenderit repudiandae ullam voluptates? Adipisci iure labore nam odit praesentium quia, tempora veniam?</p>
                <div className="postReactions">
                    <button className="btn message">
                        <BiMessageRounded />
                        <span>45</span>
                    </button>
                    <button className="btn retweet">
                        <FaRetweet />
                        <span>12</span>
                    </button>
                    <button className="btn like">
                        <AiOutlineHeart />
                        <span>654</span>
                    </button>
                    <button className="btn"><IoShareOutline /></button>
                </div>
            </div>
        </div>
    )
}

export default Post;