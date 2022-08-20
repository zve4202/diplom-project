import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const GroupWrapper = forwardRef((props, ref) => {
    const { children, ...rest } = props;

    return (
        <div className={rest.className}>
            <div className="row g-3">
                {React.Children.map(children, (child, index) => (
                    <div className="col" key={index + 1}>
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
});

GroupWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
GroupWrapper.displayName = "GroupWrapper";

export default GroupWrapper;
