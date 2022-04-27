import React from "react";
import { FiSearch } from "react-icons/fi"

function NavTop() {
    return(
        <div className="d-flex align-items-center w-100 navTopHome">
            <h2>Home</h2>
            <div className="searchGroup">
                <FiSearch className="searchIcon"/>
                <input className="searchInput" type="text" placeholder="search"/>
            </div>
        </div>
    )
}

export default NavTop;