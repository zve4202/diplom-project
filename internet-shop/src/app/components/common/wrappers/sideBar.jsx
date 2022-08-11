import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const defaultItem = {
    path: "path",
    name: "name",
    icon: "bi-gear"
};
const defaultMenu = {
    name: "product",
    caption: { name: "Покупки", icon: "bi-cart" },
    items: [defaultItem]
};

const SideBarWrapper = ({
    backBtn,
    menu,
    selected,
    onItemSelect,
    children
}) => {
    menu = menu || { ...defaultMenu, items: undefined };
    return (
        <div className="sidebar_wrapper p-2 card bg-light me-2">
            <div className="card-header d-flex px-3 py-2 align-items-center justify-content-between mb-3">
                <span>
                    <i className={`bi ${menu.caption.icon} me-2`} />
                    {menu.caption.name}{" "}
                </span>
                {backBtn}
            </div>
            {menu.afterChildren && children}
            {menu.items && (
                <div className="list-group">
                    {menu.items.map((item) => (
                        <div
                            key={item.path}
                            className={classNames({
                                "list-group-item": true,
                                active: item.path === selected.path
                            })}
                            onClick={() => onItemSelect(item)}
                            role="button"
                        >
                            <i className={`bi ${item.icon} me-2`} />
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
            {!menu.afterChildren && children}
        </div>
    );
};

SideBarWrapper.propTypes = {
    backBtn: PropTypes.node,
    menu: PropTypes.object,
    selected: PropTypes.object,
    onItemSelect: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default SideBarWrapper;
