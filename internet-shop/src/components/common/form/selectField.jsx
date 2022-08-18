import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const SelectField = forwardRef((props, ref) => {
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

    console.log(label, value, onChange, defaultOption);
    const handleChange = ({ target }) => {
        if (readOnly) return;
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return readOnly
            ? "form-select form-select-sm bg-secondary bg-opacity-10"
            : "form-select form-select-sm" + (error ? " is-invalid" : "");
    };

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    return (
        <div className={rest.className}>
            <label htmlFor={name}>{label}</label>
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
                {optionsArray.length > 0 &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
});

SelectField.defaultProps = {
    defaultOption: "Выбрать..."
};

SelectField.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    readOnly: PropTypes.bool
};
SelectField.displayName = "TextField";

export default SelectField;
