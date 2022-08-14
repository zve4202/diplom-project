import React from "react";
import PropTypes from "prop-types";

const sizeItems = [
    { value: 10, label: "10 / стр. " },
    { value: 50, label: "50 / стр." },
    { value: 100, label: "100 / стр." },
    { value: 200, label: "200 / стр." },
    { value: 500, label: "500 / стр." }
];

const SelectPageSize = ({ value, onChangePageSize, name }) => {
    const handleChange = ({ target }) => {
        onChangePageSize(Number(target.value));
    };
    return (
        <div className="page-item">
            <select
                className="form-select"
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                {sizeItems.map((option) => (
                    <option value={option.value} key={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

SelectPageSize.propTypes = {
    value: PropTypes.number,
    onChangePageSize: PropTypes.func.isRequired,
    name: PropTypes.string
};
export default SelectPageSize;
