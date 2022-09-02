import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

import { yesNo } from "../../../dialogs/messageDialog";
import { acquiring } from "./applyForm/payments";

const GoToPayButton = ({ step, onAccept }) => {
    const data = useSelector((state) => state.basket.data);
    const { status, deliveryInfo } = data;
    if (status === "needpay") return null;

    const question =
        "Вы действительно желаете отправить корзину на проверку, и перейти к оформлению и оплате?";

    const tooltip =
        status === "basket"
            ? "Перейти к офортлению покупки"
            : "Завершить оформление" +
              (deliveryInfo.payment === acquiring.value
                  ? " и перейти к оплате покупки"
                  : "");

    const caption =
        status === "basket"
            ? "Перейти к офортлению"
            : deliveryInfo.payment === acquiring.value
            ? "Перейти к оплате покупки"
            : "Завершить оформление";

    const isDisabled = !(step === "basket" || deliveryInfo?.isValid);

    return (
        <div>
            <button
                className="btn btn-outline-success w-100 list-group-item-success mt-3"
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
    step: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired
};

export default GoToPayButton;
