import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const NavTabs = ({ maket, selectedTab, onSelect, children }) => {
    const onItemSelect = (value) => {
        if (onSelect) onSelect(value);
    };
    return (
        <div className="card">
            <div className="card-header">
                <div className="nav nav-tabs card-header-tabs ">
                    {/* nav nav-tabs */}
                    {Object.keys(maket).map((key) => (
                        <div key={key} className="nav-item">
                            <span
                                className={classNames({
                                    "nav-link": true,
                                    active: selectedTab === key
                                })}
                                aria-current="page"
                                onClick={() => onItemSelect(key)}
                                role="button"
                            >
                                {maket[key]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="card-body">{children}</div>
        </div>
    );
};

NavTabs.propTypes = {
    maket: PropTypes.object.isRequired,
    selectedTab: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default NavTabs;
