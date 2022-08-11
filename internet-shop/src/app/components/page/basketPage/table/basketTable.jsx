import React from "react";
import PropTypes from "prop-types";

import ProductName from "./productName";
import ProductQty from "./productQty";
import ProductPrice from "./productPrice";
import Table from "../../../common/table";
import Barcode from "../../../ui/barcode";
import ProductPicture from "../../../ui/productPicture";

const BasketTable = ({ name, products, onSort, onUpdate, ...rest }) => {
    const columns = {
        image: {
            class: "cover-small",
            // name: "Имидж",
            component: (product) => (
                <ProductPicture size="small" picture={product.title.image} />
            )
        },
        add: {
            class: "intut",
            // name: "Корзина",
            component: (product) => (
                <ProductQty
                    productId={product._id}
                    max={product.count}
                    qty={product.qty}
                    price={product.price}
                    onUpdate={onUpdate}
                />
            )
        },
        price: {
            // path: "price",
            // name: "Цена",
            component: (product) => <ProductPrice price={product.price} />
        },
        name: {
            // path: "name",
            // name: "Наименоване",
            component: (product) => <ProductName data={product} />
        },
        format: {
            // path: "format",
            // name: "Формат",
            component: (product) => (
                <div className="small">{product.title.format.name}</div>
            )
        },
        barcode: {
            // name: "Баркоде",
            component: (product) => <Barcode barcode={product.title.barcode} />
        },
        label: {
            // path: "label",
            // name: "Лейбл",
            component: (product) => (
                <div className="small">{product.title.label.name}</div>
            )
        },
        origin: {
            // path: "origin",
            // name: "Страна",
            component: (product) => (
                <div className="small">{product.title.origin}</div>
            )
        }
    };

    return (
        <Table name={name} columns={columns} data={products} onSort={onSort} />
    );
};

BasketTable.propTypes = {
    name: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};
export default BasketTable;
