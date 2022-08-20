import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const CheckEdit = forwardRef((props, ref) => {
    const { name, value, onChange, children, error, readOnly, ...rest } = props;
    const handleChange = () => {
        if (readOnly) return;
        onChange({ name: name, value: !value });
    };
    const getInputClasses = () => {
        return readOnly
            ? "form-check-input bg-secondary bg-opacity-10"
            : "form-check-input" + (error ? " is-invalid" : "");
    };
    return (
        <div className="form-check mb-4">
            <input
                className={getInputClasses()}
                type="checkbox"
                value=""
                id={name}
                onChange={handleChange}
                checked={value}
                title={rest.placeholder}
                ref={ref}
            />
            <label htmlFor={name}>
                <span className="text-truncate">{children}</span>
            </label>

            {error && (
                <div className="invalid-feedback text-truncate">{error}</div>
            )}
        </div>
    );
});

CheckEdit.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string,
    readOnly: PropTypes.bool
};

CheckEdit.displayName = "CheckEdit";

export default CheckEdit;
