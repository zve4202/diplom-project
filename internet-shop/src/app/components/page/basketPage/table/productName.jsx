import React from "react";
import PropTypes from "prop-types";

const ProductName = ({ data }) => {
    const { article, artist, name } = data.title;
    return (
        <div className="small">
            <div className="text-muted">art: {article}</div>
            <div>{artist.name}</div>
            <div>{name}</div>
        </div>
    );
};

ProductName.propTypes = {
    data: PropTypes.object.isRequired
};
export default ProductName;
