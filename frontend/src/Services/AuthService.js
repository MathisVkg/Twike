import React from "react";
import axios from "axios";

export const authservice = {
    createAccount,
    connectUser
}

function createAccount(user) {
    const url = `https://localhost:7190/user`;
    console.log(user)
    return axios.post(url, user).then((resp) => {
        return resp;
    })
}

function connectUser(account, password) {
    const url = `https://localhost:7190/authentification/token/${account}/${password}`;
    return axios.get(url).then((resp) => {
        return resp;
    })
}