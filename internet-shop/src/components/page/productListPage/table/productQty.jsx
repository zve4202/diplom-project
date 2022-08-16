import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import {
    updateBasket,
    getBasketQty,
    removeBasket,
    removeBasketItem
} from "../../../../store/basket";
import {
    addReminder,
    getReminder,
    removeReminder,
    updateReminder
} from "../../../../store/reminders";

const ProductQty = ({ data, name }) => {
    const { title, price, count } = data;
    const inputB = useRef(null);
    const inputR = useRef(null);
    let qty = String(useSelector(getBasketQty(data._id)) || "");
    const savedQty = Number(qty || 0);
    const reminder = useSelector(getReminder(title._id));

    const [reminderNeedFocus, setReminderNeedFocus] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (reminderNeedFocus) {
            setReminderNeedFocus(false);
            inputR.current.focus();
            inputR.current.select();
        }
    }, [reminder]);

    const checkValue = (value) => {
        const result = Math.min(count, Math.max(0, Number(value || "0")));
        qty = result || "";
        return result;
    };
    const handleChange = ({ target }) => {
        const value = target.value.replace(/[^\d]/, "");
        updateOnServer(checkValue(value));
    };

    const removeOne = () => {
        inputB.current.focus();
        const numQty =
            name === "basket" ? 0 : checkValue(Number(qty || "0") - 1);
        if (savedQty === numQty) return;
        if (numQty < 0) return;
        updateOnServer(numQty);
    };

    const addOne = () => {
        inputB.current.focus();
        updateOnServer(checkValue(Number(qty || "0") + 1));
    };

    const handleBlur = () => {
        if (qty === "0") {
            qty = "";
            return;
        } else if (!qty) return;

        updateOnServer(Math.min(count, Math.max(0, Number(qty))));
    };

    function updateOnServer(numQty) {
        if (savedQty === numQty) return;

        if (numQty === 0) {
            if (name === "product") {
                dispatch(removeBasket(data._id));
            } else {
                dispatch(removeBasketItem(data._id));
            }
        } else {
            dispatch(
                updateBasket({
                    _id: data._id,
                    qty: numQty,
                    price
                })
            );
        }
    }

    const handleToggle = ({ target }) => {
        if (target.nodeName !== "SPAN") {
            target = target.parentNode;
        }

        const { action } = reminder || { action: "nothing" };
        if (target.nodeName === "SPAN") {
            if (target.id === "nothing" && !reminder) return;
            if (action === target.id) return;

            if (target.id === "nothing") {
                dispatch(removeReminder(title._id));
                return;
            }

            let data = {
                ...reminder,
                titleId: title._id,
                action: target.id
            };
            switch (target.id) {
                case "to-order":
                    data = { ...data, need: 1, price };
                    setReminderNeedFocus(true);
                    break;
                case "notify-me":
                    data = { ...data, need: 0, price: 0 };
                    break;
                default:
                    break;
            }

            if (!reminder) {
                dispatch(addReminder(data));
            } else {
                dispatch(updateReminder(data));
            }
        }
    };

    const needBlur = () => {
        let { need, action } = reminder;
        if (isNaN(need)) {
            need = 1;
        }

        need = Math.max(1, Number(need));
        const data = { titleId: title._id, action, need, price };
        dispatch(updateReminder(data));
    };

    const needChange = ({ target }) => {
        let { need, action } = reminder;
        let text = target.value.replace(/[^\d]/, "");
        if (isNaN(text)) {
            text = 1;
        }

        if (need === text) return;
        need = Math.max(1, Number(text));
        const data = { titleId: title._id, action, need, price };
        dispatch(updateReminder(data));
    };

    const inputTitle =
        name === "product"
            ? "Введите количество чтобы добавить товар в корзину"
            : "Изменить количество в корзине.";

    if (count > 0) {
        return (
            <div className="input-group flex-nowrap">
                {name === "product" && (
                    <span
                        className="input-group-text"
                        title="Удалить 1"
                        role="button"
                        onClick={removeOne}
                    >
                        <i className="bi bi-dash-circle"></i>
                    </span>
                )}
                <input
                    ref={inputB}
                    type="text"
                    className="form-control table-input text-center"
                    placeholder="нет"
                    min={0}
                    max={count}
                    value={qty}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    title={inputTitle}
                />
                {name === "product" && (
                    <span
                        className="input-group-text"
                        title="Добавить 1"
                        role="button"
                        onClick={addOne}
                    >
                        <i className="bi bi-plus-circle"></i>
                    </span>
                )}
                {name === "basket" && (
                    <span
                        className="input-group-text"
                        title="Удалить"
                        role="button"
                        onClick={removeOne}
                    >
                        <i className="bi bi-x-circle" />
                    </span>
                )}
            </div>
        );
    } else {
        return (
            <div
                className="btn-group mt-2 w-100"
                role="group"
                onClick={handleToggle}
            >
                <span
                    id="notify-me"
                    className={classNames({
                        "btn btn-outline-primary": true,
                        active: reminder && reminder.action === "notify-me"
                    })}
                    title="Оповестить меня, в случае постуаления"
                >
                    <i className="bi bi-envelope" />
                </span>

                <span
                    id="to-order"
                    className={classNames({
                        "btn btn-outline-danger": true,
                        active: reminder && reminder.action === "to-order"
                    })}
                    title="При поступлении добавить в заказ, и оповестить меня"
                >
                    <i className="bi bi-bag" />
                </span>
                {reminder && reminder.action === "to-order" && (
                    <input
                        ref={inputR}
                        type="text"
                        className="form-control text-center"
                        value={reminder.need}
                        onChange={needChange}
                        onBlur={needBlur}
                        title="Введите количество чтобы добавить товар в заказ"
                    />
                )}

                {reminder && (
                    <span
                        id="nothing"
                        className="btn btn-outline-secondary"
                        title="Ничего не нужно"
                    >
                        <i className="bi bi-x-circle" />
                    </span>
                )}
            </div>
        );
    }
};

ProductQty.propTypes = {
    data: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
};
export default ProductQty;
