import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

function UserCard({ processLogOut }) {
    const [dropDown, setDropDown] = useState(false);
    const toggleDrop = () => setDropDown(!dropDown);
    return(
        <div className="containerUserCard">
            <span className="userPP"></span>
            <Link to="#" className="d-flex flex-column">
                <p className="pseudo">Pseudo</p>
                <p className="accountName">AccountName</p>
            </Link>
            <Dropdown
                isOpen={ dropDown }
                toggle={ toggleDrop }
                direction="up"
            >
                <DropdownToggle caret><BsThreeDots /></DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem onClick={ processLogOut}>Log Out</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default UserCard;