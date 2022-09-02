import React from "react";
import PropTypes from "prop-types";

import Table from "../../../common/table";
import Barcode from "../../../ui/barcode";
import ProductPicture from "../../productListPage/table/productPicture";
import ProductQty from "../../productListPage/table/productQty";
import ProductPrice from "../../productListPage/table/productPrice";
import ProductName from "../../productListPage/table/productName";
import StatusText from "../../../common/form/statusText";

const BasketTable = ({ name, data, totalDocs, loading, onReload, ...rest }) => {
    const getData = (item) => {
        const { qty, price, product } = item;
        const { _id, count, title } = product;
        const { format, barcode, label, style, origin } = title;
        const nf = Intl.NumberFormat();

        return {
            _id,
            title,
            qty,
            price,
            priceFmt: nf.format(price),
            count,
            format,
            label,
            barcode,
            style,
            origin
        };
    };

    const prouctQty = (data, name) => {
        if (rest.readOnly) {
            return (
                <div className="g-3">
                    <div className="form-control bg-secondary bg-opacity-10 text-center">
                        {data.qty}
                        {data.needQty ? `/${data.needQty}` : ""}
                    </div>
                    <StatusText status={data.status} classname="warning" />
                </div>
            );
        }
        return <ProductQty data={data} name={name} />;
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
            component: (item) => prouctQty(getData(item), name)
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
