import React from "react";
import PropTypes from "prop-types";
import defPicture from "../../assets/defaults/audio-cd.jpg";

const ProductPicture = ({ size, picture }) => {
    const pictureSrc = picture
        ? `https://bridgenote.com/images/covers/${picture}`
        : defPicture;
    return (
        <div className={`cover-${size} media`}>
            <div className="media-left">
                <img
                    className={`media-object img-thumbnail cover-${size}`}
                    src={pictureSrc}
                    alt=""
                />
            </div>
        </div>
    );
};

ProductPicture.propTypes = {
    size: PropTypes.string.isRequired,
    picture: PropTypes.string
};
export default ProductPicture;
