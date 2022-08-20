import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { applyBasket } from "../../../../store/basket";
import fieldsMap from "./data";
import {
    createDefaults,
    createGroups,
    defaultData,
    validatorConfig
} from "./utils";
import { validator } from "../../../../utils/validator";
// import SelectEdit from "../../../common/form/SelectEdit";
// import TextEdit from "../../../common/form/TextEdit";
// import PlaceIdField from "./placeIdField";
// import MemoEdit from "../../../common/form/MemoEdit";

class ApplyForm extends Component {
    constructor(props) {
        super(props);
        createDefaults();
        this.state = { data: { ...defaultData }, errors: {} };
        this.applyRefs = React.createRef();
        this.handleCange = this.handleCange.bind(this);
    }

    componentDidMount() {
        if (this.props.user) {
            this.handleCange({ name: "persone", value: this.props.user.name });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.user?.name !== prevProps.user?.name) {
            if (this.props.user && !this.state.persone) {
                this.handleCange({
                    name: "persone",
                    value: this.state.persone
                });
            }
        }
        if (this.state.data !== prevState.data) {
            this.validate();
        }
    }

    handleCange({ name, value }) {
        this.setState((prevState) => ({
            ...prevState,
            data: { ...prevState.data, [name]: value }
        }));
    }

    setErrors(errors) {
        this.setState((prevState) => ({
            ...prevState,
            errors: { ...errors }
        }));
    }

    validate() {
        const errors = validator(this.state.data, validatorConfig);
        this.setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    getOptions(item) {
        if (!item.src) return null;
        return Object.keys(item.src).map((key, index) => ({
            value: item.src[key].value,
            label: item.src[key].label
        }));
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
            value: this.state.data[name] || "",
            onChange: this.handleCange,
            placeholder: item.placeholder || label,
            error: this.state.errors[name],
            options: this.getOptions(item)
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

    createItems() {
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
        const { status, step } = this.props;
        if (status === "basket") return null;
        console.log("item", this.state);

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
                            Корзина проверена. Можно приступать к оформлению
                            заказа.
                        </div>
                        <div className="card-body">{this.createItems()}</div>
                    </div>
                )}
            </div>
        );
    }
}

ApplyForm.propTypes = {
    status: PropTypes.string,
    step: PropTypes.string.isRequired,
    user: PropTypes.object
};

const mapStateToProps = (state) => ({
    status: state.basket.data.status,
    user: state.auth.currentUser
});

const mapDispatchToProps = {
    applyBasket
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyForm);
