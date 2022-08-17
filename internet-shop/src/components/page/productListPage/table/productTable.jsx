import React from "react";
import PropTypes from "prop-types";

import Table from "../../../common/table";
import ProductName from "./productName";
import ProductPicture from "./productPicture";
import Barcode from "../../../ui/barcode";
import ProductPrice from "./productPrice";
import ProductQty from "./productQty";

const ProductTable = ({
    name,
    data,
    totalDocs,
    loading,
    onReload,
    ...rest
}) => {
    const getData = (item) => {
        const { _id, count, title, priceRub } = item;
        const { format, barcode, label, style, origin } = title;
        const nf = Intl.NumberFormat();

        return {
            _id,
            title,
            count,
            priceRub,
            priceFmt: nf.format(priceRub),
            format,
            label,
            barcode,
            style,
            origin
        };
    };

    const columns = [
        {
            name: "image",
            width: 85,
            component: (item) => <ProductPicture data={getData(item)} />
        },
        {
            caption: "Корзина",
            name: "add",
            width: 190,
            component: (item) => <ProductQty data={getData(item)} name={name} />
        },
        {
            caption: "Цена",
            name: "price",
            sortable: true,
            width: 115,
            component: (item) => <ProductPrice price={getData(item).priceFmt} />
        },
        {
            caption: "Наименоване",
            name: "name",
            sortable: true,
            width: 300,
            component: (item) => <ProductName data={getData(item)} />
        },
        {
            caption: "Формат",
            name: "format",
            sortable: true,
            component: (item) => (
                <div className="small">{getData(item).format.name}</div>
            )
        },
        {
            caption: "Штрихкод",
            name: "barcode",
            component: (item) => <Barcode barcode={getData(item).barcode} />
        },
        {
            caption: "Лейбл",
            name: "label",
            sortable: true,
            component: (item) => (
                <div className="small">{getData(item).label.name}</div>
            )
        },
        {
            caption: "Страна",
            name: "origin",
            sortable: true,
            component: (item) => (
                <div className="small">{getData(item).origin}</div>
            )
        },
        {
            caption: "Жанр",
            name: "style",
            sortable: true,
            component: (item) => (
                <div className="small">{getData(item).style}</div>
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
                ...rest
            }}
        />
    );
};

ProductTable.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    totalDocs: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    onReload: PropTypes.func.isRequired
};
export default ProductTable;
