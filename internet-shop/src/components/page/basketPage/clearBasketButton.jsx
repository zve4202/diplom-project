import React from "react";
import PropTypes from "prop-types";
import { yesNo } from "../../../dialogs/messageDialog";

const ClearBasketButton = ({ onAccept }) => {
    const question = "Вы действительно желаете очистить вашу корзину?";

    return (
        <div>
            <div
                className="btn btn-outline-danger w-100 list-group-item-danger mb-2 mt-3"
                role="button"
                onClick={() => {
                    yesNo(question, onAccept);
                }}
            >
                <i className="bi bi-x-lg me-2" />
                Очистить корзину
            </div>
        </div>
    );
};

ClearBasketButton.propTypes = {
    onAccept: PropTypes.func.isRequired
};

export default ClearBasketButton;
