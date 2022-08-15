import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserPicture = ({ size, data }) => {
    const { _id, image, name } = data;
    return (
        <Link to={`/users/${_id}`}>
            <div className={`cover-${size} media`}>
                <img
                    className={`media-object img-thumbnail cover-${size}`}
                    src={image}
                    title={name}
                    alt={name}
                />
            </div>
        </Link>
    );
};

UserPicture.defautProps = {
    size: "small"
};

UserPicture.propTypes = {
    size: PropTypes.string,
    data: PropTypes.object.isRequired
};
export default UserPicture;
