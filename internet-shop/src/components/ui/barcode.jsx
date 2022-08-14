import React from "react";
import PropTypes from "prop-types";
import imgBarcode from "../../assets/defaults/barcode.png";

const Barcode = ({ barcode }) => {
    return (
        <div className="text-muted small">
            <img src={imgBarcode} alt="" />
            <div>{barcode}</div>
        </div>
    );
};

Barcode.propTypes = {
    barcode: PropTypes.string
};
export default Barcode;
