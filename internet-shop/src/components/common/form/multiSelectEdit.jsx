import React, { forwardRef } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectEdit = forwardRef((props, ref) => {
    const { options, onChange, name, label, defaultValue, readOnly, ...rest } =
        props;
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    const handleChange = (value) => {
        onChange({ name: name, value });
    };

    const getInputClasses = () => {
        return readOnly
            ? "basic-multi-select bg-secondary bg-opacity-10"
            : "basic-multi-select" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                options={optionsArray}
                className={getInputClasses()}
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
});

MultiSelectEdit.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array,
    readOnly: PropTypes.bool
};
MultiSelectEdit.displayName = "MultiSelectEdit";

export default MultiSelectEdit;
