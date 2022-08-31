import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateDlvInfo, payOrder } from "../../../../store/basket";
import MaskEdit from "../../../common/form/maskEdit";
import CheckAlerter from "../applyForm/alerter";
import { validator } from "../../../../utils/validator";

const validatorConfig = {
    cardNumber: {
        isRequired: {
            message: "Требует заполнения"
        },
        isCardNumber: {
            message: "Некорректный номер карты"
        }
    },
    dateEnd: {
        isRequired: {
            message: "Требует заполнения"
        },
        isMonthYear: {
            message: "Введите правильную дату"
        }
    },
    cvcCode: {
        isRequired: {
            message: "Требует заполнения"
        },
        isCVC: {
            message: "Введите правильный CVC"
        }
    }
};

class PayForm extends Component {
    constructor(props) {
        super(props);
        const { deliveryInfo } = this.props.data;
        this.state = {
            deliveryInfo: { ...deliveryInfo },
            creditCard: { cardNumber: "", dateEnd: "", cvcCode: "" },
            errors: {}
        };
        this.isValid = false;

        this.applyRefs = React.createRef();
        this.handleCange = this.handleCange.bind(this);
    }

    handleCange({ name, value }) {
        const creditCard = { ...this.state.creditCard, [name]: value };
        this.setState((prevState) => ({
            ...prevState,
            creditCard
        }));
    }

    componentDidMount() {
        this.validate();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            JSON.stringify(this.state.creditCard) !==
            JSON.stringify(prevState.creditCard)
        ) {
            this.isValid = this.validate();
        }
    }

    componentWillUnmount() {}

    handleSubmit(e) {
        e.preventDefault();
        if (this.validate()) {
            this.props.payOrder();
        }
    }

    setErrors(errors) {
        this.setState((prevState) => ({
            ...prevState,
            errors: { ...errors }
        }));
    }

    validate() {
        const errors = validator(this.state.creditCard, validatorConfig);
        this.setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    render() {
        const { step, data } = this.props;
        const { creditCard, errors } = this.state;
        return (
            <div className="px-0">
                {step === "apply" && (
                    <div className="form-control bg-success bg-opacity-10 text-md-center text-success">
                        <span className="spinner-border spinner-border-sm  me-2" />
                        Заказ на обработке...
                    </div>
                )}
                {data.status === "needpay" && (
                    <div>
                        <div className="card-header">
                            <i className="bi bi-credit-card-2-back me-2" />
                            Введите данные кредитной карты.
                        </div>
                        <div className="col-md-8">
                            <div className="card-body px-0">
                                <CheckAlerter data={data.checkedAt} />
                                <div className="col-md-6">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="row mb-1">
                                            <MaskEdit
                                                {...{
                                                    label: "Номер кредитной карты",
                                                    type: "card",
                                                    name: "cardNumber",
                                                    value: creditCard.cardNumber,
                                                    onChange: this.handleCange,
                                                    error: errors.cardNumber,
                                                    placeholder:
                                                        "0000 0000 0000 0000",
                                                    title: "Номер кредитной карты"
                                                }}
                                            />
                                        </div>
                                        <div className="row mb-3 g-3">
                                            <div className="col-4">
                                                <MaskEdit
                                                    {...{
                                                        label: "Дата",
                                                        type: "monYear",
                                                        name: "dateEnd",
                                                        value: creditCard.dateEnd,
                                                        onChange:
                                                            this.handleCange,
                                                        error: errors.dateEnd,
                                                        placeholder: "ММ/ГГ",
                                                        title: "Срок действия карты"
                                                    }}
                                                />
                                            </div>
                                            <div className="col-4">
                                                <MaskEdit
                                                    {...{
                                                        label: "CVV/CVC",
                                                        type: "cvc",
                                                        name: "cvcCode",
                                                        value: creditCard.cvcCode,
                                                        onChange:
                                                            this.handleCange,
                                                        error: errors.dateEnd,
                                                        placeholder: "CVC код",
                                                        title: "CVV/CVC код"
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            className="btn btn-primary w-100"
                                            type="submit"
                                            disabled={!this.isValid}
                                            title="Оплатить покупку"
                                        >
                                            Оплатить покупку
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

PayForm.propTypes = {
    data: PropTypes.object,
    step: PropTypes.string.isRequired,
    authUser: PropTypes.object,
    updateDlvInfo: PropTypes.func,
    payOrder: PropTypes.func
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
    updateDlvInfo,
    payOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(PayForm);
