import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAuth } from "../../../store/auth";

const MenuAdmin = () => {
    const { isAdmin } = useSelector(getAuth());
    return (
        isAdmin && (
            <Link className="nav-link " aria-current="page" to="/admin">
                Меню администратора
                <i className="bi bi-award ms-1" />
            </Link>
        )
    );
};

export default MenuAdmin;
