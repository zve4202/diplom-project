import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";

const TextEdit = forwardRef((props, ref) => {
    const { type, label, name, value, onChange, error, readOnly, ...rest } =
        props;

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({ target }) => {
        if (readOnly) return;
        // if (rest.nameCase) {
        //     target.value = target.value.replace("  ", " ");
        // }
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return readOnly
            ? "form-control bg-secondary bg-opacity-10"
            : "form-control" + (error ? " is-invalid" : "");
    };

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
        if (ref) {
            ref.current.focus();
            ref.current.select();
        }
    };

    const style = rest.nameCase ? { textTransform: "capitalize" } : undefined;

    return (
        <div key={rest.key} className={rest.className}>
            <label htmlFor={name}>
                <span className="text-truncate">{label}</span>
            </label>
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
                    autoCapitalize={rest.autoCapitalize}
                    style={style}
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
TextEdit.defaultProps = {
    type: "text"
};
TextEdit.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    readOnly: PropTypes.bool
};

TextEdit.displayName = "TextEdit";

export default TextEdit;
