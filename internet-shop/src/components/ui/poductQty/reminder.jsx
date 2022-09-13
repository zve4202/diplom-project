import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";

import {
    addReminder,
    removeReminder,
    updateReminder
} from "../../../store/reminders";

class Reminder extends Component {
    inputRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = { reminder: null, reminderNeedFocus: false };
        this.getValueFromProps = this.getValueFromProps.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.setReminderNeedFocus = this.setReminderNeedFocus.bind(this);
    }

    componentDidMount() {
        this.getValueFromProps();
    }

    componentDidUpdate(prevProps, prevState) {
        const { docs } = this.props;
        if (JSON.stringify(docs) !== JSON.stringify(prevProps.docs)) {
            this.getValueFromProps();
        }

        if (this.state.reminderNeedFocus && this.inputRef.current) {
            this.setReminderNeedFocus(false);
            this.inputRef.current.focus();
            this.inputRef.current.select();
        }
    }

    setReminderNeedFocus(state) {
        this.setState((prevState) => ({
            ...prevState,
            reminderNeedFocus: state
        }));
    }

    componentWillUnmount() {}

    getValueFromProps() {
        const { docs, data } = this.props;
        const doc = docs.find((item) => item.titleId === data.title._id);
        this.setState((prevState) => ({ ...prevState, reminder: doc }));
    }

    checkValue(value) {
        if (isNaN(value)) {
            value = 1;
        } else {
            value = Number(value);
        }

        const need = Math.max(1, value);
        return need;
    }

    handleChange({ target }) {
        const need = this.checkValue(target.value.replace(/[^\d]/, ""));
        const { action } = this.state;
        const { updateReminder } = this.props;
        const { title, priceRub } = this.props.data;
        const data = { titleId: title._id, action, need, price: priceRub };
        updateReminder(data);
    }

    handleToggle({ target }) {
        if (target.nodeName !== "SPAN") {
            target = target.parentNode;
        }

        const { action } = this.state || { action: "nothing" };
        const { title, priceRub } = this.props.data;

        if (target.nodeName === "SPAN") {
            if (target.id === "nothing" && !this.state) return;
            if (action === target.id) return;

            const { removeReminder, addReminder, updateReminder } = this.props;

            if (target.id === "nothing") {
                removeReminder(title._id);
                return;
            }

            let data = {
                ...this.state,
                titleId: title._id,
                action: target.id
            };
            switch (target.id) {
                case "to-order":
                    data = { ...data, need: 1, price: priceRub };
                    this.setReminderNeedFocus(true);
                    break;
                case "notify-me":
                    data = { ...data, need: 0, price: 0 };
                    break;
                default:
                    break;
            }

            if (!this.state) {
                addReminder(data);
            } else {
                updateReminder(data);
            }
        }
    }

    render() {
        const { handleChange, handleToggle } = this;
        const { reminder } = this.state;

        return (
            <div
                className="input-group mt-2 w-100"
                role="group"
                onClick={handleToggle}
            >
                <span
                    id="notify-me"
                    className={classNames({
                        "btn btn-outline-primary": true,
                        active: reminder && reminder.action === "notify-me"
                    })}
                    title="Оповестить меня, в случае постуаления"
                >
                    <i className="bi bi-envelope" />
                </span>

                <span
                    id="to-order"
                    className={classNames({
                        "btn btn-outline-danger": true,
                        active: reminder && reminder.action === "to-order"
                    })}
                    title="При поступлении добавить в заказ, и оповестить меня"
                >
                    <i className="bi bi-bag" />
                </span>
                {reminder && reminder.action === "to-order" && (
                    <input
                        ref={this.inputRef}
                        type="text"
                        className="form-control table-input text-center"
                        value={reminder.need}
                        onChange={handleChange}
                        title="Введите количество чтобы добавить товар в будущий заказ"
                    />
                )}

                {reminder && (
                    <span
                        id="nothing"
                        className="btn btn-outline-secondary"
                        title="Ничего не нужно"
                    >
                        <i className="bi bi-x-circle" />
                    </span>
                )}
            </div>
        );
    }
}

Reminder.propTypes = {
    data: PropTypes.object.isRequired,
    docs: PropTypes.arrayOf(PropTypes.object),
    addReminder: PropTypes.func,
    removeReminder: PropTypes.func,
    updateReminder: PropTypes.func
};

const mapStateToProps = (state) => {
    const { docs } = state.reminder;
    return { docs };
};

const mapDispatchToProps = {
    addReminder,
    removeReminder,
    updateReminder
};

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
