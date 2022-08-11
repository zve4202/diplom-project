import React from "react";
import PropTypes from "prop-types";

const ProductPrice = ({ price }) => {
    const nf = Intl.NumberFormat();
    return <div className="text-nowrap">{nf.format(price)} руб.</div>;
};

ProductPrice.propTypes = {
    price: PropTypes.number.isRequired
};
export default ProductPrice;
