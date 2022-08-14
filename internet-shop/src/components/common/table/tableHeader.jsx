import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { updateSetting } from "../../../store/setting";

const TableHeader = ({ name, onReload, columns, headered }) => {
    const selectedSort = useSelector(
        (state) => state.setting.config[name].sort
    );

    const dispatch = useDispatch();

    const handleSort = (sort) => {
        let newsort = { ...selectedSort };
        if (selectedSort.sort === sort) {
            newsort.order = selectedSort.order === 1 ? -1 : 1;
        } else {
            newsort = { sort, order: 1 };
        }
        dispatch(
            updateSetting(name, {
                sort: {
                    ...newsort
                }
            })
        );
        if (onReload) onReload();
    };

    const renderSort = (column) => {
        if (column.sortable) {
            if (selectedSort.sort === column.name) {
                if (selectedSort.order === 1) {
                    return (
                        <span className="text-nowrap g-1">
                            <i className="small bi bi-caret-up-fill" />
                            {column.caption}
                        </span>
                    );
                } else {
                    return (
                        <span className="text-nowrap g-1">
                            <i className="small bi bi-caret-down-fill" />
                            {column.caption}
                        </span>
                    );
                }
            } else {
                return (
                    <span className="text-nowrap g-1">
                        <i className="bi bi-chevron-expand" />
                        {column.caption}
                    </span>
                );
            }
        }
        return <span className="text-nowrap g-1">{column.caption}</span>;
    };

    const headerClick = (column) => {
        if (!headered || !column.sortable) return;
        handleSort(column.name);
    };
    return (
        <thead>
            <tr>
                {columns.map((column, index) => {
                    return (
                        <th
                            key={index + 1}
                            {...{
                                name: headered ? column.name : undefined,
                                role:
                                    headered && column.sortable
                                        ? "button"
                                        : undefined,
                                onClick: () => headerClick(column),
                                scope: "col"
                            }}
                            style={
                                column.width
                                    ? { width: `${column.width}px` }
                                    : { width: "auto" }
                            }
                        >
                            {headered && renderSort(column)}
                        </th>
                    );
                })}
                <th style={{ width: "auto" }}></th>
            </tr>
        </thead>
    );
};

TableHeader.defaultProps = {
    headered: true
};

TableHeader.propTypes = {
    name: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    headered: PropTypes.bool,
    onReload: PropTypes.func
};

export default TableHeader;
