import React, { useRef } from "react";
import PropTypes from "prop-types";

const SelectField = ({ name, placeholder, data, value, onChange }) => {
    const selectRef = useRef(null);
    return (
        <div className="col-auto">
            <div className="input-group">
                <select
                    className="form-select"
                    id={name}
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    ref={selectRef}
                >
                    <option disabled value="">
                        {placeholder}
                    </option>
                    {data &&
                        data.length > 0 &&
                        data.map((option, index) => {
                            if (option._id) {
                                return (
                                    <option value={option._id} key={index + 1}>
                                        {option.name}
                                    </option>
                                );
                            } else {
                                return (
                                    <option value={option} key={index + 1}>
                                        {option}
                                    </option>
                                );
                            }
                        })}
                </select>
                <button
                    className="input-group-text btn btn-secondary"
                    title="Очистить"
                    role="button"
                    disabled={!value}
                    onClick={() => {
                        selectRef.current.value = "";
                        onChange({ target: selectRef.current });
                    }}
                >
                    <i className="bi bi-x-circle" />
                </button>
            </div>
        </div>
    );
};

SelectField.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    data: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default SelectField;
