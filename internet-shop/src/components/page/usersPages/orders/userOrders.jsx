import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../../store/setting";
import OrderList from "./orderList";

const UserOrders = ({ userId }) => {
    const dispatch = useDispatch();

    const orderName = "orders";
    const selectedTab = useSelector(
        (state) => state.setting.config[orderName].selectedTab
    );

    const onItemSelect = (item) => {
        dispatch(
            updateSetting(orderName, {
                selectedTab: item
            })
        );
    };

    return (
        <div>
            <div className="nav nav-tabs">
                <div className="nav-item">
                    <span
                        className={classNames({
                            "nav-link": true,
                            active: selectedTab === "current"
                        })}
                        aria-current="page"
                        onClick={() => onItemSelect("current")}
                        role="button"
                    >
                        Текущие
                    </span>
                </div>
                <div className="nav-item">
                    <span
                        className={classNames({
                            "nav-link": true,
                            active: selectedTab === "archive"
                        })}
                        aria-current="page"
                        onClick={() => onItemSelect("archive")}
                        role="button"
                    >
                        Архив
                    </span>
                </div>
            </div>
            <OrderList userId={userId} selected={selectedTab} />
        </div>
    );
};

UserOrders.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserOrders;
