import axios from "axios";

export const userService = {
    getUserInfo,
    postUserTweet
}

function getUserInfo(token) {
    const url = `https://localhost:7190/authentification/userInfo/${token}`;
    return axios.get(url).then((resp) => {
        return resp;
    })
}

function postUserTweet(tweet) {
    const url = `https://localhost:7190/tweet`;
    return axios.post(url, tweet).then((resp) => {
        return resp;
    })
}