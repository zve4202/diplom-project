import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SelectPageSize from "./selectPageSize";

const Paginator = ({ name, pager, setPage, setPageSize }) => {
    if (!pager) return null;
    return (
        <div className="d-flex justify-content-center">
            <div className="pagination">
                {pager.pages && pager.pages.length > 1 && (
                    <>
                        <div
                            className={classNames({
                                "page-item": true,
                                disabled: pager.currentPage === 1
                            })}
                        >
                            <a
                                className="page-link"
                                onClick={() => setPage(1)}
                                role="button"
                            >
                                В начало
                            </a>
                        </div>
                        <div
                            className={classNames({
                                "page-item me-2": true,
                                disabled: pager.currentPage === 1
                            })}
                        >
                            <a
                                className="page-link"
                                onClick={() => setPage(pager.currentPage - 1)}
                                role="button"
                            >
                                &laquo;
                            </a>
                        </div>
                        {pager.pages.map((page, index) => (
                            <div
                                key={index + 1}
                                className={classNames({
                                    "page-item": true,
                                    active: page === pager.currentPage
                                })}
                            >
                                <a
                                    className="page-link"
                                    onClick={() => setPage(page)}
                                    role="button"
                                >
                                    {page}
                                </a>
                            </div>
                        ))}
                        <div
                            className={classNames({
                                "page-item ms-2": true,
                                disabled: pager.currentPage === pager.totalPages
                            })}
                        >
                            <a
                                className="page-link"
                                onClick={() => setPage(pager.currentPage + 1)}
                                role="button"
                            >
                                &raquo;
                            </a>
                        </div>
                        <div
                            className={classNames({
                                "page-item": true,
                                disabled: pager.currentPage === pager.totalPages
                            })}
                        >
                            <a
                                className="page-link"
                                onClick={() => setPage(pager.totalPages)}
                                role="button"
                            >
                                В конец
                            </a>
                        </div>
                    </>
                )}
                {pager.totalItems > 0 && (
                    <div
                        className={classNames({
                            "page-item disabled me-2": true,
                            "ms-2": pager.totalPages > 1
                        })}
                    >
                        <span className="page-link">
                            {pager.endIndex + 1}/{pager.totalItems}
                        </span>
                    </div>
                )}
                <SelectPageSize
                    value={pager.pageSize}
                    onChangePageSize={setPageSize}
                    name={name}
                />
            </div>
        </div>
    );
};

Paginator.propTypes = {
    name: PropTypes.string,
    pager: PropTypes.object,
    setPage: PropTypes.func.isRequired,
    setPageSize: PropTypes.func.isRequired
};

export default Paginator;
