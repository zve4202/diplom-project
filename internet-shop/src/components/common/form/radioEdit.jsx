import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const RadioEdit = forwardRef((props, ref) => {
    const { options, name, onChange, value, label, readOnly, ...rest } = props;

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
        <div className={rest.className}>
            <label htmlFor={name}>
                <span className="text-truncate">{label}</span>
            </label>
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
});

RadioEdit.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    readOnly: PropTypes.bool
};

RadioEdit.displayName = "RadioEdit";

export default RadioEdit;
