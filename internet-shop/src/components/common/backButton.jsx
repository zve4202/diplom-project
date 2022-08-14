import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const BackButton = ({ caption, tooltip, to, ...rest }) => {
    const history = useHistory();
    return (
        <button
            className={`btn btn-sm btn-outline-secondary${
                rest.className ? " " + rest.className : ""
            }`}
            onClick={() => (to ? history.push(to) : history.goBack())}
            title={tooltip || "Вернуться к предыдущей странице"}
        >
            <i className={`bi bi-caret-left${caption ? " me-1" : ""}`} />
            {caption}
        </button>
    );
};

BackButton.propTypes = {
    caption: PropTypes.string,
    to: PropTypes.string,
    tooltip: PropTypes.string
};

export default BackButton;
