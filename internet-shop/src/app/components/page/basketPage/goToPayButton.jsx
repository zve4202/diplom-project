import React from "react";
import PropTypes from "prop-types";
import { Modal } from "bootstrap";

import YesNoDialog from "../../../dialogs/yesNoDialog";

const GoToPayButton = ({ onAccept }) => {
    const question =
        "Вы действительно желаете отправить корзину на проверку и перейти к оплате?";
    const idDialog = "goToPayYesNoModal";

    return (
        <div>
            <div
                role="button"
                onClick={() => {
                    const modalElement = new Modal(`#${idDialog}`);
                    modalElement.show();
                }}
            >
                <i className="bi bi-credit-card me-2" />
                Перейти к оплате
            </div>

            <YesNoDialog
                dialogId={idDialog}
                message={question}
                onAccept={onAccept}
            />
        </div>
    );
};

GoToPayButton.propTypes = {
    onAccept: PropTypes.func.isRequired
};

export default GoToPayButton;
