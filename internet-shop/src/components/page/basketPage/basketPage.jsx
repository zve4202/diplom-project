import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import menu from "./menu";
import {
    applyBasket,
    checkBasket,
    loadBasket,
    loadBasketItems,
    payOrder
} from "../../../store/basket";
import WorkScreen from "../../common/wrappers/workScreen";
import ContentWrapper from "../../common/wrappers/content";
import BasketTable from "./table/basketTable";
import ApplyForm from "./applyForm/applyForm";
import BasketSidebar from "./basketSidebar";

class BasketPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: "show"
        };
        this.handleReload = this.handleReload.bind(this);
        this.setCurrStep = this.setCurrStep.bind(this);
        this.setStepName = this.setStepName.bind(this);
        this.handleCheckAndPay = this.handleCheckAndPay.bind(this);
    }

    setCurrStep() {
        const { data } = this.props;
        let step = "show";
        switch (data.status) {
            case "basket":
                break;
            case "checked":
                step = "check";
                break;
            case "needpay":
                step = "needpay";
                break;
            default:
                step = "undoCheck";
                break;
        }
        this.setStepName(step);
        this.handleReload();
    }

    setStepName(step) {
        this.setState((state) => ({ ...state, step }));
    }

    componentDidMount() {
        this.setCurrStep();
    }

    handleCheckAndPay(todo) {
        this.setStepName(todo);
    }

    componentDidUpdate(prevProps, prevState) {
        const { step } = this.state;
        const { data, checkBasket, applyBasket, payOrder } = this.props;
        const { status } = data;
        try {
            if (step !== prevState.step) {
                if (status === "basket" && step === "check") {
                    checkBasket();
                } else if (status === "checked") {
                    if (step === "apply") {
                        applyBasket();
                    }
                } else if (status === "needpay" && step === "topay") {
                    payOrder();
                }
            }
        } catch (error) {
            console.log(error);
        }

        if (status !== prevProps.data.status) {
            setTimeout(() => {
                this.handleReload();
            }, [250]);
        }
    }

    componentWillUnmount() {}

    handleReload() {
        const { data, loadBasketItems } = this.props;
        if (data._id) {
            loadBasketItems(data._id);
        }
    }

    render() {
        const { step } = this.state;
        const { data, productsLoading } = this.props;
        const { products } = data;
        console.log("render", data);

        return (
            <WorkScreen>
                <BasketSidebar
                    menu={menu}
                    step={step}
                    onCheckAndPay={this.handleCheckAndPay}
                />
                <ContentWrapper menu={menu.caption}>
                    <ApplyForm step={step} />
                    <BasketTable
                        name={menu.name}
                        data={products || []}
                        loading={productsLoading}
                        onReload={this.handleReload}
                        readOnly={data.status !== "basket"}
                    />
                </ContentWrapper>
            </WorkScreen>
        );
    }
}

BasketPage.propTypes = {
    data: PropTypes.object,
    docsLoading: PropTypes.bool,
    productsLoading: PropTypes.bool,
    applyBasket: PropTypes.func,
    checkBasket: PropTypes.func,
    loadBasket: PropTypes.func,
    loadBasketItems: PropTypes.func,
    payOrder: PropTypes.func
};

const mapStateToProps = (state) => {
    const { data, docsLoading, productsLoading } = state.basket;
    return {
        data,
        docsLoading,
        productsLoading
    };
};

const mapDispatchToProps = {
    applyBasket,
    checkBasket,
    loadBasket,
    loadBasketItems,
    payOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(BasketPage);
