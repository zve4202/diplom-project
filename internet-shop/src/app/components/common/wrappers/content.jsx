import React from "react";
import PropTypes from "prop-types";

const ContentWrapper = ({ selected, children }) => {
    return (
        <div className="content_wrapper card bg-light p-2">
            <div className="card-header mb-3">
                <i className={`bi ${selected.icon} me-2`} />
                {selected.name}
            </div>
            {children}
        </div>
    );
};

ContentWrapper.propTypes = {
    selected: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ContentWrapper;
