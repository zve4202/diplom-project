import React, { forwardRef, useState } from "react";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import PropTypes from "prop-types";

const SelectSearchEdit = forwardRef((props, ref) => {
    const {
        source,
        onChange,
        error,
        name,
        label,
        placeholder,
        readOnly,
        ...rest
    } = props;

    const [query, setQuery] = useState("");
    const animatedComponents = makeAnimated();

    const loadOptions = () => {
        const regex = new RegExp(query, "gi");
        return source.filter((item) => regex.test(item.name));
    };

    const handleChange = (value) => {
        onChange({ name: name, value });
    };

    const getInputClasses = () => {
        return readOnly
            ? "bg-secondary bg-opacity-10"
            : error
            ? " is-invalid"
            : "";
    };

    return (
        <div key={rest.key} className={rest.className}>
            {label && (
                <label htmlFor={name}>
                    <span className="text-truncate">{label}</span>
                </label>
            )}
            <div className="input-group has-validation">
                <AsyncSelect
                    id={name}
                    name={name}
                    cacheOptions
                    components={animatedComponents}
                    getOptionLabel={(e) => e.name}
                    getOptionValue={(e) => e._id}
                    loadOptions={loadOptions}
                    className={getInputClasses()}
                    placeholder={placeholder}
                    onInputChange={(value) =>
                        setQuery(value.toLocaleLowerCase())
                    }
                    onChange={(value) => handleChange(value)}
                />
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

SelectSearchEdit.propTypes = {
    source: PropTypes.array,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    readOnly: PropTypes.bool
};
SelectSearchEdit.displayName = "SelectSearchEdit";

export default SelectSearchEdit;
