import React from "react";
import { Link } from "react-router-dom";
import { appTitle } from "../../../config.json";
import logo from "../../../assets/brand/favicon.ico";
import MenuBasket from "./menuBasket";
import MenuAdmin from "./menuAdmin";
import MenuProfile from "./menuProfile";
import { useSelector } from "react-redux";
import { getAuth } from "../../../store/auth";

const NavBar = () => {
    const { currentUser, isAdmin } = useSelector(getAuth());
    return (
        <header className="sticky-top">
            <nav className="navbar card bg-light-gray">
                <div className="container-fluid">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link
                                className="nav-link "
                                aria-current="page"
                                to="/"
                            >
                                <img
                                    src={logo}
                                    alt=""
                                    width="24"
                                    height="24"
                                    className="me-1"
                                />
                                {appTitle}
                            </Link>
                        </li>
                        {currentUser && isAdmin && (
                            <li className="nav-item">
                                <MenuAdmin />
                            </li>
                        )}
                    </ul>
                    <div className="d-flex">
                        <MenuBasket />
                        <MenuProfile />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
