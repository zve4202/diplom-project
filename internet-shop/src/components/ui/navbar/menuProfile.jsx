import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAuth } from "../../../store/auth";

function MenuProfile() {
    const { currentUser } = useSelector(getAuth());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    if (currentUser) {
        return (
            <div className="dropdown" onClick={toggleMenu}>
                <div className="btn dropdown-toggle d-flex align-items-center nav-link">
                    <div className="me-2">{currentUser.name}</div>
                    <i className="bi bi-person"></i>
                </div>
                <div
                    className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}
                >
                    <Link
                        to={`/users/${currentUser._id}`}
                        className="dropdown-item nav-link"
                    >
                        Профиль
                    </Link>
                    <Link to="/logout" className="dropdown-item nav-link">
                        Выход
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <Link className="nav-link" aria-current="page" to="/login">
            Войти
        </Link>
    );
}

export default MenuProfile;
