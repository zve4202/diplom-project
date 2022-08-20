import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const MemoEdit = forwardRef((props, ref) => {
    const { label, type, name, value, onChange, error, readOnly, ...rest } =
        props;

    const handleChange = ({ target }) => {
        if (readOnly) return;
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return readOnly
            ? "form-control bg-secondary bg-opacity-10"
            : "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div key={rest.key} className={rest.className}>
            <label htmlFor={name}>
                <span className="text-truncate">{label}</span>
            </label>
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                    readOnly={readOnly}
                    placeholder={rest.placeholder || label}
                    title={rest.placeholder || label}
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
MemoEdit.defaultProps = {
    type: "text"
};
MemoEdit.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    readOnly: PropTypes.bool
};

MemoEdit.displayName = "MemoEdit";

export default MemoEdit;
