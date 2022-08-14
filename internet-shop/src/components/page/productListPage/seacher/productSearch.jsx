import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../../store/setting";
import SelectField from "./selectField";
import { getLabels } from "../../../../store/labels";
import { getFormats } from "../../../../store/formats";
import { getOrigins } from "../../../../store/origin";
import { getStyles } from "../../../../store/style";
import { getCategory } from "../../../../store/categories";
import debounce from "../../../../utils/debounce";

// let timeout;
// const debounce = (fn, ms) => {
//     return function () {
//         const fnCall = () => fn.apply(this, arguments);
//         clearTimeout(timeout);
//         timeout = setTimeout(fnCall, ms);
//     };
// };

const ProductSearch = ({ name, onSearch }) => {
    const dispatch = useDispatch();
    const query = useSelector((state) => state.setting.config[name].query);
    const category = useSelector(getCategory(query.category));
    const formats = useSelector(getFormats());
    const labels = useSelector(getLabels());
    const origins = useSelector(getOrigins());
    const styles = useSelector(getStyles());
    const selects = {
        origin: { placeholder: "Поиск по стране", data: origins },
        format: { placeholder: "Поиск по формату", data: formats },
        label: { placeholder: "Поиск по лейблу", data: labels },
        style: { placeholder: "Поиск по стилю", data: styles }
    };

    const clearFilter = () => {
        const queryArtist = query.artist ? { artist: query.artist } : {};
        dispatch(
            updateSetting(name, {
                query: queryArtist
            })
        );
        onSearch();
    };

    const debouncedSearch = debounce(onSearch, 1000);

    const handleSearchQuery = ({ target }) => {
        const newQuery = { ...query };
        if (!target.value) {
            delete newQuery[target.name];
        } else {
            newQuery[target.name] = target.value;
        }
        dispatch(
            updateSetting(name, {
                query: {
                    ...newQuery
                }
            })
        );
        debouncedSearch();
    };

    const handleCollapse = () => {
        const queryShow = !query.show;
        const needReload = Object.keys(query).reduce(
            (prev, curr) => Object.keys(selects).includes(curr) || prev,
            false
        );
        const newQuery = { ...query, show: queryShow };
        window.scrollTo(0, 0);

        if (!queryShow) {
            delete newQuery.show;
            Object.keys(selects).forEach((key) => delete newQuery[key]);
        }
        dispatch(
            updateSetting(name, {
                query: {
                    ...newQuery
                }
            })
        );
        if (!queryShow && needReload) {
            onSearch();
        }
    };

    const isDisabled = () => {
        return Object.keys(query).reduce(
            (previousValue, currentValue) =>
                previousValue && ["artist", "show"].includes(currentValue),
            true
        );
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
                    placeholder="Поиск по артисту и названию альбома..."
                    className="form-control"
                    onChange={handleSearchQuery}
                    value={query.search || ""}
                />
                {category && (
                    <div
                        className="input-group-text btn btn-outline-primary px-3"
                        title={
                            "Установлен фильтр\nКликни в крестик чтобы снять его"
                        }
                        type="button"
                    >
                        <span className="me-2">{category.name}</span>
                        <i
                            className="bi bi-x-circle"
                            title="Снять фильтр"
                            onClick={() =>
                                handleSearchQuery({
                                    target: {
                                        name: "category",
                                        value: null
                                    }
                                })
                            }
                        />
                    </div>
                )}
                <div
                    className={`input-group-text btn btn-outline-${
                        query.image ? "primary" : "secondary"
                    }`}
                    title={`${
                        query.image
                            ? "Выбрать всё, что есть"
                            : "Выбрать только с картинками"
                    }`}
                    type="button"
                    onClick={() =>
                        handleSearchQuery({
                            target: {
                                name: "image",
                                value: !query.image
                            }
                        })
                    }
                >
                    <i
                        className={`bi bi-check-circle${
                            query.image ? "-fill" : ""
                        }`}
                    ></i>
                    <span className="ms-2">
                        {query.image ? "С картинками" : "Всё"}
                    </span>
                </div>

                <div
                    className={`input-group-text btn btn-outline-${
                        query.inStock ? "primary" : "secondary"
                    }`}
                    title={`${
                        query.inStock
                            ? "Выбрать всё, что есть"
                            : "Выбрать только то, что в наличии"
                    }`}
                    type="button"
                    onClick={() =>
                        handleSearchQuery({
                            target: {
                                name: "inStock",
                                value: !query.inStock
                            }
                        })
                    }
                >
                    <i
                        className={`bi bi-check-circle${
                            query.inStock ? "-fill" : ""
                        }`}
                    ></i>
                    <span className="ms-2">
                        {query.inStock ? "Из наличия" : "Всё"}
                    </span>
                </div>
                <div
                    className="nput-group-text btn btn-outline-secondary"
                    title="Дополнительная фильтрация"
                    type="button"
                    onClick={handleCollapse}
                >
                    <i
                        className={`bi bi-caret-${query.show ? "up" : "down"}`}
                    ></i>
                </div>
            </div>
            <div
                className={`mt-2 collapse ${query.show && "show"}`}
                id="additionalFilter"
            >
                {/* <div className="row g-3 card card-body d-flex cen flex-nowrap"> */}
                <div className="row g-2">
                    {Object.keys(selects).map((key, index) => (
                        <SelectField
                            key={index + 1}
                            name={key}
                            placeholder={selects[key].placeholder}
                            data={selects[key].data}
                            onChange={handleSearchQuery}
                            value={query[key]}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

ProductSearch.propTypes = {
    name: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired
};
export default ProductSearch;
