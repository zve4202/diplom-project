import React from "react";
import PropTypes from "prop-types";

const ProductPrice = ({ price }) => {
    return <span className="text-nowrap ">{price} руб.</span>;
};

ProductPrice.propTypes = {
    price: PropTypes.string.isRequired
};
export default ProductPrice;
