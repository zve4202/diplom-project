import React from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

const UsersLoader = ({ children }) => {
    const { isLoading, error, docs } = useSelector((state) => state.users);

    const loadDiv = () => {
        if (isLoading || error || docs.length === 0) {
            return (
                <div className="p-2 mb-3">
                    <div className="text-center">
                        {isLoading
                            ? "Загрузка данных..."
                            : error
                            ? { error }
                            : "Нет данных"}{" "}
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

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UsersLoader;
