import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
    getOrdersInfo,
    loadOrder,
    loadOrderItems
} from "../../../../store/order";
import { useDispatch, useSelector } from "react-redux";
const OrderList = ({ selected }) => {
    const dispatch = useDispatch();
    const { docs, docsItems } = useSelector(getOrdersInfo());
    useEffect(() => {
        dispatch(loadOrder(selected));
        dispatch(loadOrderItems(selected));
    }, [selected]);
    return (
        <div className="card-body mb-3">
            {docs.map((doc) => {
                const items = docsItems.filter(
                    (item) => item.orderId === doc._id && item.qty > 0
                );
                return <OrderCard doc={doc} items={items} />;
            })}
        </div>
    );
};
OrderList.propTypes = {
    selected: PropTypes.string
};

export default OrderList;
