import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../store/setting";
import { loadUsers } from "../../../store/users";
import ContentWrapper from "../../common/wrappers/content";

import WorkScreen from "../../common/wrappers/workScreen";
import CategoryList from "../usersPages/usersCategory";
import UsersListPage from "../usersPages/usersListPage";
import AdminSideBar from "./adminSideBar";
import { pathes, menu } from "./menu";

const AdminPage = () => {
    const selectedMenu = useSelector(
        (state) => state.setting.config[menu.name].selectedMenu
    );
    const dispatch = useDispatch();

    const onItemSelect = (item) => {
        dispatch(
            updateSetting(menu.name, {
                selectedMenu: item
            })
        );
    };

    const onFilter = () => {
        if (selectedMenu.path === pathes.userPath) {
            dispatch(loadUsers());
        }
    };

    return (
        <WorkScreen>
            <AdminSideBar
                menu={menu}
                selected={selectedMenu}
                onItemSelect={onItemSelect}
            >
                {selectedMenu.path === pathes.userPath && (
                    <div className="mt-3">
                        <CategoryList
                            name={selectedMenu.path}
                            onItemSelect={onFilter}
                        />
                    </div>
                )}
            </AdminSideBar>
            <ContentWrapper menu={selectedMenu}>
                {selectedMenu.path === pathes.userPath && <UsersListPage />}
            </ContentWrapper>
        </WorkScreen>
    );
};

export default AdminPage;
