import React from "react";
import { BsThreeDots } from "react-icons/bs"

function UserCard() {
    return(
        <div className="containerUserCard">
            <span className="userPP"></span>
            <div className="d-flex flex-column">
                <p className="pseudo">Pseudo</p>
                <p className="accountName">AccountName</p>
            </div>
             <button className="btn"><BsThreeDots /></button>
        </div>
    )
}

export default UserCard;