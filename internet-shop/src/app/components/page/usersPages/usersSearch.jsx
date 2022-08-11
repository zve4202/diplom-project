import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../store/setting";

const UsersSearch = ({ name, onSearch }) => {
    const dispatch = useDispatch();
    const query = useSelector((state) => state.setting.config[name].query);
    const handleSearchQuery = ({ target }) => {
        dispatch(
            updateSetting(name, {
                query: {
                    ...query,
                    search: target.value
                }
            })
        );
        onSearch();
    };

    return (
        <input
            type="search"
            placeholder="Поиск по имени..."
            className="form-control"
            onChange={handleSearchQuery}
            value={query.search || ""}
        />
    );
};

UsersSearch.propTypes = {
    name: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired
};
export default UsersSearch;
