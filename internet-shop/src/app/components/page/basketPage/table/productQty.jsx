import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import {
    basketUpdateBasket,
    basketRemoveBasket
} from "../../../../store/basket";

const ProductQty = ({ productId, max, qty, price, onUpdate }) => {
    const [count, setCount] = useState(String(qty || ""));
    const dispatch = useDispatch();
    const handleChange = ({ target }) => {
        setCount(target.value);
        if (target.value === "") return;

        const numCount = Math.max(0, Number(target.value || 0));
        dispatch(
            basketUpdateBasket({
                id: productId,
                qty: numCount,
                price
            })
        );
    };

    const handleBlur = () => {
        const numCount = Math.min(max, Math.max(0, Number(!count ? 0 : count)));
        if (numCount === 0) {
            dispatch(basketRemoveBasket(productId));
        } else {
            dispatch(
                basketUpdateBasket({ id: productId, qty: numCount, price })
            );
        }
    };

    const handleKeyDown = (event) => {
        if ([9, 13].includes(event.keyCode)) {
            event.preventDefault();
            const inputs = Array.prototype.slice.call(
                document.querySelectorAll("input.table-input")
            );

            if (inputs.length === 1) {
                handleBlur();
                return;
            }

            const index =
                (inputs.indexOf(document.activeElement) + 1) % inputs.length;
            const input = inputs[index];
            input.focus();
            input.select();
        }
    };
    const handleDelete = () => {
        dispatch(basketRemoveBasket(productId));
    };

    return (
        <div className="input-group">
            <span
                className="input-group-text"
                title="Удалить"
                role="button"
                onClick={handleDelete}
            >
                <i className="bi bi-x-circle" />
            </span>
            <input
                type="number"
                className="form-control table-input"
                placeholder="нет"
                min={0}
                max={max}
                value={count}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                title="Изменить количество в корзине."
            />
        </div>
    );
};

ProductQty.propTypes = {
    productId: PropTypes.number.isRequired,
    max: PropTypes.number,
    qty: PropTypes.number,
    price: PropTypes.number,
    onUpdate: PropTypes.func.isRequired
};
export default ProductQty;
