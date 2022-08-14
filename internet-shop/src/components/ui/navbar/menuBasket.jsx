import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBasket } from "../../../store/basket";

const MenuBasket = () => {
    const { totalQty } = useSelector(getBasket());
    const productLabel = totalQty > 99 ? "99+" : totalQty;
    return (
        <Link className="nav-link " aria-current="page" to="/basket">
            <i className="bi bi-cart me-1" />
            <span>Корзина</span>
            {totalQty > 0 && (
                <span className="badge rounded-pill bg-primary ms-1">
                    {productLabel}
                </span>
            )}
        </Link>
    );
};

export default MenuBasket;
