import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import {
    updateBasket,
    getBasketQty,
    removeBasketItem
} from "../../../../store/basket";
import {
    addReminder,
    getReminder,
    removeReminder,
    updateReminder
} from "../../../../store/reminders";
import StatusText from "../../../common/form/statusText";

const BasketQty = ({ item, name }) => {
    const { title, priceRub } = item;
    const inputB = useRef(null);
    const inputR = useRef(null);
    let qty = String(useSelector(getBasketQty(item._id)) || "");
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
        const result = Math.max(0, Number(value || "0"));
        qty = result || "";
        return result;
    };
    const handleChange = ({ target }) => {
        const value = target.value.replace(/[^\d]/, "");
        updateOnServer(checkValue(value));
    };

    const removeThis = () => {
        inputB.current.focus();
        const numQty = 0;
        updateOnServer(numQty);
    };

    const handleBlur = () => {
        if (qty === "0") {
            qty = "";
            return;
        } else if (!qty) return;

        updateOnServer(Math.max(0, Number(qty)));
    };

    function updateOnServer(numQty) {
        if (savedQty === numQty) return;

        if (numQty === 0) {
            dispatch(removeBasketItem(item._id));
        } else {
            dispatch(
                updateBasket({
                    _id: item._id,
                    qty: numQty,
                    price: priceRub
                })
            );
        }
    }

    const handleToggle = ({ target }) => {
        if (target.nodeName !== "SPAN") {
            target = target.parentNode;
        }

        const { action } = reminder || { action: "nothing" };

        if (target.nodeName !== "SPAN") return;
        if (target.id === "nothing" && !reminder) return;
        if (action === target.id) return;

        if (target.id === "nothing") {
            dispatch(removeReminder(title._id));
            return;
        }

        const need = item.needQty ? item.needQty - item.qty : 1;

        let data = {
            ...reminder,
            titleId: title._id,
            action: target.id,
            need,
            price: priceRub
        };

        switch (target.id) {
            case "to-order":
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
    };

    const needBlur = () => {
        let { need, action } = reminder;
        if (isNaN(need)) {
            need = 1;
        }

        need = Math.max(1, Number(need));
        const data = { titleId: title._id, action, need, price: priceRub };
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
        const data = { titleId: title._id, action, need, price: priceRub };
        dispatch(updateReminder(data));
    };

    const inputTitle = "Изменить количество в корзине.";

    switch (item.status) {
        case "basket": {
            return (
                <div className="input-group flex-nowrap">
                    <input
                        ref={inputB}
                        type="text"
                        className="form-control table-input text-center"
                        placeholder="нет"
                        value={qty}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        title={inputTitle}
                    />
                    <span
                        className="input-group-text"
                        title="Удалить"
                        role="button"
                        onClick={removeThis}
                    >
                        <i className="bi bi-x-circle" />
                    </span>
                </div>
            );
        }
        case "checked": {
            return (
                <div className="g-3">
                    <div
                        className="form-control bg-secondary bg-opacity-10 text-center"
                        title="Изменить нельзя"
                    >
                        {item.qty}
                    </div>
                    <StatusText status={item.status} classname="light" />
                </div>
            );
        }
        case "partly":
        case "unavailable": {
            return (
                <div className="g-3">
                    <span
                        className="form-control form-control-sm bg-secondary bg-opacity-10 text-center"
                        title="Изменить нельзя"
                    >
                        {item.qty}/{item.needQty}
                    </span>
                    <StatusText status={item.status} classname="warning" />
                    <div
                        className="btn-group btn-group-sm mt-1 w-100"
                        role="group"
                        onClick={handleToggle}
                    >
                        <span
                            id="notify-me"
                            className={classNames({
                                "btn btn-outline-primary": true,
                                active:
                                    reminder && reminder.action === "notify-me"
                            })}
                            title="Оповестить меня, в случае постуаления"
                        >
                            <i className="bi bi-envelope" />
                        </span>
                        <span
                            id="to-order"
                            className={classNames({
                                "btn btn-outline-danger": true,
                                active:
                                    reminder && reminder.action === "to-order"
                            })}
                            title="При поступлении добавить в заказ, и оповестить меня"
                        >
                            <i className="bi bi-bag" />
                        </span>
                        {reminder && reminder.action === "to-order" && (
                            <input
                                ref={inputR}
                                type="text"
                                className="form-control form-control-sm text-center"
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
                </div>
            );
        }

        default:
            return (
                <div className="g-3">
                    <div
                        className="form-control bg-secondary bg-opacity-10 text-center"
                        title="Изменить нельзя"
                    >
                        {item.qty}
                    </div>
                    <StatusText status={item.status} classname="success" />
                </div>
            );
    }
};

BasketQty.propTypes = {
    item: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
};
export default BasketQty;
