import React from "react";
import PropTypes from "prop-types";

import Table from "../../common/table";
import { Link } from "react-router-dom";
import Role from "./role";
import UserPicture from "./user/userPicture";

const UserTable = ({ name, data, totalDocs, loading, onReload, ...rest }) => {
    const columns = [
        {
            caption: "Фотка",
            name: "image",
            width: 79,
            component: (user) => <UserPicture data={user} />
        },
        {
            caption: "Имя",
            name: "name",
            sortable: true,
            width: 300,
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        {
            caption: "E-Mail",
            name: "email",
            sortable: true
        },
        {
            caption: "Роль",
            name: "role",
            component: (user) => <Role roleId={user.role} />
        }
    ];

    return (
        <Table
            {...{
                name,
                columns,
                data,
                totalDocs,
                loading,
                onReload,
                ...rest
            }}
        />
    );
};

UserTable.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    totalDocs: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    onReload: PropTypes.func.isRequired
};

export default UserTable;
