import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../store/setting";
import debounce from "../../../utils/debounce";

const UsersSearch = ({ name, onSearch }) => {
    const dispatch = useDispatch();
    const query = useSelector((state) => state.setting.config[name].query);
    const debouncedSearch = debounce(onSearch, 1000);

    const handleSearchQuery = ({ target }) => {
        dispatch(
            updateSetting(name, {
                query: {
                    ...query,
                    search: target.value
                }
            })
        );
        debouncedSearch();
    };

    const clearFilter = () => {
        dispatch(updateSetting(name, {}));
        onSearch();
    };

    const isDisabled = () => {
        return Object.keys(query).length > 0;
    };

    return (
        <div className="mb-2">
            <div className="input-group d-flex flex-nowrap w-100">
                <button
                    title="Очистить все фильтры"
                    className="nput-group-text btn btn-secondary text-nowrap"
                    disabled={isDisabled()}
                    onClick={clearFilter}
                >
                    Очистить фильтр
                </button>
                <input
                    type="search"
                    name="search"
                    placeholder="Поиск по имени или e-mail..."
                    className="form-control"
                    onChange={handleSearchQuery}
                    value={query.search || ""}
                />
            </div>
        </div>
    );
};

UsersSearch.propTypes = {
    name: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired
};
export default UsersSearch;
