import React from "react";
import PropTypes from "prop-types";

const GroupWrapper = ({ children }) => {
    return (
        <div className="mb-1">
            <div className="row g-3">
                {React.Children.map(children, (child, index) => (
                    <div className="col" key={index + 1}>
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
};

GroupWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default GroupWrapper;
