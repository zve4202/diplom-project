import React from "react";
import PropTypes from "prop-types";

const BasketTotals = ({ basket }) => {
    const nf = Intl.NumberFormat();

    return (
        <div className="card">
            <div className="card-header">Итого заказно</div>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    Количество:
                    <strong>{basket.totalQty}</strong>
                    шт.
                </div>
                <div className="d-flex justify-content-between">
                    На сумма:
                    <strong>{nf.format(basket.totalPrice)}</strong>
                    руб.
                </div>
            </div>
        </div>
    );
};
BasketTotals.propTypes = {
    basket: PropTypes.object.isRequired
};

export default BasketTotals;
