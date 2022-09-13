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
            todo: "nothing"
        };
        this.handleReload = this.handleReload.bind(this);
        this.handleCheckAndPay = this.handleCheckAndPay.bind(this);
    }

    componentDidMount() {
        this.handleReload();
    }

    handleCheckAndPay(todo) {
        const { data, checkBasket, applyBasket, payOrder } = this.props;
        const { status } = data;
        this.setState({ todo });
        try {
            switch (status) {
                case "basket": {
                    if (todo === "check") {
                        checkBasket();
                        this.setState({ todo: "nothing" });
                    }
                    return;
                }
                case "checked": {
                    if (todo === "apply") {
                        applyBasket();
                        this.setState({ todo: "nothing" });
                    }
                    return;
                }
                case "needpay": {
                    if (todo === "topay") {
                        payOrder();
                        this.setState({ todo: "nothing" });
                    }
                    return;
                }
                default:
                    this.setState({ todo: "nothing" });
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.data.status !== prevProps.data.status) {
            setTimeout(() => {
                this.handleReload();
            }, [250]);
        }
    }

    componentWillUnmount() {
        this.setState({ todo: "nothing" });
    }

    handleReload() {
        const { data, loadBasketItems } = this.props;
        if (data._id) {
            try {
                loadBasketItems(data._id);
            } catch (error) {
                console.log(error);
            }
        }
    }

    render() {
        const { data, productsLoading } = this.props;
        const { products } = data;

        return (
            <WorkScreen>
                <BasketSidebar
                    menu={menu}
                    onCheckAndPay={this.handleCheckAndPay}
                />
                <ContentWrapper menu={menu.caption}>
                    <ApplyForm todo={this.state.todo} />
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
