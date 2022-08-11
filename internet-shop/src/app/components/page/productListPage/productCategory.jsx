import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { getCategories } from "../../../store/categories";
import { updateSetting } from "../../../store/setting";
import SideBarWrapper from "../../common/wrappers/sideBar";

const CategoryList = ({ name, onItemSelect }) => {
    const categories = useSelector(getCategories());
    const query = useSelector((state) => state.setting.config[name].query);
    const dispatch = useDispatch();

    const handleSelectQuery = (id) => {
        const newQuery = { ...query };
        if (!id) {
            delete newQuery.category;
        } else {
            newQuery.category = id;
        }
        dispatch(
            updateSetting(name, {
                query: {
                    ...newQuery
                }
            })
        );
        onItemSelect();
    };

    if (!categories) return null;
    return (
        <SideBarWrapper>
            <div className="list-group">
                <div
                    className={classNames({
                        "list-group-item btn-secondary": true,
                        disabled: !query.category
                    })}
                    onClick={() => handleSelectQuery(null)}
                    role="button"
                >
                    ВСЕ КАТЕГОРИИ
                </div>
                {categories.map((item) => (
                    <div
                        key={item._id}
                        className={classNames({
                            "d-flex justify-content-between list-group-item": true,
                            active: item._id === query.category
                        })}
                        onClick={() => handleSelectQuery(item._id)}
                        role="button"
                    >
                        <div className="text-truncate">{item.name}</div>
                        <div
                            className={classNames({
                                small: true,
                                "text-muted": item._id !== query.category
                            })}
                        >
                            ({item.count})
                        </div>
                    </div>
                ))}
            </div>
        </SideBarWrapper>
    );
};

CategoryList.propTypes = {
    name: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired
};

export default CategoryList;
