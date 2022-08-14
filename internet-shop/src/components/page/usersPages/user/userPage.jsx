import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { getUser, loadUsers } from "../../../../store/users";
import { loadRoles } from "../../../../store/roles";
import UserSideBar from "./userSidebar";
import { updateSetting } from "../../../../store/setting";
import UserEditPage from "./userEditPage";
import UserOrders from "../orders";
import WorkScreen from "../../../common/wrappers/workScreen";
import { pathes, menu } from "./menu";
import ContentWrapper from "../../../common/wrappers/content";

const UserPage = ({ userId }) => {
    const selectedMenu = useSelector(
        (state) => state.setting.config[menu.name].selectedMenu
    );

    // const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(getUser(userId));

    useEffect(() => {
        if (!user) {
            dispatch(loadRoles());
            dispatch(loadUsers());
        }
    }, []);

    const onItemSelect = (item) => {
        dispatch(
            updateSetting(menu.name, {
                selectedMenu: item
            })
        );
    };

    return (
        <WorkScreen>
            <UserSideBar
                user={user}
                menu={menu}
                selected={selectedMenu}
                onItemSelect={onItemSelect}
            />
            <ContentWrapper selected={selectedMenu}>
                {selectedMenu.path === pathes.editPath && <UserEditPage />}
                {selectedMenu.path === pathes.ordersPath && <UserOrders />}
            </ContentWrapper>
        </WorkScreen>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
