import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getTotals } from "../../../store/basket";

const BasketTotals = ({ basket }) => {
    const { totalQty, totalPrice, deliveryPrice, fullPrice } = useSelector(
        getTotals()
    );
    const nf = Intl.NumberFormat();
    const { deliveryInfo, status } = basket;
    const totalInfo = () => {
        if (status === "basket" || !deliveryInfo) return null;
        return (
            <>
                <div className="row g-3 mt-1">
                    <span className="col-5 text-end">Доставка:</span>
                    <span className="col text-end bg-secondary bg-opacity-10 form-control form-control-sm">
                        <strong>{nf.format(deliveryPrice)}</strong>
                    </span>
                    <span className="col-2">руб.</span>
                </div>
                <hr />
                <div className="row g-3">
                    <span className="col-5 text-end">К оплате:</span>
                    <span className="col text-end bg-secondary bg-opacity-10 form-control form-control-sm">
                        <strong>{nf.format(fullPrice)}</strong>
                    </span>
                    <span className="col-2">руб.</span>
                </div>
            </>
        );
    };

    return (
        <div className="card">
            <div className="card-header">
                <i className="bi bi-box-seam me-2" />
                Итого заказно
            </div>
            <div className="card-body px-1">
                <div className="row g-3">
                    <span className="col-5 text-end">Количество:</span>
                    <span className="col text-end bg-secondary bg-opacity-10 form-control form-control-sm">
                        <strong>{totalQty}</strong>
                    </span>
                    <span className="col-2">шт.</span>
                </div>
                <div className="row g-3 mt-1">
                    <span className="col-5 text-end">Стоимость:</span>
                    <span className="col text-end bg-secondary bg-opacity-10 form-control form-control-sm">
                        <strong>{nf.format(totalPrice)}</strong>
                    </span>
                    <span className="col-2">руб.</span>
                </div>
                {totalInfo()}
            </div>
        </div>
    );
};
BasketTotals.propTypes = {
    basket: PropTypes.object.isRequired
};

export default BasketTotals;
