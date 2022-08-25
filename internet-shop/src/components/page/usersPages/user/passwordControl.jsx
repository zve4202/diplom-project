import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getAuth } from "../../../../store/auth";

const PasswordControl = ({ userId, onShow, hideIf, children }) => {
    const { authUser } = useSelector(getAuth());

    const [change, setChange] = useState(false);
    const handleChange = () => {
        setChange((prevSatte) => !prevSatte);
        onShow();
    };

    useEffect(() => {
        if (hideIf) setChange(false);
    }, [hideIf]);

    if (authUser && authUser._id === userId) {
        if (change) {
            return (
                <div className="row w-100">
                    <div className="col">{children}</div>
                    <div className="col-auto">
                        <span
                            role="button"
                            className="btn btn-close btn-outline-warning"
                            onClick={handleChange}
                            title="Не менять пароль"
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="mb-4">
                    <label htmlFor="pass-btn">Пароль</label>
                    <span
                        id="pass-btn"
                        role="button"
                        className="form-control btn btn-warning"
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

PasswordControl.defaulProps = {
    hideIf: false
};

PasswordControl.propTypes = {
    userId: PropTypes.string,
    onShow: PropTypes.func,
    hideIf: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default PasswordControl;
