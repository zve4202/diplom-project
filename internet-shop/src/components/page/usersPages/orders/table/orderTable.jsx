import React from "react";
import PropTypes from "prop-types";

import Table from "../../../../common/table";
import Barcode from "../../../../ui/barcode";
import ProductPicture from "../../../productListPage/table/productPicture";
import OrderQty from "./orderQty";
import ProductPrice from "../../../productListPage/table/productPrice";
import ProductName from "../../../productListPage/table/productName";

const OrderTable = ({ name, data, ...rest }) => {
    const getItemData = (item) => {
        const { qty, price, product } = item;
        const { _id, title } = product;
        const { format, barcode, label, style, origin, image } = title;
        const nf = Intl.NumberFormat();

        return {
            _id,
            title,
            qty,
            priceFmt: nf.format(price),
            format,
            label,
            barcode,
            style,
            origin,
            image
        };
    };

    const columns = [
        {
            name: "image",
            width: 85,
            component: (item) => <ProductPicture data={getItemData(item)} />
        },
        {
            caption: "Корзина",
            name: "add",
            width: 85,
            component: (item) => <OrderQty item={getItemData(item)} />
        },
        {
            caption: "Цена",
            name: "price",
            sortable: true,
            width: 115,
            component: (item) => (
                <ProductPrice price={getItemData(item).priceFmt} />
            )
        },
        {
            caption: "Наименоване",
            name: "name",
            sortable: true,
            width: 300,
            component: (item) => <ProductName data={getItemData(item)} />
        },
        {
            caption: "Формат",
            name: "format",
            sortable: true,
            component: (item) => (
                <div className="small">{getItemData(item).format.name}</div>
            )
        },
        {
            caption: "Штрихкод",
            name: "barcode",
            component: (item) => <Barcode barcode={getItemData(item).barcode} />
        },
        {
            caption: "Лейбл",
            name: "label",
            sortable: true,
            component: (item) => (
                <div className="small">{getItemData(item).label.name}</div>
            )
        },
        {
            caption: "Страна",
            name: "origin",
            sortable: true,
            component: (item) => (
                <div className="small">{getItemData(item).origin}</div>
            )
        },
        {
            caption: "Жанр",
            name: "style",
            sortable: true,
            component: (item) => (
                <div className="small">{getItemData(item).style}</div>
            )
        }
    ];

    return (
        <Table
            {...{
                name,
                columns,
                data,
                totalDocs: data.length,
                onReload: () => {},
                loading: false,
                headered: false,
                paginator: false,
                striped: false,
                readOnly: true,
                ...rest
            }}
        />
    );
};

OrderTable.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
};
export default OrderTable;
