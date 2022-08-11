import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBasket } from "../../../../store/basket";

const ProductMenuBasket = () => {
    const history = useHistory();
    const { totalQty } = useSelector(getBasket());
    const productLabel = totalQty > 99 ? "99+" : totalQty;
    return (
        <button
            className="btn btn-outline-primary w-100 mb-2"
            onClick={() => history.push("/basket")}
            title="Перейти в корзину"
        >
            <i className="bi bi-cart me-1" />
            <span>Корзина</span>
            {totalQty > 0 && (
                <span className="badge rounded-pill bg-primary ms-1">
                    {productLabel}
                </span>
            )}
        </button>
    );
};

export default ProductMenuBasket;
