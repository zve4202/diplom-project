import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import defPicture from "../../../../assets/defaults/audio-cd.jpg";

const ProductPicture = ({ size, data }) => {
    const { _id, title } = data;
    const { image, name } = title;
    const pictureSrc = image
        ? `https://bridgenote.com/images/covers/${image}`
        : defPicture;
    return (
        <Link to={`/${_id}`}>
            <div className={`cover-${size} media`}>
                <div className="media-left">
                    <img
                        className={`media-object img-thumbnail cover-${size}`}
                        src={pictureSrc}
                        title={name}
                        alt={_id}
                    />
                </div>
            </div>
        </Link>
    );
};

ProductPicture.defautProps = {
    size: "small"
};

ProductPicture.propTypes = {
    size: PropTypes.string,
    data: PropTypes.object.isRequired
};
export default ProductPicture;
