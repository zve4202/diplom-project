import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const PlaceIdField = forwardRef((props, ref) => {
    const {
        label,
        value,
        onChange,
        defaultOption,
        options,
        error,
        name,
        readOnly,
        ...rest
    } = props;

    const isSelect = Array.isArray(options) && options.length > 0;
    const handleChange = ({ target }) => {
        if (readOnly) return;
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        if (isSelect) {
            return readOnly
                ? "form-select bg-secondary bg-opacity-10"
                : "form-select" + (error ? " is-invalid" : "");
        } else {
            return readOnly
                ? "form-control bg-secondary bg-opacity-10"
                : "form-control" + (error ? " is-invalid" : "");
        }
    };

    return (
        <div className={rest.className}>
            <label htmlFor={name}>
                <span className="text-truncate">{label}</span>
            </label>
            {!isSelect && (
                <input
                    type="text"
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                    readOnly={readOnly}
                    placeholder={rest.placeholder || label}
                    title={rest.placeholder || label}
                    style={{ textTransform: "capitalize" }}
                />
            )}

            {isSelect && (
                <select
                    className={getInputClasses()}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={rest.placeholder || label}
                    readOnly={readOnly}
                    title={rest.placeholder || label}
                >
                    <option disabled value="">
                        {defaultOption}
                    </option>
                    {options &&
                        options.length > 0 &&
                        options.map((option) => (
                            <option value={option.value} key={option.value}>
                                {option.label}
                            </option>
                        ))}
                </select>
            )}

            {error && (
                <div className="invalid-feedback text-truncate">{error}</div>
            )}
        </div>
    );
});

PlaceIdField.defaultProps = {
    defaultOption: "Выбрать..."
};

PlaceIdField.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    readOnly: PropTypes.bool
};
PlaceIdField.displayName = "PlaceIdField";

export default PlaceIdField;
