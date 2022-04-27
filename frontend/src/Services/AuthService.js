import React from "react";
import axios from "axios";

export const authservice = {
    createAccount,
    connectUser
}

function createAccount() {
    const url = ``;
    return axios.post().then((resp) => {
        return resp;
    })
}

function connectUser() {
    const url = ``;
    return axios.get().then((resp) => {
        return resp
    })
}