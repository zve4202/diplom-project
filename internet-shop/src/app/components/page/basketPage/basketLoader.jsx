import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const BasketLoader = ({ isLoading, error, length, children }) => {
    const loadDiv = () => {
        if (isLoading || error || length === 0) {
            return (
                <div className="p-2 mb-3">
                    <div
                        className={classNames({
                            "text-center": true,
                            "text-danger": error
                        })}
                    >
                        {isLoading
                            ? "Загрузка данных..."
                            : error
                            ? { error }
                            : "(ПУСТО)"}
                    </div>
                </div>
            );
        }

        return null;
    };
    return (
        <div className="d-flex flex-column w-100 h-100">
            {loadDiv() || children}
        </div>
    );
};

BasketLoader.propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    length: PropTypes.number,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default BasketLoader;
