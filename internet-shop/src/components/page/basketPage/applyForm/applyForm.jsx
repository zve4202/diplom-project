import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import payments from "./payments";
import deliveries from "./deliveries";
import { updateDlvInfo } from "../../../../store/basket";
import fieldsMap from "./applyMap";
import {
    createDefaults,
    createGroups,
    defaultData,
    validatorConfig
} from "./utils";
import { validator } from "../../../../utils/validator";
import CheckAlerter from "./alerter";

class ApplyForm extends Component {
    constructor(props) {
        super(props);
        createDefaults();
        const { deliveryInfo } = this.props.data;
        this.state = {
            deliveryInfo: { ...(deliveryInfo || defaultData) },
            errors: {}
        };

        this.applyRefs = React.createRef();
        this.handleCange = this.handleCange.bind(this);
    }

    componentDidMount() {
        const { persone } = this.state.deliveryInfo;
        const { authUser } = this.props;
        if (authUser && persone === "") {
            this.handleCange({
                name: "persone",
                value: authUser.name
            });
        }
        this.validate();
    }

    componentDidUpdate(prevProps, prevState) {
        const { persone } = this.state.deliveryInfo;
        const { authUser } = this.props;
        const currName = authUser?.name || "";
        const prevName = prevProps.authUser?.name || "";
        if (currName !== prevName) {
            if (currName !== "" && persone === "") {
                this.handleCange({
                    name: "persone",
                    value: currName
                });
            }
        }

        if (
            JSON.stringify(this.state.deliveryInfo) !==
            JSON.stringify(prevState.deliveryInfo)
        ) {
            const isValid = this.validate();

            this.handleCange({
                name: "isValid",
                value: isValid
            });

            this.props.updateDlvInfo({
                ...this.state.deliveryInfo,
                isValid
            });
        }
    }

    handleCange({ name, value }) {
        const deliveryInfo = { ...this.state.deliveryInfo, [name]: value };
        switch (name) {
            case "delivery":
                switch (value) {
                    case deliveries.byRussianPost.value:
                        deliveryInfo.payment = deliveries.byRussianPost.payment;
                        break;
                    case deliveries.byCompanySDEK.value:
                        deliveryInfo.payment = deliveries.byCompanySDEK.payment;
                        break;
                    case deliveries.byCourier.value:
                        deliveryInfo.payment = deliveries.byCourier.payment;
                        break;
                    case deliveries.onPickupPoint.value:
                        deliveryInfo.payment = deliveries.onPickupPoint.payment;
                        break;
                    default:
                        break;
                }
                break;

            case "payment":
                break;

            default:
                break;
        }

        this.setState((prevState) => ({
            ...prevState,
            deliveryInfo
        }));
    }

    setErrors(errors) {
        this.setState((prevState) => ({
            ...prevState,
            errors: { ...errors }
        }));
    }

    validate() {
        const errors = validator(this.state.deliveryInfo, validatorConfig);
        this.setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    getOptions(name) {
        switch (name) {
            case "delivery": {
                return Object.keys(deliveries).map((key, index) => ({
                    value: deliveries[key].value,
                    label: deliveries[key].label
                }));
            }
            case "payment": {
                const { delivery } = this.state.deliveryInfo;
                return Object.keys(payments)
                    .map((key, index) => ({
                        value: payments[key].value,
                        label: payments[key].label,
                        visible: payments[key].visible
                    }))
                    .filter((p) => p.visible.includes(delivery));
            }
            default:
                return null;
        }
    }

    getReadOnly(name) {
        const { status } = this.props.data;
        if (status === "needpay") return true;
        switch (name) {
            case "index": {
                const { delivery } = this.state.deliveryInfo;
                return [
                    deliveries.byCourier.value,
                    deliveries.onPickupPoint.value
                ].includes(delivery);
            }
            case "address": {
                const { delivery } = this.state.deliveryInfo;
                return deliveries.onPickupPoint.value === delivery;
            }
            default:
                return false;
        }
    }

    getValue(name) {
        switch (name) {
            case "index": {
                const { delivery } = this.state.deliveryInfo;
                if (
                    [
                        deliveries.byCourier.value,
                        deliveries.onPickupPoint.value
                    ].includes(delivery)
                ) {
                    return "-";
                }
                return this.state.deliveryInfo[name] || "";
            }
            case "address": {
                const { delivery } = this.state.deliveryInfo;
                if (deliveries.onPickupPoint.value === delivery) {
                    return deliveries.onPickupPoint.label;
                }
                return this.state.deliveryInfo[name] || "";
            }
            default:
                return this.state.deliveryInfo[name] || "";
        }
    }

    createItem(name, gKey, classes) {
        const classname = () => {
            const result = classes || "mb-1";
            return result;
        };
        const item = fieldsMap[name];
        const label = item.title;

        const attr = {
            key: gKey.key,
            name,
            label,
            className: classname(item),
            value: this.getValue(name),
            onChange: this.handleCange,
            placeholder: item.placeholder || label,
            error: this.state.errors[name],
            options: this.getOptions(name),
            readOnly: this.getReadOnly(name)
        };

        return item.component(attr);
    }

    groupWrapper(key, group, gKey) {
        gKey.key += 1;
        if (Array.isArray(group)) {
            return (
                <div className="mb-1" key={key}>
                    <div className="row g-3">
                        {group.map((key, index) => {
                            const item = fieldsMap[key];
                            const classCol = item.size
                                ? "col-" + item.size
                                : "col";
                            gKey.key += index;
                            return this.createItem(key, gKey, classCol);
                        })}
                    </div>
                </div>
            );
        } else {
            return this.createItem(key, gKey);
        }
    }

    createControls() {
        const groups = createGroups(fieldsMap);
        const gKey = {
            key: 0
        };
        return (
            <>
                {Object.keys(groups).map((key, index) => {
                    const group = groups[key];

                    return this.groupWrapper(key, group, gKey);
                })}
            </>
        );
    }

    render() {
        const { todo, data } = this.props;

        if (data.status === "basket") return null;

        return (
            <div className="px-0">
                {todo === "check" && data.status === "basket" && (
                    <div className="form-control bg-success bg-opacity-10 text-md-center text-success">
                        <span className="spinner-border spinner-border-sm  me-2" />
                        Корзина на проверке...
                    </div>
                )}
                {todo === "apply" && (
                    <div className="form-control bg-success bg-opacity-10 text-md-center text-success">
                        <span className="spinner-border spinner-border-sm  me-2" />
                        Заказ в обработке...
                    </div>
                )}
                <div>
                    <div className="card-header">
                        <i className="bi bi-check2-square me-2" />
                        {data.status === "checked"
                            ? "Корзина проверена."
                            : "Заказ принят."}
                    </div>
                    <div className="col-md-8">
                        <div className="card-body px-0">
                            <CheckAlerter />
                            {this.createControls()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ApplyForm.propTypes = {
    data: PropTypes.object,
    todo: PropTypes.string.isRequired,
    authUser: PropTypes.object,
    updateDlvInfo: PropTypes.func
};

const mapStateToProps = (state) => {
    const { authUser } = state.auth;
    const { data } = state.basket;
    return {
        data,
        authUser
    };
};

const mapDispatchToProps = {
    updateDlvInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyForm);
