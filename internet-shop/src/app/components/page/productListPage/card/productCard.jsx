import React from "react";
import PropTypes from "prop-types";
import ProductPicture from "../../../ui/productPicture";
import { curs } from "../../../../config.json";
import { useHistory } from "react-router-dom";
import ProductQty from "../table/productQty";
import ProductMenuBasket from "./productMenuBasket";

const ProductCard = ({ product }) => {
    if (!product) {
        return null;
    }
    const history = useHistory();

    const productScheme = {
        article: { cation: "Артикул", field: "article" },
        quality: { cation: "Качество", field: "quality" },
        price: { cation: "Цена", field: "price" },
        barcode: { cation: "Штрихкод", field: "title.barcode" },
        artist: { cation: "Исполнитель", field: "title.artist.name" },
        title: { cation: "Альбом", field: "title.name" },
        format: { cation: "Формат", field: "title.format.name" },
        year: { cation: "Год", field: "title.year" },
        label: { cation: "Лейбл", field: "title.label.name" },
        style: { cation: "Жанр", field: "title.style" },
        origin: { cation: "Страна", field: "title.origin" }
    };

    const getText = (fields) => {
        let value = product;
        for (const field of String(fields).split(".")) {
            value = value[field];
            if (field === "price") {
                const nf = Intl.NumberFormat();
                value = nf.format(value * curs) + " руб.";
            }
        }
        return <strong>{value}</strong>;
    };

    return (
        <>
            <div className="card mb-2">
                <div className="card-header d-flex g-2 p-2 align-items-center">
                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => history.push("/")}
                        title="Вернуться к общему списку покупок"
                    >
                        <i className="bi bi-caret-left"></i>
                    </button>
                    <span>
                        <i className="bi bi-hand-thumbs-up me-2"></i>
                        Информация по товару
                    </span>
                </div>
                <div className="card-body">
                    <div className="row g-3 ">
                        <div className="col-auto ">
                            <div>
                                <ProductPicture
                                    size="big"
                                    picture={product.title.image}
                                />
                            </div>
                        </div>
                        <div className="col">
                            {Object.keys(productScheme).map((key) => {
                                const cation = productScheme[key].cation;
                                const field = productScheme[key].field;
                                return (
                                    <div className="row row-cols-2" key={key}>
                                        <div
                                            className="col text-end"
                                            style={{ width: "125px" }}
                                        >
                                            {`${cation}:`}
                                        </div>
                                        <div className="col-6">
                                            {getText(field)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            className="card flex-grow-0"
                            style={{
                                width: "250px",
                                padding: 0
                            }}
                        >
                            <div className="card-header">Инструменты</div>
                            <div className="card-body ">
                                <ProductMenuBasket />
                                <ProductQty data={product} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-2">
                <div className="card-header fs-4 border-primary text-primary">
                    <i className="bi bi-exclamation-circle-fill me-2" />
                    <span>{`${product.title.artist.name} - Cписок альюбомов исполнителя `}</span>
                </div>
            </div>
        </>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object
};

export default ProductCard;
