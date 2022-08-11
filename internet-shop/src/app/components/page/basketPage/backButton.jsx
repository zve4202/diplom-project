import React from "react";
import { useHistory } from "react-router-dom";
const BackButton = () => {
    const history = useHistory();
    return (
        <div
            className="btn btn-outline-secondary w-100"
            onClick={() => history.goBack()}
            title="Вернуться к покупкам"
        >
            <i className="bi bi-caret-left"></i>
            Вернуться к покупкам
        </div>
    );
};

export default BackButton;
