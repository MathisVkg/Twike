import React from "react";
import axios from "axios";

export const userService = {
    getUserInfo,
}

function getUserInfo(token) {
    const url = ``;
    return axios.get(url).then((resp) => {
        return resp;
    })
}

function postTweet(data) {
    const url = ``;
}