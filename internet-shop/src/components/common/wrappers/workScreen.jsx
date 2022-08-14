import React from "react";
import PropTypes from "prop-types";

const WorkScreen = ({ children }) => {
    return (
        <div className="p-2">
            <div className="d-flex">{children}</div>
        </div>
    );
};

WorkScreen.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default WorkScreen;
