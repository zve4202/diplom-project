import React from "react";
import PropTypes from "prop-types";

import ProductName from "./productName";
import ProductQty from "./productQty";
import ProductPrice from "./productPrice";
import Table from "../../../common/table";
import Barcode from "../../../ui/barcode";
import ProductPicture from "./productPicture";

const BasketTable = ({ name, data, totalDocs, loading, onReload, ...rest }) => {
    const columns = [
        {
            name: "image",
            width: 79,
            component: (product) => <ProductPicture data={product} />
        },
        {
            caption: "Корзина",
            name: "add",
            width: 120,
            component: (product) => <ProductQty data={product} />
        },
        {
            caption: "Цена",
            name: "price",
            sortable: true,
            width: 115,
            component: (product) => <ProductPrice price={product.price} />
        },
        {
            caption: "Наименоване",
            name: "name",
            sortable: true,
            width: 300,
            component: (product) => <ProductName data={product} />
        },
        {
            caption: "Формат",
            name: "format",
            sortable: true,
            component: (product) => (
                <div className="small">{product.title.format.name}</div>
            )
        },
        {
            caption: "Штрихкод",
            name: "barcode",
            component: (product) => <Barcode barcode={product.title.barcode} />
        },
        {
            caption: "Лейбл",
            name: "label",
            sortable: true,
            component: (product) => (
                <div className="small">{product.title.label.name}</div>
            )
        },
        {
            caption: "Страна",
            name: "origin",
            sortable: true,
            component: (product) => (
                <div className="small">{product.title.origin}</div>
            )
        },
        {
            caption: "Жанр",
            name: "style",
            sortable: true,
            component: (product) => (
                <div className="small">{product.title.style}</div>
            )
        }
    ];

    return (
        <Table
            {...{
                name,
                columns,
                data,
                totalDocs,
                loading,
                onReload,
                headered: false,
                paginator: false,
                striped: false,
                ...rest
            }}
        />
    );
};

BasketTable.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    totalDocs: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    onReload: PropTypes.func.isRequired
};
export default BasketTable;
