import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const defaultItem = {
    path: "path",
    name: "name",
    icon: "bi-gear",
    component: undefined
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
    menuAfterChildren,
    children
}) => {
    menu = menu || { ...defaultMenu, items: undefined };
    selected = selected || { path: "1234567890" };
    return (
        <div className="sidebar_wrapper p-2 card me-2">
            <div className="card-header d-flex px-3 justify-content-between">
                <span>
                    <i className={`bi ${menu.caption.icon} me-2`} />
                    {menu.caption.name}{" "}
                </span>
                {backBtn}
            </div>
            <div
            // className="card-body px-0"
            >
                {menuAfterChildren && children}
                {menu.items && (
                    <div
                        className={classNames({
                            "list-group ": true,
                            "mb-2": !menuAfterChildren,
                            "mt-2": menuAfterChildren
                        })}
                    >
                        {menu.items.map((item, index) => (
                            <div
                                key={item.path}
                                className={
                                    item.component
                                        ? undefined
                                        : classNames({
                                              //   "mt-2": index > 0,
                                              "list-group-item": true,
                                              active:
                                                  item.path === selected.path
                                          })
                                }
                                onClick={
                                    item.component
                                        ? undefined
                                        : () => onItemSelect(item)
                                }
                                role="button"
                            >
                                {item.component ? (
                                    item.component
                                ) : (
                                    <>
                                        <i className={`bi ${item.icon} me-2`} />
                                        {item.name}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {!menuAfterChildren && children}
            </div>
        </div>
    );
};

SideBarWrapper.propTypes = {
    backBtn: PropTypes.node,
    menu: PropTypes.object,
    selected: PropTypes.object,
    onItemSelect: PropTypes.func,
    menuAfterChildren: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default SideBarWrapper;
