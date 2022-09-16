import React from "react";
import PropTypes from "prop-types";

const OrderQty = ({ item }) => {
    return (
        <div
            className="form-control form-control-sm bg-secondary bg-opacity-10 text-center"
            title="Изменить нельзя"
        >
            {item.qty}
        </div>
    );
};

OrderQty.propTypes = {
    item: PropTypes.object.isRequired
};
export default OrderQty;
