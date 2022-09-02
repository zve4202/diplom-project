import React from "react";
import PropTypes from "prop-types";
import { yesNo } from "../../../dialogs/messageDialog";

const UndoBasketButton = ({ status, onAccept }) => {
    if (!["basket", "checked"].includes(status)) return null;
    const question =
        status === "basket"
            ? "Вы действительно желаете очистить вашу корзину?"
            : "Вы действительно желаете отменить резервирование и вернуть товар в корзину?";

    const caption =
        status === "basket" ? "Очистить корзину" : "Отменить резервирование";
    const title =
        status === "basket"
            ? "Удалить все товары из корзины"
            : "Отменить резервирование и вернуть товар в корзину";
    const undo = status === "basket" ? "clear" : "undoCheck";

    return (
        <div>
            <button
                type="button"
                className="btn btn-outline-danger w-100 list-group-item-danger mt-3"
                role="button"
                onClick={() => {
                    yesNo(question, () => onAccept(undo));
                }}
                title={title}
            >
                <i className="bi bi-x-lg me-2" /> {caption}
            </button>
        </div>
    );
};

UndoBasketButton.propTypes = {
    status: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired
};

export default UndoBasketButton;
