import React from "react";
import PropTypes from "prop-types";

const BasketTotals = ({ basket }) => {
    const nf = Intl.NumberFormat();

    return (
        <div className="card">
            <div className="card-header">
                <i className="bi bi-box-seam me-2" />
                Итого заказно
            </div>
            <div className="card-body container">
                <div className="row">
                    <div className="col-5 text-end">Количество:</div>
                    <div className="col text-end text-bg-warning bg-opacity-25 form-control-sm">
                        <strong>{basket.totalQty}</strong>
                    </div>
                    <div className="col-3">шт.</div>
                </div>
                <div className="row mt-1">
                    <div className="col-5 text-end">На сумму:</div>
                    <div className="col text-end text-bg-warning bg-opacity-25 form-control-sm">
                        <strong>{nf.format(basket.totalPrice)}</strong>
                    </div>
                    <div className="col-3">руб.</div>
                </div>
            </div>
        </div>
    );
};
BasketTotals.propTypes = {
    basket: PropTypes.object.isRequired
};

export default BasketTotals;
