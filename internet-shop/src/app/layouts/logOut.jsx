import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signOut } from "../store/auth";
const LogOut = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(signOut());
        history.push("/");
    }, []);
    return <p>Log Out</p>;
};

export default LogOut;
