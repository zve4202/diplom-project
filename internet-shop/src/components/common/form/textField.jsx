import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";

const TextField = forwardRef((props, ref) => {
    const { label, type, name, value, onChange, error, readOnly, ...rest } =
        props;
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({ target }) => {
        if (readOnly) return;
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return readOnly
            ? "form-control form-control-sm bg-secondary bg-opacity-10"
            : "form-control form-control-sm" + (error ? " is-invalid" : "");
    };

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
        if (ref) {
            ref.current.focus();
            ref.current.select();
        }
    };
    return (
        <div className={rest.className}>
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                    readOnly={readOnly}
                    placeholder={rest.placeholder || label}
                    title={rest.placeholder || label}
                    ref={ref}
                />
                {type === "password" && (
                    <div
                        className="btn btn-sm btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i
                            className={
                                "bi bi-eye" + (showPassword ? "-slash" : "")
                            }
                        ></i>
                    </div>
                )}
                {error && (
                    <div
                        className="invalid-feedback text-truncate"
                        title={error}
                    >
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
});
TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    readOnly: PropTypes.bool
};

TextField.displayName = "TextField";

export default TextField;
