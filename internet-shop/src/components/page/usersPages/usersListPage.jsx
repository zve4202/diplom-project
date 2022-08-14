import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import PaginationWrapper from "../../common/pagination";
import UserTable from "./usersTable";
import UsersLoader from "./usersLoader";
import UsersSearch from "./usersSearch";

import { loadUsers } from "../../../store/users";
import { loadRoles } from "../../../store/roles";
import { updateSetting } from "../../../store/setting";

const UsersListPage = () => {
    const name = "users";

    const { docs, totalDocs } = useSelector((state) => state.users);

    console.log({ docs, totalDocs });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadRoles());
        dispatch(loadUsers());
    }, []);

    const clearFilter = () => {
        dispatch(
            updateSetting(name, {
                query: {
                    search: ""
                }
            })
        );

        dispatch(loadUsers());
    };

    const handleSort = () => {
        dispatch(loadUsers());
    };

    const onFilter = () => {
        dispatch(loadUsers());
    };

    const onFilterDebounced = debounce(onFilter, 500);
    const onSearch = () => {
        onFilterDebounced();
    };

    const onPageChangeDebounced = debounce(onFilter, 250);
    const onPageChange = () => {
        onPageChangeDebounced();
    };

    return (
        <div>
            <div className="d-flex mb-3 align-text-bottom">
                <div
                    className="btn btn-secondary me-2 text-nowrap"
                    onClick={clearFilter}
                >
                    Очистить фильтр
                </div>
                <UsersSearch onSearch={onSearch} name={name} />
            </div>

            <div className="h-100">
                <PaginationWrapper
                    totalDocs={totalDocs}
                    onChange={onPageChange}
                    name={name}
                >
                    <UsersLoader>
                        <UserTable
                            name={name}
                            users={docs}
                            onSort={handleSort}
                        />
                    </UsersLoader>
                </PaginationWrapper>
            </div>
        </div>
    );
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
