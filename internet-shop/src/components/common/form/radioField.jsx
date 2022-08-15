import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, onChange, value, label, readOnly }) => {
    const handleChange = ({ target }) => {
        if (readOnly) return;
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return readOnly
            ? "form-control bg-secondary bg-opacity-10"
            : "form-control";
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <div className={getInputClasses()}>
                {options.map((option) => (
                    <div
                        key={option.name + "_" + option.value}
                        className="form-check form-check-inline"
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name={name}
                            id={option.name + "_" + option.value}
                            checked={option.value === value}
                            value={option.value}
                            onChange={handleChange}
                            readOnly={readOnly}
                            // disabled={readOnly}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={option.name + "_" + option.value}
                        >
                            {option.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

RadioField.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    readOnly: PropTypes.bool
};

export default RadioField;
