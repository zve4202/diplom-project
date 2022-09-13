import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { updateBasket, removeBasket } from "../../../../../store/basket";

class ProductQty extends Component {
    refQTY = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            textValue: "",
            numValue: 0
        };
        this.updateQty = this.updateQty.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeOne = this.removeOne.bind(this);
        this.addOne = this.addOne.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.updateOnServer = this.updateOnServer.bind(this);
    }

    componentDidMount() {
        const { docs, data } = this.props;
        const doc = docs.find((item) => item.product === data._id);
        if (doc) {
            const numValue = doc.qty;
            const textValue = numValue.toString();
            this.setState({ textValue, numValue });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { docs } = this.props;
        if (JSON.stringify(docs) !== JSON.stringify(prevProps.docs)) {
            this.updateQty();
        }
    }

    componentWillUnmount() {}

    checkValue(value) {
        const numValue = Math.max(0, value);
        return numValue;
    }

    handleChange({ target }) {
        const { checkValue, updateOnServer } = this;
        const value = target.value.replace(/[^\d]/, "");
        updateOnServer(checkValue(value));
    }

    removeOne() {
        this.refQTY.current.focus();
        const { checkValue, updateOnServer } = this;
        const { numValue } = this.state;
        updateOnServer(checkValue(numValue - 1));
    }

    addOne() {
        const { checkValue, updateOnServer } = this;
        const { numValue } = this.state;
        this.refQTY.current.focus();
        updateOnServer(checkValue(numValue + 1));
    }

    handleBlur() {
        const { numValue } = this.state;
        if (numValue === 0) {
            return;
        }

        this.updateOnServer(Math.max(0, numValue));
    }

    updateOnServer(numQty) {
        const { removeBasket, updateBasket } = this.props;
        const { _id, priceRub } = this.props.data;

        if (numQty === 0) {
            removeBasket(_id);
        } else {
            updateBasket({
                _id,
                qty: numQty,
                price: priceRub
            });
        }
    }

    updateQty() {
        let numValue = 0;
        let textValue = "";
        const { docs, data } = this.props;
        const doc = docs.find((item) => item.product === data._id);
        if (doc) {
            numValue = doc.qty;
            textValue = numValue.toString();
        }
        this.setState({ textValue, numValue });
    }

    render() {
        const { removeOne, addOne, handleChange, handleBlur } = this;
        const { count } = this.props.data;
        const { textValue, numValue } = this.state;
        return (
            <div className="input-group flex-nowrap">
                <button
                    className="input-group-text"
                    title="Удалить 1"
                    role="button"
                    onClick={removeOne}
                    disabled={numValue === 0}
                >
                    <i className="bi bi-dash-circle"></i>
                </button>
                <input
                    ref={this.refQTY}
                    type="text"
                    className="form-control table-input text-center"
                    placeholder="нет"
                    value={textValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    title="Введите количество чтобы добавить товар в корзину"
                />
                <button
                    className="input-group-text"
                    title="Добавить 1"
                    role="button"
                    onClick={addOne}
                    disabled={count === 0}
                >
                    <i className="bi bi-plus-circle"></i>
                </button>
            </div>
        );
    }
}

ProductQty.propTypes = {
    data: PropTypes.object.isRequired,
    docs: PropTypes.arrayOf(PropTypes.object),
    updateBasket: PropTypes.func,
    removeBasket: PropTypes.func
};

const mapStateToProps = (state) => {
    const { docs } = state.basket.data;
    return { docs };
};

const mapDispatchToProps = {
    updateBasket,
    removeBasket
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductQty);
