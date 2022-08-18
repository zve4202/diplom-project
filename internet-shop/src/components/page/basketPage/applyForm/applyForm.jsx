import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import fieldsMap from "./data";
import {
    // valueOfName,
    createGroups
} from "./utils";
import { validator } from "../../../../utils/validator";
import TextField from "../../../common/form/textField";
import SelectField from "../../../common/form/selectField";
import { getAuth } from "../../../../store/auth";

// const defaultData = {};
const defaultData = {
    setId: "",
    persone: "",
    phone: "",
    delivery: "",
    payment: "",
    index: "",
    address: "",
    note: ""
};

const defaultConfig = {};

const createDefaults = () => {
    // if (Object.keys(defaultData).length > 0) return;
    Object.keys(fieldsMap).forEach((key) => {
        // defaultData[key] = valueOfName(key);
        creatValidConfiguration(key);
    });
};

createDefaults();

function addValidatorConfig(name, rule, message) {
    if (defaultConfig[name]?.[rule]) return;
    const config = defaultConfig[name] || {};
    let newRule = { message: message };

    if (typeof message === "object") {
        newRule = { ...message };
    }

    config[rule] = newRule;

    defaultConfig[name] = config;
}

function creatValidConfiguration(name) {
    const item = fieldsMap[name];

    if (item.required) {
        addValidatorConfig(name, "isRequired", "Обязательно для заполнения");
    }
    if (name === "password") {
        addValidatorConfig(
            name,
            "isCapitalSymbol",
            "Пароль должен содержать хотя бы одну заглавную букву"
        );
        addValidatorConfig(
            name,
            "isContainDigit",
            "Пароль должен содержать хотя бы одно число"
        );
        addValidatorConfig(name, "min", {
            message: "Пароль должен состоять минимум из 8 символов",
            value: 8
        });
    }
}

const ApplyForm = (props) => {
    const { step, validatorConfig = defaultConfig } = props;

    const { currentUser } = useSelector(getAuth());
    const status = useSelector((state) => state.basket.data.status);
    const applyRefs = useRef();
    const [data, setData] = useState(defaultData);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        validate();
        console.log("data, validatorConfig", data, validatorConfig);
    }, [data]);

    useEffect(() => {
        if (currentUser) {
            handleCange("persone", currentUser.name);
        }
    }, [currentUser]);

    function validate() {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleCange = (name, value) => {
        console.log("data, validatorConfig", name, value);

        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    function getOptions(item) {
        return Object.keys(item.src).map((key) => ({
            value: item.src[key].value,
            label: item.src[key].label
        }));
    }

    function createItem(name, index, classes) {
        const classname = () => {
            const result = classes || "mb-1";
            return result;
        };
        const item = fieldsMap[name];
        const label = item.title;
        const key = index + 1;
        const ref = applyRefs;
        const id = `item-${key}}`;

        const attr = {
            name,
            label,
            className: classname(item),
            onChange: handleCange,
            placeholder: item.placeholder || label,
            value: data[name],
            error: errors[name],
            ref
        };

        switch (item.component) {
            case "TextField":
                return <TextField key={key} {...attr} />;
            case "SelectField":
                return (
                    <SelectField
                        key={key}
                        options={getOptions(item)}
                        {...attr}
                    />
                );

            default:
                break;
        }
        return (
            <div key={key} className="mb-1 ">
                <label htmlFor={id}>{label}</label>
                {item.type === "textarea" ? (
                    <textarea key={key} {...props} />
                ) : item.type === "select" ? (
                    <select key={key} {...props}>
                        {getOptions(item)}
                    </select>
                ) : (
                    <input key={key} {...props} />
                )}
            </div>
        );
    }

    function groupWrapper(key, group, gIndex) {
        if (Array.isArray(group)) {
            return (
                <div className="mb-1" key={key}>
                    <div className="row g-3">
                        {group.map((key, index) => {
                            const item = fieldsMap[key];
                            const classCol = item.size
                                ? "col-" + item.size
                                : "col";
                            return createItem(key, index, classCol);
                        })}
                    </div>
                </div>
            );
        } else {
            return createItem(key, gIndex);
        }
    }

    function createItems(data) {
        const groups = createGroups(data);
        return (
            <>
                {Object.keys(groups).map((key, index) => {
                    const group = groups[key];
                    return groupWrapper(key, group, index);
                })}
            </>
        );
    }

    // const { status, step } = props;
    if (status === "basket") return null;

    return (
        <div>
            {step === "check" && (
                <div className="form-control bg-success bg-opacity-10 text-md-center text-success">
                    <span className="spinner-border spinner-border-sm  me-2" />
                    Корзина на проверке...
                </div>
            )}
            {status === "checked" && (
                <div className="card col-md-8">
                    <div className="card-header">
                        <i className="bi bi-check2-square me-2" />
                        Корзина проверена. Можно приступать к оформлению заказа.
                    </div>
                    <div className="card-body">{createItems(fieldsMap)}</div>
                </div>
            )}
        </div>
    );
};

ApplyForm.propTypes = {
    status: PropTypes.string,
    step: PropTypes.string.isRequired,
    validatorConfig: PropTypes.object
};

// const mapStateToProps = (state) => ({
//     status: state.basket.data.status,
//     user: state.auth.currentUser
// });

// const mapDispatchToProps = {
//     applyBasket
// };

export default ApplyForm;
