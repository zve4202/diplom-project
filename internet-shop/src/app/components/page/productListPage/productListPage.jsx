import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import ProductTable from "./table/productTable";
import { loadCategories } from "../../../store/categories";
import { loadProducts } from "../../../store/products";
import ProductSearch from "./seacher/productSearch";
// import ProductLoader from "./productLoader";
import CategoryList from "./productCategory";
import { updateSetting } from "../../../store/setting";
import WorkScreen from "../../common/wrappers/workScreen";
// import PaginationWrapper from "../../common/pagination";
import { loadFormats } from "../../../store/formats";
import { loadLabels } from "../../../store/labels";
import { loadOrigins } from "../../../store/origin";
import { loadStyles } from "../../../store/style";
import ProductCard from "./card/productCard";
import { useParams } from "react-router-dom";
import productService from "../../../services/product.service";

const ProductListPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const name = "product";
    const query = useSelector((state) => state.setting.config[name].query);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!productId) {
            setProduct();
            if (query.artist) {
                const newQuery = { ...query };
                delete newQuery.artist;
                dispatch(
                    updateSetting(name, {
                        query: {
                            ...newQuery
                        }
                    })
                );
                dispatch(loadProducts());
            }
        } else {
            if (!product || product._id !== Number(productId)) {
                if (product) window.scrollTo(0, 0);
                getProduct(productId);
            } else if (
                !query.artist ||
                query.artist !== product.title.artist._id
            ) {
                const newQuery = { ...query, artist: product.title.artist._id };
                dispatch(
                    updateSetting(name, {
                        query: {
                            ...newQuery
                        }
                    })
                );
                dispatch(loadProducts());
            }
        }
    }, [productId, product]);

    async function getProduct(productId) {
        const { content } = await productService.get(productId);
        setProduct(content);
    }

    const {
        docs: data,
        totalDocs,
        isLoading: loading
    } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(loadLabels());
        dispatch(loadProducts());
        dispatch(loadCategories());
        dispatch(loadFormats());
        dispatch(loadOrigins());
        dispatch(loadStyles());
    }, []);

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [docs]);

    const onReload = () => {
        dispatch(loadProducts());
    };

    const onFilterDebounced = debounce(onReload, 500);
    const onSearch = () => {
        onFilterDebounced();
    };

    return (
        <WorkScreen>
            <CategoryList name={name} onItemSelect={onReload} />
            <div className="content_wrapper card bg-light p-2">
                <ProductSearch onSearch={onSearch} name={name} />
                <ProductCard product={product} />
                <ProductTable
                    {...{ name, data, totalDocs, loading, onReload }}
                />
            </div>
        </WorkScreen>
    );
};

export default ProductListPage;
