import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

import {
    UsersListPage,
    UserPage,
    UserEditPage
} from "../components/page/usersPages";
import { getAuth } from "../store/auth";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const { authUser, isAdmin } = useSelector(getAuth());

    return (
        <>
            {userId ? (
                edit ? (
                    userId === authUser._id || isAdmin ? (
                        <UserEditPage />
                    ) : (
                        <Redirect to={`/users/${authUser._id}/edit`} />
                    )
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
