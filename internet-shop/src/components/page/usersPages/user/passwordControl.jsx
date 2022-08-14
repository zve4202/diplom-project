import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getAuth } from "../../../../store/auth";

const PasswordControl = ({ userId, onShow, children }) => {
    const { currentUser } = useSelector(getAuth());

    const [change, setChange] = useState(false);
    const handleChange = () => {
        setChange((prevSatte) => !prevSatte);
        onShow();
    };

    if (currentUser && currentUser._id === userId) {
        if (change) {
            return children;
        } else {
            return (
                <div className="mb-4">
                    <span
                        role="button"
                        className="btn btn-warning btn-sm"
                        onClick={handleChange}
                    >
                        Изменить пароль
                    </span>
                </div>
            );
        }
    }
    return null;
};

PasswordControl.propTypes = {
    userId: PropTypes.string,
    onShow: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default PasswordControl;
