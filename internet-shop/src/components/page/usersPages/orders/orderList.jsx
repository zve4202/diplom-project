import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import {
    getOrdersInfo,
    loadOrder,
    loadOrderItems
} from "../../../../store/order";
import OrderCard from "./orderCard";

const OrderList = ({ userId, selected }) => {
    const name = "orders";
    const dispatch = useDispatch();
    const { docs, docsItems } = useSelector(getOrdersInfo());
    useEffect(() => {
        dispatch(loadOrder(selected, userId));
        dispatch(loadOrderItems(selected, userId));
    }, [selected]);
    return (
        <div>
            {/* <div className="card-body px-0"> */}
            {docs.map((doc, index) => {
                const items = docsItems.filter(
                    (item) => item.orderId === doc._id && item.qty > 0
                );

                return (
                    <OrderCard
                        key={index + 1}
                        {...{
                            name,
                            doc,
                            items
                        }}
                    />
                );
            })}
        </div>
    );
};
OrderList.propTypes = {
    userId: PropTypes.string.isRequired,
    selected: PropTypes.string
};

export default OrderList;
