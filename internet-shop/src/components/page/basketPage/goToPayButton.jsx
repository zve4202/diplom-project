import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";

import { yesNo } from "../../../dialogs/messageDialog";

const GoToPayButton = ({ onAccept }) => {
    const { type } = useParams();
    const data = useSelector((state) => state.basket.data);
    const { status, deliveryInfo } = data;
    const question =
        "Вы действительно желаете отправить корзину на проверку, и перейти к оплате?";

    const tooltip =
        status === "basket"
            ? "Перейти к офортлению покупки"
            : "Перейти к оплате покупки";
    const caption =
        status === "basket"
            ? "Перейти к офортлению"
            : "Перейти к оплате покупки";

    const isDisabled = type !== "basket" && !deliveryInfo?.isValid;
    return (
        <div>
            <button
                className="btn btn-outline-success w-100 list-group-item-success"
                role="button"
                onClick={() => {
                    if (status === "basket") {
                        yesNo(question, onAccept);
                    } else {
                        onAccept();
                    }
                }}
                title={tooltip}
                disabled={isDisabled}
            >
                <i
                    className={classNames({
                        "bi me-2": true,
                        "bi-check-square": status === "basket",
                        "bi-credit-card": status !== "basket"
                    })}
                />
                {caption}
            </button>
        </div>
    );
};

GoToPayButton.propTypes = {
    status: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired
};

export default GoToPayButton;
