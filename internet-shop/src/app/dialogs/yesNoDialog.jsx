import React from "react";
import PropTypes from "prop-types";

import { appTitle } from "../config.json";
import logo from "../assets/brand/favicon.ico";

const YesNoDialog = ({ dialogId, message, onAccept }) => {
    return (
        <div
            className="modal fade bg-light"
            id={dialogId}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            <img
                                src={logo}
                                alt=""
                                width="24"
                                height="24"
                                className="me-1"
                            />
                            {appTitle}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            data-bs-dismiss="modal"
                            onClick={onAccept}
                        >
                            Да, желаю!
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            data-bs-dismiss="modal"
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

YesNoDialog.propTypes = {
    dialogId: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired
};

export default YesNoDialog;
