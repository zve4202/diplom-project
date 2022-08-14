import React from "react";
import PropTypes from "prop-types";
import { yesNo } from "../../../dialogs/messageDialog";

const GoToPayButton = ({ onAccept }) => {
    const question =
        "Вы действительно желаете отправить корзину на проверку, и перейти к оплате?";

    return (
        <div>
            <div
                className="btn btn-outline-success w-100 list-group-item-success"
                role="button"
                onClick={() => {
                    yesNo(question, onAccept);
                }}
            >
                <i className="bi bi-credit-card me-2" />
                Перейти к оплате
            </div>
        </div>
    );
};

GoToPayButton.propTypes = {
    onAccept: PropTypes.func.isRequired
};

export default GoToPayButton;
