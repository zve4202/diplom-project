import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const SelectEdit = forwardRef((props, ref) => {
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

    console.log("options", options);

    const handleChange = ({ target }) => {
        if (readOnly) return;
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return readOnly
            ? "form-select bg-secondary bg-opacity-10"
            : "form-select" + (error ? " is-invalid" : "");
    };

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    return (
        <div key={rest.key} className={rest.className}>
            <label htmlFor={name}>
                <span className="text-truncate">{label}</span>
            </label>
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
            {error && (
                <div className="invalid-feedback text-truncate">{error}</div>
            )}
        </div>
    );
});

SelectEdit.defaultProps = {
    defaultOption: "Выбрать..."
};

SelectEdit.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    readOnly: PropTypes.bool
};
SelectEdit.displayName = "TextEdit";

export default SelectEdit;
