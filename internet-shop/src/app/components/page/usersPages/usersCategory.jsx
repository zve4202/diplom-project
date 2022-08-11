import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../store/setting";

import classNames from "classnames";
import { getRoles, loadRoles } from "../../../store/roles";

const CategoryList = ({ name, onItemSelect }) => {
    console.log("name", name);
    const roles = useSelector(getRoles());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadRoles());
    }, []);

    const query = useSelector((state) => state.setting.config[name].query);

    const handleSelectQuery = (id) => {
        dispatch(
            updateSetting(name, {
                query: {
                    ...query,
                    category: id
                }
            })
        );
        onItemSelect();
    };

    return (
        <ul className="list-group">
            <div className="card-header list-group-item-success mb-1">
                <i className="bi bi-filter me-2" />
                Меню фильтрации
            </div>

            <li
                key="item_clear"
                className={classNames({
                    "list-group-item btn-secondary": true,
                    disabled: !query.category
                })}
                onClick={() => handleSelectQuery(null)}
                role="button"
            >
                ВСЕ РОЛИ
            </li>
            {roles.map((item) => (
                <li
                    key={item._id}
                    className={classNames({
                        "list-group-item": true,
                        active: item._id === query.category
                    })}
                    onClick={() => handleSelectQuery(item._id)}
                    role="button"
                >
                    {item.name}
                </li>
            ))}
        </ul>
    );
};

CategoryList.propTypes = {
    name: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired
};

export default CategoryList;
