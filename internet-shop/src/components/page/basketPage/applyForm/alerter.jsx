import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { disassemble } from "../../../../store/basket";
import { sklonenie } from "../../../../utils/sklonenie";

const fiveMinutes = 5 * 60 * 1000;

class CheckAlerter extends Component {
    timerId;
    diff;
    diffDays;
    diffHours;
    diffMinutes;
    constructor(props) {
        super(props);
        const { checkedAt } = this.props.data;

        this.state = {
            checkedAt: checkedAt,
            refresh: false
        };

        this.refreshContent = this.refreshContent.bind(this);
        this.initDeadline = this.initDeadline.bind(this);
    }

    componentDidMount() {
        this.timerId = setInterval(this.refreshContent, fiveMinutes);
        this.initDeadline();
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    initDeadline() {
        const { checkedAt } = this.state;
        const deadline = new Date(checkedAt).setDate(
            new Date(checkedAt).getDate() + 3
        );
        const diff = deadline - new Date();
        this.diffDays = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        this.diffHours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        this.diffMinutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        if (diff <= 0) {
            this.props.disassemble();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.refresh !== prevState.refresh) {
            this.initDeadline();
        }
    }

    refreshContent() {
        this.setState((prevState) => ({
            ...prevState,
            refresh: !prevState.refresh
        }));
    }

    hoursLeft(hours) {
        return hours + " " + sklonenie(hours, ["час", "часа", "часов"]);
    }

    minutesLeft(minutes) {
        return (
            minutes + " " + sklonenie(minutes, ["минуту", "минуты", "минут"])
        );
    }

    className() {
        const { diffDays, diffHours } = this;
        let result = "alert alert-";
        if (diffDays >= 2 && diffHours > 22) {
            return (result += "success");
        }
        if (diffDays >= 1 && diffHours >= 12) {
            return (result += "warning");
        }
        return (result += "danger");
    }

    showText() {
        const { diffDays, diffHours, diffMinutes, hoursLeft, minutesLeft } =
            this;

        const iconInfo = <i className="bi bi-info-circle me-2" />;
        const iconSoKondratyCame = <i className="bi bi-x-circle me-2" />;
        const iconWhatAbout = <i className="bi bi-question-circle-fill me-2" />;
        const iconExclamation = <i className="bi bi-exclamation-circle me-2" />;
        const iconExclamationHard = (
            <i className="bi bi-exclamation-circle-fill me-2" />
        );

        if (diffDays >= 2 && diffHours > 22) {
            return (
                <span>
                    {iconInfo}Заказ проверен и зарезервирован за вами.
                    Пожалуйста, оформите заказ в течении 3 дней, иначе он будет
                    расформирован...
                </span>
            );
        }
        if (diffDays >= 1 && diffHours >= 12) {
            if (diffHours > 0) {
                return (
                    <span>
                        {iconExclamation}Напоминаем! Заказ будет расформирован
                        через 2 дня и {hoursLeft(diffHours)} если не оформите
                        его...
                    </span>
                );
            }
            return (
                <span>
                    {iconExclamation}Напоминаем! Заказ будет расформирован через
                    2 дня если не поспешите оформить его...
                </span>
            );
        }
        if (diffDays === 1) {
            if (diffHours > 0) {
                return (
                    <span>
                        {iconExclamationHard}Напоминаем! Заказ будет
                        расформирован через 1 день и {hoursLeft(diffHours)} если
                        не оформите его...
                    </span>
                );
            }

            return (
                <span>
                    {iconExclamationHard}Напоминаем! Заказ будет расформирован
                    через 1 день, если не оформите его...
                </span>
            );
        }
        if (diffDays === 0) {
            if (diffHours > 0) {
                return (
                    <span>
                        {iconWhatAbout}ВНИМАНИЕ!!! Заказ будет расформирован
                        через {hoursLeft(diffHours)} и{" "}
                        {minutesLeft(diffMinutes)} если не успеете оформить
                        его...
                    </span>
                );
            }

            if (diffMinutes > 0) {
                return (
                    <span>
                        {iconWhatAbout}ВНИМАНИЕ!!! Заказ будет расформирован
                        через {minutesLeft(diffMinutes)} если не успеете
                        оформить его...
                    </span>
                );
            }
            return <span>{iconSoKondratyCame}Заказ расформирован</span>;
        }
    }

    render() {
        if (!this.props.authUser) return null;
        return (
            <div className={this.className()} role="alert">
                {this.showText()}
            </div>
        );
    }
}

CheckAlerter.propTypes = {
    data: PropTypes.object,
    authUser: PropTypes.object,
    disassemble: PropTypes.func
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
    disassemble
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckAlerter);
