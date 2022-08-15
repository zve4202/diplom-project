import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import UserTable from "./usersTable";
import UsersSearch from "./usersSearch";

import { loadUsers } from "../../../store/users";
import { loadRoles } from "../../../store/roles";

const UsersListPage = () => {
    const name = "users";

    const {
        docs: data,
        totalDocs,
        isLoading: loading
    } = useSelector((state) => state.users);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadRoles());
        dispatch(loadUsers());
    }, []);

    const onReload = () => {
        dispatch(loadUsers());
    };

    return (
        <div className="content_wrapper card bg-light p-2">
            <UsersSearch onSearch={onReload} name={name} />
            <UserTable {...{ name, data, totalDocs, loading, onReload }} />
        </div>
    );
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
