import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import {
    getBasketQty,
    basketRemoveBasket,
    basketUpdateBasket
} from "../../../../store/basket";

const ProductQty = ({ data }) => {
    const { price, count } = data;
    const refInput = useRef(null);
    let qty = String(useSelector(getBasketQty(data._id)) || "");

    const dispatch = useDispatch();

    const checkValue = (value) => {
        const result = Math.min(count, Math.max(1, Number(value || "0")));
        qty = result || "";
        return result;
    };
    const handleChange = ({ target }) => {
        const value = target.value.replace(/[^\d]/, "");
        const numQty = checkValue(value);
        if (numQty === 0) {
            dispatch(basketRemoveBasket(data._id));
        } else {
            dispatch(
                basketUpdateBasket({
                    id: data._id,
                    qty: numQty,
                    price
                })
            );
        }
    };

    const handleDelete = () => {
        refInput.current.focus();
        dispatch(basketRemoveBasket(data._id));
    };

    const handleBlur = () => {
        if (qty === "0") {
            qty = "";
            return;
        } else if (!qty) return;

        const numQty = Math.min(count, Math.max(0, Number(qty)));
        if (numQty === 0) {
            dispatch(basketRemoveBasket(data._id));
        } else {
            dispatch(
                basketUpdateBasket({
                    id: data._id,
                    qty: numQty,
                    price
                })
            );
        }
    };

    return (
        <div className="input-group flex-nowrap">
            <input
                ref={refInput}
                type="text"
                className="form-control table-input text-center"
                placeholder="нет"
                min={0}
                max={count}
                value={qty}
                onChange={handleChange}
                onBlur={handleBlur}
                title="Изменить количество в корзине."
            />
            <span
                className="input-group-text"
                title="Удалить"
                role="button"
                onClick={handleDelete}
            >
                <i className="bi bi-x-circle" />
            </span>
        </div>
    );
};

ProductQty.propTypes = {
    data: PropTypes.object.isRequired
};
export default ProductQty;
