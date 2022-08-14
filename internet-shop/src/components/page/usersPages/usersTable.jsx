import React from "react";
import PropTypes from "prop-types";

import Table from "../../common/table";
import { Link } from "react-router-dom";
import Role from "./role";

const UserTable = ({ name, users, onSort, ...rest }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        email: {
            path: "email",
            name: "E-Mail"
        },
        role: {
            name: "Роль",
            component: (user) => <Role roleId={user.role} />
        }
    };

    return <Table name={name} onSort={onSort} columns={columns} data={users} />;
};

UserTable.propTypes = {
    name: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired
};

export default UserTable;
