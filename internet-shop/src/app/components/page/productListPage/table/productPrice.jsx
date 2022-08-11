import React from "react";
import PropTypes from "prop-types";

import { curs } from "../../../../config.json";

const ProductPrice = ({ price }) => {
    const nf = Intl.NumberFormat();
    const priceRub = nf.format(price * curs);
    return <div className="text-nowrap">{priceRub} руб.</div>;
};

ProductPrice.propTypes = {
    price: PropTypes.number.isRequired
};
export default ProductPrice;
