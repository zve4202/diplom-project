import React, { useState } from "react";
import PropTypes from "prop-types";

import { displayDate } from "../../../../utils/displayDate";
import { statuses } from "../../../common/form/statusText";
import OrderTable from "./table/orderTable";
import { getPaymentNameBy } from "../../payments";
import { getDeliveryNameBy } from "../../deliveries";

const OrderCard = ({ name, doc, items }) => {
    const [show, setShow] = useState(false);

    const handleCollapse = () => {
        setShow((state) => !state);
    };
    const numDoc = (id) => {
        const res = String(id).padStart(6, "0");
        return res.slice(0, -3) + "-" + res.slice(3);
    };

    const title = show ? "Скрыть состав заказа" : "Открыть состав заказа";
    const {
        persone,
        phone,
        delivery,
        payment,
        index,
        address
        // , note
    } = doc.deliveryInfo;

    // const infoDelivery = () => {
    //     return `Доставка: для ${persone} ${phone} - ${getDeliveryNameBy(
    //         delivery
    //     )}`;
    // };
    // const infoPayment = () => {
    //     return `Оплата: ${getPaymentNameBy(payment)}`;
    // };
    const nf = Intl.NumberFormat();

    return (
        <div className="row  mt-2 border border-1 rounded-1">
            <div
                className="pt-3"
                data-bs-toggle="collapse"
                href="#orderContentInfo"
                role="button"
                aria-expanded="false"
                aria-controls="orderContentInfo"
                onClick={handleCollapse}
                title={title}
            >
                <table className="table table-light table-sm table-bordered">
                    <thead>
                        <tr className="text-center">
                            <td rowSpan={2}></td>
                            <td rowSpan={2}>№</td>
                            <td colSpan={3}>Итого</td>
                            <td colSpan={5}>Доставка</td>
                            <td colSpan={2}>Оплата</td>
                            <td rowSpan={2}>Статус</td>
                        </tr>
                        <tr className="text-center">
                            <td>Кол-во</td>
                            <td>Стоимость</td>
                            <td>Доставка</td>
                            <td>Кому</td>
                            <td>Телефон</td>
                            <td>Куда</td>
                            <td>Индекс</td>
                            <td>Адрес</td>
                            <td>Способ</td>
                            <td>Оплачено</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-center">
                            <td style={{ width: "auto" }}>
                                <i
                                    className={`bi bi-${
                                        show ? "dash" : "plus"
                                    }-circle-dotted`}
                                />
                            </td>
                            <td style={{ width: "auto" }}>{numDoc(doc._id)}</td>
                            <td style={{ width: "auto" }}>
                                {doc.totalQty} шт.
                            </td>
                            <td style={{ width: "auto" }}>
                                {nf.format(doc.totalPrice)} руб.
                            </td>
                            <td style={{ width: "auto" }}>
                                {nf.format(doc.deliveryPrice)} руб.
                            </td>
                            <td style={{ width: "auto" }}>{persone}</td>
                            <td style={{ width: "auto" }}>{phone}</td>
                            <td style={{ width: "auto" }}>
                                {getDeliveryNameBy(delivery)}
                            </td>
                            <td style={{ width: "auto" }}>{index}</td>
                            <td style={{ width: "auto" }}>{address}</td>
                            <td style={{ width: "auto" }}>
                                {getPaymentNameBy(payment)}
                            </td>
                            <td style={{ width: "auto" }}>
                                {nf.format(doc.sumOfPay || 0)} руб.
                            </td>
                            <td style={{ width: "auto" }}>
                                {statuses[doc.status]}
                                <span className="ms-1 text-muted">
                                    {displayDate(doc.updatedAt)}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* <div className="row justify-content-between g-2">
                    <div className="col-auto">
                        <div className="row g-2">
                            <div className="col-auto">№: {numDoc(doc._id)}</div>
                            <div className="col-auto">
                                Кол-во: {doc.totalQty}
                            </div>
                            <div className="col-auto">
                                Стоимость: {nf.format(doc.totalPrice)} руб.
                            </div>
                            <div className="col-auto">
                                Достака: {nf.format(doc.deliveryPrice)} руб.
                            </div>

                            <div className="col-auto">{infoDelivery()}</div>
                            <div className="col-auto">{infoPayment()}</div>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="row g-2 justify-content-end">
                            <div className="col-auto">
                                {statuses[doc.status]}
                            </div>
                            <div className="col-auto text-muted">
                                ( {displayDate(doc.updatedAt)} )
                            </div>
                            <div className="col-auto">
                                <i
                                    className={`bi bi-${
                                        show ? "dash" : "plus"
                                    }-circle-dotted`}
                                />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="collapse" id="orderContentInfo">
                {/* <div className={getClassName()} id="orderContentInfo"> */}
                <OrderTable name={name} data={items} />
            </div>
        </div>
    );
};

OrderCard.propTypes = {
    name: PropTypes.string.isRequired,
    doc: PropTypes.object,
    items: PropTypes.array
};

export default OrderCard;
