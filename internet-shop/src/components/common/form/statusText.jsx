import React from "react";
import PropTypes from "prop-types";

const statuses = {
    basket: "В корзине",
    checked: "Подтверждён",
    needpay: "Требуется оплата",
    new: "Принят в работу",
    assembled: "Собран, готов к отправке",
    pendingPayment: "Ожидает оплаты",
    sent: "Отпарвлен",
    delivered: "Доставлен",
    cancelled: "Отменён",
    partly: "Подтверждён частично",
    unavailable: "Недоступен"
};

const StatusText = ({ status, classname }) => {
    return (
        <span className={`badge text-bg-${classname}`}>{statuses[status]}</span>
    );
};

StatusText.propTypes = {
    status: PropTypes.string,
    classname: PropTypes.string
};
StatusText.displayName = "StatusText";

export default StatusText;
