import React from "react";
import PropTypes from "prop-types";
import { Modal } from "bootstrap";

import YesNoDialog from "../../../dialogs/yesNoDialog";

const ClearBasketButton = ({ onAccept }) => {
    const question = "Вы действительно желаете очистить вашу корзину?";
    const idDialog = "clearBasketYesNoModal";

    return (
        <div>
            <div
                role="button"
                onClick={() => {
                    const modalElement = new Modal("#clearBasketYesNoModal");
                    modalElement.show();
                }}
            >
                <i className="bi bi-x-lg me-2" />
                Очистить корзину
            </div>
            <YesNoDialog
                dialogId={idDialog}
                message={question}
                onAccept={onAccept}
            />
        </div>
    );
};

ClearBasketButton.propTypes = {
    onAccept: PropTypes.func.isRequired
};

export default ClearBasketButton;
