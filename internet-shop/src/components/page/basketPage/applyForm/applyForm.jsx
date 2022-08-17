import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { applyBasket } from "../../../../store/basket";
import GroupWrapper from "./group";
import defMap from "./data";
import { valueOfName, createGroups } from "./utils";
// import payments from "./payments";
// import deliveries from "./deliveries";

class ApplyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        Object.keys(defMap).forEach(
            (key) => (this.state[key] = valueOfName(key))
        );
        this.applyRefs = React.createRef();
        this.handleCange = this.handleCange.bind(this);
    }

    componentDidMount() {
        if (this.props.user) {
            this.handleCange({
                target: { name: "persone", value: this.props.user.name }
            });
        }
        console.log("item", this.state);
    }

    componentDidUpdate(prevProps, prevState) {
        // if (
        //     this.props.user &&
        //     JSON.stringify(this.props.user) !== JSON.stringify(prevProps.user)
        // ) {
        //     const item = { ...this.state.persone };
        //     item.value = this.props.user.name;
        //     this.setState((prev) => (prev = { ...prev, persone: { ...item } }));
        // }
    }

    handleCange({ target }) {
        this.setState((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log("this.stete", this.state);
    }

    getOptions(item) {
        return Object.keys(item.src).map((key, index) => (
            <option value={item.src[key].value} key={index + 1}>
                {item.src[key].label}
            </option>
        ));
    }

    createItem(name, index) {
        const classname = (item) => {
            // table-input
            return `${
                item.type === "select"
                    ? "form-select form-select-sm"
                    : "form-control form-control-sm"
            }`;
        };
        const item = defMap[name];
        const label = item.title;
        const key = index + 1;
        const ref = this.applyRefs;
        const id = `item-${key}}`;

        const field = {
            type: item.type,
            id,
            name,
            className: classname(item),
            value: this.state[name],
            onChange: this.handleCange,
            // placeholder: label,
            ref
        };

        return (
            <div key={key} className=" mb-1 ">
                <label htmlFor={id}>{label}</label>
                {item.type === "textarea" ? (
                    <textarea key={key} {...field} />
                ) : item.type === "select" ? (
                    <select key={key} {...field}>
                        {this.getOptions(item)}
                    </select>
                ) : (
                    <input key={key} {...field} />
                )}
            </div>
        );
    }

    createItems(data) {
        return (
            <>
                createGroups(data)
                <GroupWrapper title="Контакт">
                    {["persone", "phone"].map(
                        (key, index) =>
                            !(key === "data") && this.createItem(key, index)
                    )}
                </GroupWrapper>
                <GroupWrapper title="Доставка и оплата">
                    {["delivery", "payment"].map(
                        (key, index) =>
                            !(key === "data") && this.createItem(key, index)
                    )}
                </GroupWrapper>
                {["address", "note"].map(
                    (key, index) =>
                        !(key === "data") && this.createItem(key, index)
                )}
            </>
        );
        // return Object.keys(this.state).map(
        //     (key, index) => !(key === "data") && this.createItem(key, index)
        // );
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
                        <div className="card-body">
                            {this.createItems(defMap)}
                        </div>
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
