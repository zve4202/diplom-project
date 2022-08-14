import React from "react";
import Order from "./order";
import PropTypes from "prop-types";

const OrdersList = ({ orders, onRemove }) => {
    return orders.map((order) => (
        <Order key={order._id} {...order} onRemove={onRemove} />
    ));
};
OrdersList.propTypes = {
    order: PropTypes.array,
    onRemove: PropTypes.func
};

export default OrdersList;
