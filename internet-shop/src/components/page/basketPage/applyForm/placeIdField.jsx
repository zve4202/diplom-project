import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { getPlaceOptions, loadAuthUser } from "../../../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { resetDlvInfo, saveDlvInfo } from "../../../../store/basket";

const PlaceIdField = (props) => {
    const { label, value, onChange, error, name, readOnly, ...rest } = props;
    const dispatch = useDispatch();
    const defaultOption = "Выбрать...";
    const options = useSelector(getPlaceOptions());
    const { data, saveInfo } = useSelector((state) => state.basket);

    const ref = useRef(null);
    const [addNew, setAddNew] = useState(false);
    const [selectMode, setSelectMode] = useState(!addNew && options.length > 0);

    useEffect(() => {
        setSelectMode(!addNew && options.length > 0);
    }, [saveInfo]);

    useEffect(() => {
        if (addNew && ref && ref.current) {
            ref.current.value = "";
            ref.current.focus();
            onChange({ name, value: "ADD_NEW" });
        } else if (ref && ref.current) {
            ref.current.focus();
        }
    }, [addNew, ref, ref.current]);

    const handleChange = ({ target }) => {
        if (readOnly) return;
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        if (selectMode) {
            return readOnly
                ? "form-select bg-secondary bg-opacity-10"
                : "form-select" + (error ? " is-invalid" : "");
        } else {
            return readOnly
                ? "form-control bg-secondary bg-opacity-10"
                : "form-control" + (error ? " is-invalid" : "");
        }
    };

    const addPlace = () => {
        setAddNew(true);
    };

    const savePlace = () => {
        setAddNew(false);
        dispatch(saveDlvInfo());
        dispatch(loadAuthUser());
    };

    const restorePlace = () => {
        setAddNew(false);
        dispatch(resetDlvInfo());
    };

    if (selectMode) {
        return (
            <div className={rest.className}>
                <label htmlFor={name}>
                    <span className="text-truncate">{label}</span>
                </label>

                <div className="input-group">
                    <select
                        className={getInputClasses()}
                        ref={ref}
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
                    <button
                        className="btn btn-outline-success"
                        title="Добавить место"
                        onClick={addPlace}
                    >
                        <i className="bi bi-plus-circle"></i>
                    </button>
                    <button
                        className="btn btn-primary"
                        title="Сохранить"
                        onClick={savePlace}
                        disabled={!(saveInfo && data.deliveryInfo.isValid)}
                    >
                        <i className="bi bi-save" />
                    </button>
                    <button
                        className="btn btn-secondary"
                        title="Отменить"
                        onClick={restorePlace}
                        disabled={!saveInfo}
                    >
                        <i className="bi bi-x-square" />
                    </button>
                </div>

                {error && (
                    <div className="invalid-feedback text-truncate">
                        {error}
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div className={rest.className}>
                <label htmlFor={name}>
                    <span className="text-truncate">{label}</span>
                </label>
                <div className="input-group">
                    <input
                        ref={ref}
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
                    <button
                        className="btn btn-primary"
                        title="Сохранить"
                        onClick={savePlace}
                        disabled={!(saveInfo && data.deliveryInfo.isValid)}
                    >
                        <i className="bi bi-save" />
                    </button>
                    <button
                        className="btn btn-secondary"
                        title="Отменить"
                        onClick={restorePlace}
                        disabled={!saveInfo}
                    >
                        <i className="bi bi-x-square" />
                    </button>
                </div>
                {error && (
                    <div className="invalid-feedback text-truncate">
                        {error}
                    </div>
                )}
            </div>
        );
    }
};

PlaceIdField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    name: PropTypes.string,
    readOnly: PropTypes.bool
};

PlaceIdField.displayName = "PlaceIdField";

export default PlaceIdField;
