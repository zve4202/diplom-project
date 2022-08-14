import React from "react";
import PropTypes from "prop-types";

const ContentWrapper = ({ menu, children }) => {
    return (
        <div className="content_wrapper card bg-light p-2">
            <div className="card-header">
                <i className={`bi ${menu.icon} me-2`} />
                {menu.name}
            </div>
            {children}
        </div>
    );
};

ContentWrapper.propTypes = {
    menu: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ContentWrapper;
