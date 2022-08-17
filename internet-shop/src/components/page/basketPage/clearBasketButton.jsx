import React from "react";
import PropTypes from "prop-types";
import { yesNo } from "../../../dialogs/messageDialog";
import { useParams } from "react-router-dom";

const ClearBasketButton = ({ status, onAccept }) => {
    const question = "Вы действительно желаете очистить вашу корзину?";
    const { step } = useParams();

    return (
        <div>
            <button
                type="button"
                className="btn btn-outline-danger w-100 list-group-item-danger mb-2 mt-3"
                role="button"
                onClick={() => {
                    yesNo(question, onAccept);
                }}
                disabled={status !== "basket" || step}
            >
                <i className="bi bi-x-lg me-2" />
                Очистить корзину
            </button>
        </div>
    );
};

ClearBasketButton.propTypes = {
    status: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired
};

export default ClearBasketButton;
