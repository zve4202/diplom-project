import React from "react";
import PropTypes from "prop-types";
// import { useSelector } from "react-redux";

import SideBarWrapper from "../../../common/wrappers/sideBar";
import BackButton from "../../../common/backButton";

const UserSideBar = ({ user, menu, selected, onItemSelect, children }) => {
    // const { roles } = useSelector((state) => state);
    // const getRole = (id) => {
    //     if (roles.isLoading) {
    //         return "загрузка";
    //     }
    //     return roles.entities.find((role) => role._id === id).name;
    // };
    return (
        <SideBarWrapper
            backBtn={<BackButton />}
            {...{ menu, selected, onItemSelect, menuAfterChildren: true }}
        >
            {user && (
                <div className="card-header">{user.name}</div>
                //     <div className="card mb-3">
                //     <div className="card-header">{user.name}</div>

                //     <div className="card-body text-lg">
                //         <div>{user.email}</div>
                //         <div>{getRole(user.role)}</div>
                //     </div>
                // </div>
            )}
        </SideBarWrapper>
    );
};

UserSideBar.propTypes = {
    user: PropTypes.object,
    menu: PropTypes.object.isRequired,
    selected: PropTypes.object.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserSideBar;
