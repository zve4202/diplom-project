import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getRole } from "../../../store/roles";

const Role = ({ roleId }) => {
    const { name, color } = useSelector(getRole(roleId));
    return <span className={"badge bg-" + color}>{name}</span>;
};
Role.propTypes = {
    roleId: PropTypes.string.isRequired
};

export default Role;
